import { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, updateDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import SearchBox from './SearchBox';
import PinForm from './PinForm';
import PinDetail from './PinDetail';

function App() {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);

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
      const loadedPins = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  const handleSavePin = async (formData) => {
    await addDoc(collection(db, 'pins'), {
      uid: user.uid,
      lat: selectedPlace.lat,
      lng: selectedPlace.lng,
      address: selectedPlace.address,
      title: formData.title,
      category: formData.category,
      tags: formData.tags,
      memo: formData.memo,
      visited: false,
      createdAt: new Date().toISOString(),
    });
    setSelectedPlace(null);
  };

  const handleCancelForm = () => {
    setSelectedPlace(null);
  };

  const handlePinClick = (pin) => {
    setSelectedPin(pin);
  };

  const handleUpdatePin = async (updates) => {
    const pinRef = doc(db, 'pins', selectedPin.id);
    await updateDoc(pinRef, updates);
    setSelectedPin(null);
  };

  const handleCloseDetail = () => {
    setSelectedPin(null);
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
      <button onClick={handleLogout} style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
        ログアウト（{user.displayName}）
      </button>
      <SearchBox onSelect={handlePlaceSelect} />
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={pins}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d) => (d.visited ? 'limegreen' : 'orange')}
        pointRadius={0.5}
        pointAltitude={0.01}
        pointLabel={(d) => `${d.title}（${d.category}）`}
        onPointClick={handlePinClick}
      />
      {selectedPlace && (
        <PinForm place={selectedPlace} onSave={handleSavePin} onCancel={handleCancelForm} />
      )}
      {selectedPin && (
        <PinDetail pin={selectedPin} onSave={handleUpdatePin} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;
