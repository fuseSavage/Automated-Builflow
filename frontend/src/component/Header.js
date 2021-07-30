import React from 'react'
import { Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom'

export default function Header() {

    return (

        <div className="page-header">
            <p>
                <Tooltip title='home'>
                    <Link to='/'>FTD Automated Buildflow</Link>
                </Tooltip>
            </p>

        </div>
    )
}
