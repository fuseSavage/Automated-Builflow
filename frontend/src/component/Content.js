import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import Axios from 'axios'

import Home from '../report/Home';
import SCH_RDH_RO from '../search/RDH_RO.Search';

import RDH_RO from '../report/RDH_RO';
import SWFW from '../configurations/SWFW';
import AddImage from '../configurations/AddImage';
import ShowImages from '../configurations/ShowImage';

export default function Content() {

    const [login, setLogin] = useState()
    const [data_swfw, setData_SWFW] = useState([])
    const [nameTitle, setNameTitle] = useState([])


    useEffect(() => {
        async function fetchData() {
            const host = `${window.location.protocol}//${window.location.hostname}:3001`
            await Axios.get(`${host}/login`)
                .then((response) => {
                    if (response.data.loggedIn === true) {
                        setLogin(response.data.user[0].name)
                    }
                })
                .catch((error) => {
                    throw error;
                })

            await Axios.get(`${host}/swfw`)
                .then((response) => {
                    setData_SWFW(response.data)
                })
                .catch((error) => {
                    throw error;
                })

            await Axios.get(`http://localhost:3001/check-title`)
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        setNameTitle(arrlist => [...arrlist, response.data[i].Tables_in_images])
                    }

                })
                .catch((error) => {
                    throw error;
                })
        }
        fetchData();
    }, [])

    return (
        <div className="page-content">

            <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route path='/search-rdh-ro' component={() => <SCH_RDH_RO name={login} />}></Route>

                <Route path='/rdh-ro' component={() => <RDH_RO name={login} swfwList={data_swfw} imageName={nameTitle} />}></Route>

                <Route path='/sw-fw' component={() => <SWFW name={login} />}></Route>
                <Route path='/add-img' component={() => <AddImage name={login} />}></Route>
                <Route path='/showImg' component={() => <ShowImages name={login} />}></Route>
            </Switch>

        </div>
    )
}