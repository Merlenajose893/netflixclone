import React,{useEffect,useRef} from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search_icon.svg'
import bell from '../../assets/bell_icon.svg'
import profile from '../../assets/profile_img.png'
import caret from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const navRef=useRef();
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY>=80)
            {
                navRef.current.classList.add('nav-dark')
            }
            else{
                navRef.current.classList.remove('nav-dark')

            }
        },[])
    })
  return (
    <div className='navbar'>
    <div className="navbar-left">
<img src={logo} alt="" />
<ul>
    <li>
        Home
    </li>
    <li>
        TV Shows
    </li>
    <li>
        Movies
    </li>
    <li>
        New & Popular
    </li>
    <li>
        <Link to="/watchlist">
        My List
        </Link>
    </li>
    <li>
        Browse by Languages
    </li>
</ul>
    </div>
    <div className="navbar-right">
        <img src={search} alt=''  className='icons'></img>
        <p></p>
        <img src={bell} alt=''  className='icons'></img>
        <div className="navbar-profile">
            <img src={profile} alt="" />
            <img src={caret} alt="" />
            <div className="dropdown">
                <p onClick={()=>{logout()}}>Sign Out Of Netflix</p>
            </div>
        </div>

    </div>
    </div>
  )
}

export default Navbar
