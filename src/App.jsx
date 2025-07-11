import { useState } from 'react'
import './App.css'
import MainRoutes from './routes/MainRoutes'
import Nav from './components/Nav'

function App() {
  return(
    <>
      <Nav/>
      <div className='bg-neutral-950 h-dvh w-full pt-16'>
        <MainRoutes/>
      </div>
    </>
  )
}

export default App
