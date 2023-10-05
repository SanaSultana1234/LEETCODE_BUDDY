import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home  from './pages/Home';
import Navbar from './components/Navbar';
import WorkoutForm from './components/WorkoutForm';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/create" element={<WorkoutForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;