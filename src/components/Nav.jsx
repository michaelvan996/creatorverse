import React from 'react'
import { Link } from 'react-router-dom'

import '@picocss/pico/css/pico.min.css'
import '../App.css'

const Nav = () => {
  return (
        <div className="navbar-container">
            <h1 className="navbar-header">Creatorverse with BigMike</h1>
            <div className="navbar">
              <div className="grid">
                <div></div>
                <nav className="grid">
                    <Link className="gallery-btn" to="/">View Creators</Link>
                    <Link className="add-btn" to="/add" role="button">Add Creator</Link>
                </nav>
                <div></div>
              </div>
            </div>
        </div>
  )
}

export default Nav
