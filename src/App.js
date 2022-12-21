import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from './Components/Home'
import EditorPage from './Components/EditorPage';
import CreateRoom from './Components/CreateRoom';
import Register from './Components/Register';
import Login from './Components/Login';
import About from './Components/About'
import Contact from './Components/Contact'
import Navbar from './Components/Navbar';
import './Components/css/index.css'
import './Components/css/home.css'
import './Components/css/Editor.css'
import './Components/css/register.css'
import './Components/css/Responsive.css'
function App() {
  return (
    <>
    <div>
      <Toaster position='top-right'
      toastOptions={{
         success:{
          iconTheme:{
            primary:"#0053a6"
          }
         },
         error:{
          iconTheme:{
            primary:"#0053a6"
          }
         }
      }}/>
    </div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route index path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sign-up" element={<Register/>}/>
      <Route path="/create-room" element={<CreateRoom/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/editor/:roomId" element={<EditorPage/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
