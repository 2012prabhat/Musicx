import Navbar from "./components/Navbar";
import Favourite from "./components/Favourite";
import Songs from "./components/Songs";
import Player from "./components/Player";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <>
    <Routes>
      <Route path="/" element={<>
    <Navbar/>  
    <Songs/>
 
      </>}/>
      <Route path="favourite" element={<>
      <Navbar/>
    <Favourite/>  
      </>}/>
    </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;
