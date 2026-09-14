import { useState } from 'react';
import Globe from 'react-globe.gl';

function App() {
  const [pins, setPins] = useState([]);

  const handleGlobeClick = ({ lat, lng }) => {
    const memo = window.prompt('この場所のメモを入力してください');
    if (memo) {
      setPins([...pins, { lat, lng, memo }]);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
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
