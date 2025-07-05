import { useState } from 'react'
import './App.css'
import MainRoutes from './routes/MainRoutes'
import Nav from './components/Nav'

function App() {
  return(
    <div className='bg-gray-800 h-screen w-screen'>
      <Nav/>
      <MainRoutes/>
    </div>
  )
}

export default App
