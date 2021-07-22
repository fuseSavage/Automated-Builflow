import React from 'react'
import { Tooltip } from '@material-ui/core';

export default function Header() {

    return (

        <div className="page-header">
            <p>
                <Tooltip title='home'>
                    <a href='/'>FTD Automated Buildflow</a>
                </Tooltip>
            </p>

        </div>
    )
}
