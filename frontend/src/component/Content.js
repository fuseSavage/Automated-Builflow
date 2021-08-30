import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import Axios from 'axios'

import Home from '../report/Home';
import SCH_RDH_RO from '../search/RDH_RO.Search';

import RDH_RO from '../report/RDH_RO';
// import SWFW from '../configurations/SWFW';
// import AddImage from '../configurations/AddImage';
// import ShowImages from '../configurations/ShowImage';
import SCH_RDH_SDET from '../search/RDH_SDET.Search';
import RDH_SDET from '../report/RDH_SDET';
import SCH_RDH_HGA from '../search/RDH_HGA.Search';
import RDH_HGA from '../report/RDH_HGA';
import SCH_AMA_SDET from '../search/AMA_SDET.Search';
import AMA_SDET from '../report/AMA_SDET';
import SCH_AMA_HGA from '../search/AMA_HGA.Search';
import AMA_HGA from '../report/AMA_HGA';
import SCH_AMA_LSD from '../search/AMA_LSD.Search';
import AMA_LSD from '../report/AMA_LSD';
import SCH_AMA_LSD_HGA from '../search/AMA_LSD_HGA.Search';
import AMA_LSD_HGA from '../report/AMA_LSD_HGA';
import SCH_AMA_LSD_SDET from '../search/AMA_LSD_SDET.Search';
import AMA_LSD_SDET from '../report/AMA_LSD_SDET';

export default function Content() {

    const [login, setLogin] = useState()
    // const [data_swfw, setData_SWFW] = useState([])
    // const [nameTitle, setNameTitle] = useState([])

    
    useEffect(() => {
        async function fetchData() {
            // const host = `http://localhost:3001`
            // const host = `http://10.44.94.152:3001`
            const host = `http://10.127.241.88:3001`
            await Axios.get(`${host}/login`)
                .then((response) => {
                    if (response.data.loggedIn === true) {
                        setLogin(response.data.user)
                        // console.log('console test', response.data.user)
                    }
                })
                .catch((error) => {
                    throw error;
                })

            // await Axios.get(`${host}/swfw`)
            //     .then((response) => {
            //         setData_SWFW(response.data)
            //     })
            //     .catch((error) => {
            //         throw error;
            //     })

            // await Axios.get(`http://localhost:3001/check-title`)
            //     .then((response) => {
            //         for (let i = 0; i < response.data.length; i++) {
            //             setNameTitle(arrlist => [...arrlist, response.data[i].Tables_in_images])
            //         }

            //     })
            //     .catch((error) => {
            //         throw error;
            //     })
        }
        fetchData();
    }, [])

    return (
        <div className="page-content">

            <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route path='/search-rdh-ro' component={() => <SCH_RDH_RO name={login} />}></Route>
                <Route path='/search-rdh-sdet' component={() => <SCH_RDH_SDET name={login} />}></Route>
                <Route path='/search-rdh-hga' component={() => <SCH_RDH_HGA name={login} />}></Route>
                <Route path='/search-ama-sdet' component={() => <SCH_AMA_SDET name={login} />}></Route>
                <Route path='/search-ama-hga' component={() => <SCH_AMA_HGA name={login} />}></Route>
                <Route path='/search-ama-lsd' component={() => <SCH_AMA_LSD name={login} />}></Route>
                <Route path='/search-ama-lsd-hga' component={() => <SCH_AMA_LSD_HGA name={login} />}></Route>
                <Route path='/search-ama-lsd-sdet' component={() => <SCH_AMA_LSD_SDET name={login} />}></Route>

                <Route path='/rdh-ro' component={() => <RDH_RO name={login}   />}></Route>
                <Route path='/rdh-sdet' component={() => <RDH_SDET name={login}  />}></Route>
                <Route path='/rdh-hga' component={() => <RDH_HGA name={login}  />}></Route>
                <Route path='/ama-sdet' component={() => <AMA_SDET name={login}  />}></Route>
                <Route path='/ama-hga' component={() => <AMA_HGA name={login} />}></Route>
                <Route path='/ama-lsd' component={() => <AMA_LSD name={login} />}></Route>
                <Route path='/ama-lsd-hga' component={() => <AMA_LSD_HGA name={login} />}></Route>
                <Route path='/ama-lsd-sdet' component={() => <AMA_LSD_SDET name={login}  />}></Route>


                {/* <Route path='/sw-fw' component={() => <SWFW name={login} />}></Route> */}
                {/* <Route path='/add-img' component={() => <AddImage name={login} />}></Route> */}
                {/* <Route path='/showImg' component={() => <ShowImages name={login} />}></Route> */}
            </Switch>

        </div>
    )
}