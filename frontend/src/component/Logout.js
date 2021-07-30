import { Tooltip } from '@material-ui/core'
import { ExitToApp, Home } from '@material-ui/icons'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Logout() {

    const history = useHistory()

    const host = `${window.location.protocol}//${window.location.hostname}:3001`

    const handlelogout = async () => {
        await fetch(`${host}/logout`, {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            credentials: 'include'
        })
        // history.push('/')
        history.go(0)
    }

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
                        <Link to='/'>
                            <div className="grid-home">
                                <Home className="home-icon" />
                                <p className="home-text">Home</p>
                            </div>
                        </Link>
                    </Tooltip>
                </div>

            </div>
            {/* grid */}
        </>
    )
}

