import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import CourseCatalog from './components/CourseCatalog';
import CourseDetail from './components/CourseDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    // <div>
    //   <Login />
    //   {/* <CourseCatalog /> */}
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/courseCatalog' element={<CourseCatalog />} />
        <Route path='/courseDetail' element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
