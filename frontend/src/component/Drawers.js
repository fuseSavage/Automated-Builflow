import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Calendar from 'react-calendar';
import { MenuOpen, Apps } from '@material-ui/icons';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom'

import Login from './Login'
import Logout from './Logout';

export default function Drawers(props) {


  const [value, onChange] = useState(new Date());

  const [login, setLogin] = useState('')

  useEffect(() => {
    async function fetchData() {
      const host = `${window.location.protocol}//${window.location.hostname}:3001`
      await Axios.get(`${host}/login`).then((response) => {
        if (response.data.loggedIn === true) {
          setLogin(response.data.user[0].name)
        }
      })
    }
    fetchData();
  }, [])


  let menuDrawer;

  if (login === '') {
    menuDrawer = (
      <Login />
    )
  } else {
    menuDrawer = (
      <div>
        <Menu />
        <Configurations />
        <Calendars />
        <Logout />
      </div>
    )
  }

  // function in Drawers //
  function Menu() {
    return (
      <>
        <div className="menu">
          <div className="title-icon" >
            <p><MenuOpen /></p>
            <p>Report</p>
          </div>
          <div className="list-menu">
            <Link to='/search-rdh-ro'> RDH RO</Link>
            <Link to='/search-rdh-sdet'> RDH SDET</Link>
            <Link to='/search-rdh-hga'> RDH HGA</Link>
            <Link to='/search-ama-sdet'> AMA SDET</Link>
            <Link to='/search-ama-hga'> AMA HGA</Link>
            <Link to='/search-ama-lsd'> AMA L-Slider</Link>
            <Link to='/search-ama-lsd-sdet'> AMA L-Slider-SDET</Link>
            <Link to='/search-ama-lsd-hga'> AMA L-Slider-HGA</Link>
          </div>
        </div>
        {/* menu */}
        <Divider />
      </>
      // div main
    )
  }

  function Configurations() {
    return (
      <>
        <div className="config-main">
          <div className="config-title">
            <p><Apps /></p>
            <p> Configurations </p>
          </div>
          <div className="config-item">
            <Link to='/add-img'> Add Image Flow</Link>
            {/* <Link to='/set-mail'> Alert Mail Setting</Link> */}
            <Link to='/sw-fw'> SW/FW Setting</Link>
            {/* <Link to='/manager'> User Manager</Link> */}
          </div>
        </div>
        <Divider />
      </>
    )
  }

  function Calendars() {
    return (
      <>
        <div className="calendar">
          <Calendar
            onChange={onChange}
            value={value}
          />
        </div>
      </>
    )
  }




  return (
    <div className="page-deawer">
      {menuDrawer}
    </div>
  )
}