
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

function Home() {

    const [login, setLogin] = useState()


    useEffect(() => {
        async function fetchData() {
            const host = `${window.location.protocol}//${window.location.hostname}:3001`
            await Axios.get(`${host}/login`).then((response) => {
                if (response.data.loggedIn === true) {
                    setLogin(response.data.user[0].name)
                }
            }).catch(err => {
                throw err;
            })
        }
        fetchData();
    }, [])

    return (
        <div className="main-content rdh-ro">
            <p>
                {login ? 'Hi ' + login  : 'Please login'}
            </p>
        </div>
    )
}
export default Home;