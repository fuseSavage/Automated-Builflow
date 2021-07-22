import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { ExitToApp, MenuOpen, Home, Apps } from '@material-ui/icons';
import { Divider, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom'

import Login from './Login'

export default function Drawers(props) {

  // const { name } = props;
  const [value, onChange] = useState(new Date());


  const handlelogout = () => {
    console.log("logout")
  }

  // let menuDrawer;

  // if (name === '') {
  //   menuDrawer = (
  //     <Login />
  //   )
  // } else {
  //   menuDrawer = (
  //     <div>
  //       <Menu />
  //       <Configurations />
  //       <Calendars />
  //       <LogoutHome />
  //     </div>
  //   )
  // }


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
            <Link to='/rdh-ro'> RDH RO</Link>
            <Link to='/rdh-sdet'> RDH SDET</Link>
            <Link to='/rdh-hga'> RDH HGA</Link>
            <Link to='/ama-sdet'> AMA SDET</Link>
            <Link to='/ama-hga'> AMA HGA</Link>
            <Link to='/ama-lsd'> AMA L-Slider</Link>
            <Link to='/ama-lsd-sdet'> AMA L-Slider-SDET</Link>
            <Link to='/ama-lsd-hga'> AMA L-Slider-HGA</Link>
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
            <Link to='/set-mail'> Alert Mail Setting</Link>
            <Link to='/set-swfw'> SW/FW Setting</Link>
            <Link to='/manager'> User Manager</Link>
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

  function LogoutHome() {
    return (
      <>
        <div className="grid">
          <Tooltip title='logout'>
            <div className="grid-logout" onClick={handlelogout}>
              <ExitToApp />
              <p className="logout-text">Logout</p>
            </div>
          </Tooltip>

          <div>
            <Tooltip title='back to home'>
              <a href='/'>
                <div className="grid-home">
                  <Home className="home-icon" />
                  <p className="home-text">Home</p>
                </div>
              </a>
            </Tooltip>
          </div>

        </div>
        {/* grid */}
      </>
    )
  }

  // function Final() {
  //   return (
  //     <div>
  //       {menuDrawer}
  //     </div>
  //   )
  // }

  return (
    <div className="page-deawer">
      <Login />
      <Menu />
      <Configurations />
      <Calendars />
      <LogoutHome />
    </div>
  )
}