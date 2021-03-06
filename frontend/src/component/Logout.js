import { Tooltip } from '@material-ui/core'
import { ExitToApp, Home } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'

export default function Logout() {

    const history = useHistory()
    const [redirect, setRedirect] = useState(false);

    // const host = `http://localhost:3001`
    // const host = `http://10.44.94.152:3001`
    const host = `http://10.127.241.88:3001`

    const handlelogout = async () => {
        await fetch(`${host}/logout`, {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            credentials: 'include'
        })
            // history.push('/')
            .then((response) => {
                setRedirect(true);
                history.go(0)
            })

    }
    // console.log(redirect)
    if (redirect) {
        return <Redirect to='/' />
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

