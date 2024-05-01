import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import FrameComponent from '../../components/mainPage_Components/FrameComponent'

const MainPage = () => {
  return (
    <div>
      <h1 className='font-bold underline'>mainPage</h1>
      <Link to="/logIn">
        <Button>
          LogIn
        </Button>
      </Link>
      <FrameComponent />
    </div >
  )
}

export default MainPage