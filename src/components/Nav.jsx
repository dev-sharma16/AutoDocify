import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav() {
    return (
        <nav className=' flex justify-center items-center gap-x-5 p-10'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/generate'>Make Doc</NavLink>
        </nav>
    )
}
