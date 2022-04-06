import './App.css';
import Gallery from './components/gallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Gallery ></Gallery>
    </div >
  );
}

export default App;
