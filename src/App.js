import { BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from './Nav'
import Main from './navbar/Main'
import Attack from './navbar/Attack'
import Login from './navbar/Login'
import RoomList from "./components/RoomList";


function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Nav />
              <Routes>
                  <Route path="/" element={<Main />}/>
                  <Route path="/about" element={<Attack />}/>
                  <Route path="/contact" element={<Login />}/>
                  <Route path="/RoomList" element={<RoomList />}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}
export default App;
