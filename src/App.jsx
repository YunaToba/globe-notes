import { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setPins([]);
      return;
    }
    const pinsQuery = query(collection(db, 'pins'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(pinsQuery, (snapshot) => {
      const loadedPins = snapshot.docs.map((doc) => doc.data());
      setPins(loadedPins);
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleGlobeClick = async ({ lat, lng }) => {
    const memo = window.prompt('この場所のメモを入力してください');
    if (memo) {
      await addDoc(collection(db, 'pins'), {
        uid: user.uid,
        lat,
        lng,
        memo,
      });
    }
  };

  if (!user) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={handleLogin}>Googleでログイン</button>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={handleLogout} style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        ログアウト（{user.displayName}）
      </button>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        onGlobeClick={handleGlobeClick}
        pointsData={pins}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => 'orange'}
        pointRadius={0.5}
        pointAltitude={0.01}
        pointLabel={(d) => d.memo}
      />
    </div>
  );
}

export default App;
