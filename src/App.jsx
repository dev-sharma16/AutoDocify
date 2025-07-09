import { useState } from 'react'
import './App.css'
import MainRoutes from './routes/MainRoutes'
import Nav from './components/Nav'

function App() {
  return(
    <>
      <Nav/>
      <div className='bg-gray-800 h-dvh w-full pt-15'>
        <MainRoutes/>
      </div>
    </>
  )
}

export default App
