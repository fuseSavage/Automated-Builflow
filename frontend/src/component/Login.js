import React from 'react'
import { LockOpen } from '@material-ui/icons';
import { TextField, Tooltip, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom';

export default function Login() {


    return (
        <>
            <div className="login-main">
                <div className="login-title">
                    <p><LockOpen /></p>
                    <p>Login</p>
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
                                />
                            </Tooltip>
                        </div>
                        <div className="password">
                            <p>Password</p>
                            <Tooltip title='password'>
                                <TextField
                                    style={{ color: '#eceff1' }}
                                    label="Enter Password"
                                    color="secondary"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled"
                                />
                            </Tooltip>
                        </div>
                        <Tooltip title='submit'>
                            <div className="submit-login">
                                <Link
                                    to={{
                                        pathname: "/rdh-ro",
                                        state: { name: 'chaiwat' }
                                    }}
                                >
                                    <p type="submit">Submit</p>
                                </Link>

                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    )
}