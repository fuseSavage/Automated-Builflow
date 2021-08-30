import React, { useState } from 'react'
import { LockOpen } from '@material-ui/icons';
import { TextField, Tooltip, Divider } from '@material-ui/core'


import { useHistory } from 'react-router'

export default function Login() {

    const history = useHistory()
    const [gid, setGID] = useState('');
    const [loginstatus, setLoginStatus] = useState('');

    const host = `http://localhost:3001`

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (gid.length !== 0 ) {
            await fetch(`${host}/login`, {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    gid: gid,
                })
            }).then(async (response) => {
                const content = await response.json();
                if (content.message) {
                    setLoginStatus(content.message)
                } else {
                    history.go(0)
                }
            }).catch((error) => {
                throw error;
            })
        } else {
            alert('กรุณากรอก GID')
        }
    }

    return (
        <>
            <div className="login-main">
                <div className="login-title">
                    <p><LockOpen /></p>
                    <p>User Create</p>
                </div>
                <Divider />
                <div className="loging-content">
                    <div className="form-input">
                        <div className="gid">
                            <p>GID</p>
                            <Tooltip title='gid'>
                                <TextField
                                    label="Enter GID"
                                    color="secondary"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="filled"
                                    onChange={(e) => { setGID(e.target.value) }}
                                />
                            </Tooltip>
                        </div>
                        {/* <div className="password">
                            <p>Password</p>
                            <Tooltip title='password'>
                                <TextField
                                    label="Enter Password"
                                    color="secondary"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </Tooltip>
                        </div> */}
                        <Tooltip title='submit'>
                            <div className="submit-login">
                                <p type="submit" onClick={handleSubmit}>Submit</p>
                            </div>
                        </Tooltip>
                        <div className="text-status">
                            <p>{loginstatus}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Link
    to={{
        pathname: "/rdh-ro",
        state: { name: 'chaiwat' }
    }}
>
    <p type="submit" >Submit</p>
</Link> */}
        </>
    )
}




