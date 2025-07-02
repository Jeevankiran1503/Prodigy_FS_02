import './App.css'
import {BrowserRouter as Router} from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import DashBoard from './pages/DashBoard'
import Login from './pages/Login'
import Register from './pages/Register'
import Employees from './pages/Employees'
import Middleware from './components/Middleware'
import EmployeeForm from './components/EmployeeForm'
import EmployeeDetails from './pages/EmployeeDetails'
import Navbar from './components/Navbar'
function App() {

  return (
    <>
    
      <Router>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Middleware path="/"><DashBoard/></Middleware>}/>
          <Route path="/login" element={<Middleware path="/login"><Login/></Middleware>}/>
          <Route path="/register" element={<Middleware path="/register"><Register/></Middleware>}/>
          <Route path="/employees" element={<Middleware path="/employees"><Employees/></Middleware>}/>
          <Route path="/addEmployee" element={<Middleware path="/addEmployees"><EmployeeForm/></Middleware>}/>
           <Route path="/employee/:id" element={<Middleware path="/employee/:id"><EmployeeDetails /></Middleware>} />
           <Route path="/dashboard" element={<Middleware path="/dashboard"><DashBoard /></Middleware>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
