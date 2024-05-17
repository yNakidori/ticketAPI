import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import './mainPage.scss'

const MainPage = () => {
  return (
    <div className='bg'>
      <h1>mainPage</h1>
      <Link to="/logIn">
        <Button>
          LogIn
        </Button>
      </Link>

      <Link to="/menuPage">
        <Button>
          MenuPage
        </Button>
      </Link>
    </div >
  )
}

export default MainPage