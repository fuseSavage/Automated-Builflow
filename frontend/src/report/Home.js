
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

function Home() {

    const [login, setLogin] = useState()

    // const isSuccess = false;
    // console.log(isSuccess)


    useEffect(() => {
        async function fetchData() {
            const host = `http://localhost:3001`
            await Axios.get(`${host}/login`).then((response) => {
                if (response.data.loggedIn === true) {
                    setLogin(response.data.user)
                }
            }).catch(err => {
                throw err;
            })
        }
        fetchData();
    }, [])

    const testAutomail = async () => {

        await Axios.post(`http://localhost:3001`)
            .then((response) => {
                if (response.data.message) {
                    console.log(response.data.message)
                } else {
                    console.log('completed')
                }
            })
            .catch((error) => {
                throw error;
            })
        // const smtpjs = window.Email;
        // smtpjs.send({
        //     Host : "mailhost.seagate.com",
        //     Username : "chaiwat.singkibut@seagate.com",
        //     Password : "Singkibut931897",
        //     To : 'chaiwat.singkibut@seagate.com',
        //     From : "you@isp.com",
        //     Subject : "This is the subject",
        //     Body : "And this is the body"
        // }).then(
        //   message => alert(message)
        // );
    }

    return (
        <div className="main-content rdh-ro">
            <p>
                {login ? 'Hi1 ' + login : 'Please login'}
            </p>

            <p className="submit-preview" onClick={testAutomail}>send mail</p>
        </div>
    )
}
export default Home;