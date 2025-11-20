import {Route, Routes} from "react-router-dom"
import NavBar from './components/NavBar'
import Customers from './pages/Customers'
import About from './pages/About'

function App() {
  console.log(window.location);
  return (
    <>
      <NavBar></NavBar>
      <div className='main-body'>
        <Routes>
          <Route path='/' element={<Customers />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
