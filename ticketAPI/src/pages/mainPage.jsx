import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

const MainPage = () => {
  return (
    <div>
      <h1>mainPage</h1>
      <Link to="/logIn">
        <Button>
          LogIn
        </Button>
      </Link>

    </div >
  )
}

export default MainPage