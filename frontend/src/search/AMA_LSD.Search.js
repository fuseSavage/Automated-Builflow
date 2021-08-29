import { TextField, Tooltip } from '@material-ui/core'
import Axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function SCH_AMA_LSD(props) {

    const { name } = props
    const history = useHistory()
    const [exp_bin, setExp_bin] = useState('');
    const [statusResult, setStatusResult] = useState('')

    const handleSubmit =  () => {

        if (name) {
             Axios.get(`http://localhost:3001/ama-lsd?exp_bin=${exp_bin}`)
                .then((response) => {

                    if (response.data.message) {
                        setStatusResult(response.data.message)
                    } else {
                        // console.log('data', response.data)
                        const result = response.data
                        const data = [];
                        if (result.length !== 0) {
                            result.forEach((e, index) => {
                                let build = {};
                                build = {
                                    EXP_ID: e[0],
                                    SDET_BN: e[1],
                                    L_SLD_TEAM: e[2],
                                    L_SLD_TAB: e[3],
                                    L_SLD_PART_NUM: e[4],
                                    SDET_ET_TSR: e[5],
                                    L_SLD_BO: e[6],
                                    L_SLD_CMP_DT: e[7],
                                    L_SLD_BUILD_GROUP: e[8],
                                    PRODUCTFAMILY: e[9],
                                    PARTNUM: e[10],
                                    SLD_BO: e[11],
                                    THREE_DIGIT_WAFER_CODE: e[12],
                                    AIRBEARINGDESIGN: e[13],
                                }

                                data.push(build)
                            });
                            history.push({
                                pathname: '/ama-lsd',
                                state: { data: data }
                            })
                            // console.log('new data', data)
                        }
                    }
                })
                .catch((error) => {
                    throw error;
                })
        } else {
            alert('Please login')
            history.push('/')
        }

    }


    return (
        <div className="main-content rdh-ro">
            <div className="box-content">
                <p>Create buil flow AMA - L-Slider </p>
                <div className="box-input">
                    <p>Search BIN</p>
                    <div className="input">
                        <p>BIN : </p>
                        <Tooltip title='EXP BIN'>
                            <TextField
                                label="Enter Exp BIN"
                                color="primary"
                                type="text"
                                autoComplete="current-password"
                                variant="filled"
                                onChange={(e) => { setExp_bin(e.target.value) }}
                            />
                        </Tooltip>
                    </div>
                    <Tooltip title='submit'>
                        <div className="submit-login"  >
                            <p type="submit" onClick={handleSubmit} >Submit</p>
                        </div>
                    </Tooltip>
                </div>
                <div className="text-status">
                    <p>{statusResult}</p>
                </div>
            </div>

        </div>
    )
}