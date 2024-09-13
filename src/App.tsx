import './App.css';
import Map from './components/Map';

function App() {
  const defaultCoordinates = { lng: 127.11, lat: 37.394 };
  return (
    <div className="App">
      <h2>Welcome to my Map App</h2>
      <Map defaultCoordinates={defaultCoordinates} />
    </div>
  );
}

export default App;
