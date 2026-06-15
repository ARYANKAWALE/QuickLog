import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'
import { Outlet } from 'react-router-dom'
import './App.css'
function Layout(){
    return(
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}
export default Layout