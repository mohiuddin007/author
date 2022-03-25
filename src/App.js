import Router from './router';
import "./assets/css/golbalStyle.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <Router/>
    </>
  );
}

export default App;
