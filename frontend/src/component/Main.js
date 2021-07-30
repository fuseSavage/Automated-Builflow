import React from 'react'
import { Tooltip } from '@material-ui/core';

import logo from '../img/logo-seagate.png'
import Header from './Header'
import Footers from './Footers'
import Content from './Content'
import Drawers from './Drawers'

export default function Main() {

    return (
        <div className="grid-main">
            <Tooltip title='www.seagate.com'>
            <div className="logo content" >
                <a href='https://www.seagate.com/as/en/'><img src={logo} alt="Seagate"></img></a>
            </div>
            </Tooltip>
            <header className="header content">
                <Header />
            </header>
            <div className="deawer content">
                <Drawers />
            </div>
            <div className="main content">
                <Content />
            </div>
            <footer className="footer content">
                <Footers />
            </footer>
        </div>

    )
}