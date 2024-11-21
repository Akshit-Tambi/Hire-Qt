import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import ProfileButton from './ProfileButton';
import{Dropdown} from 'rsuite';


const NavBar = () => {

    const [isMenuOpen , setIsMenuOpen] = useState(false);
    const handleMenuToggler = () =>{
        setIsMenuOpen(!isMenuOpen);
    }
    const navItems=[
        {path:"/", title:"Start a search"},
        {path:"/applied", title:"Applied Jobs"},
        {path:"/bookmark", title:"Bookmarked Jobs"},
        {path:"/post-job", title:"Post a Job"},
    ]

    return (
        <div>
            <header className='max-w-screen-2xl container mx-auto xl:px-24 py-2'>
                <nav className='flex justify-between items-center py-2'>
                    <a href='/dashboard' className='flex items-center gap-2 text-3xl sm:text-4xl font-bold text-slate-700'>
                        <svg

                            xmlns="http://www.w3.org/2000/svg"
                            width="29"
                            height="60"
                            viewBox="0 0 29 30"
                            fill="none"
                        >
                            <circle
                                cx="12.0143"
                                cy="12.5143"
                                r="12.0143"
                                fill="#3575E2"
                                fillOpacity="0.4"
                            />
                            <circle cx="16.9857" су="17.4857" r="12.0143" fill="#3575E2" />
                        </svg>{" "}
                        <span>HireQT</span>
                    </a>
                    <ul className='hidden md:flex gap-12'>
                        {navItems.map(({path , title})=>(
                                <li key={path} className='text-base text-primary'>
                                    <NavLink to={path} className={({isActive})=>isActive ? "active" : ""}>
                                        {title}
                                    </NavLink>
                                </li>           
                            ))}
                    </ul>

                    <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                            <ProfileButton>
                            </ProfileButton>
                    </div>
                    <div className="md:hidden block">
                        <button onClick={handleMenuToggler}>
                            {
                                isMenuOpen ? <FaXmark className="w-5 h-5 text-primary"/> : <FaBars className='w-5 h-5 text-primary'/>
                            }
                        </button>
                    </div>
                </nav>

                {/*Nav Items For Mobile*/}
                <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                    <ul className='hidden md:flex gap-12'>
                        {navItems.map(({path , title})=>(
                                <li key={path} className='text-base text-white first:text-white py-1'>
                                    <NavLink to={path} className={({isActive})=>isActive ? "active" : ""}>
                                        {title}
                                    </NavLink>
                                </li>           
                            ))}
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default NavBar