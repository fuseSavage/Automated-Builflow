import { TextField, Tooltip } from '@material-ui/core'
import Axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function SCH_AMA_LSD_SDET(props) {

    const { name } = props
    const history = useHistory()
    const [exp_bin, setExp_bin] = useState('');
    const [statusResult, setStatusResult] = useState('')

    const handleSubmit =  () => {

        if (name) {
             Axios.get(`http://localhost:3001/ama-lsd-sdet?exp_bin=${exp_bin}`)
                .then((response) => {

                    if (response.data.message) {
                        setStatusResult(response.data.message)
                    } else {
                    //    console.log('data', response.data)
                       const result = response.data
                       const data = [];
                       if (result.length !== 0) {
                           result.forEach((e, index) => {
                               let build = {};
                               build = {
                                   EXP_ID: e[0],
                                   SDET_ET_TSR: e[1],
                                   L_SLD_TAB: e[2],
                                   L_SLD_BUILD_GROUP: e[3],
                                   L_SLD_BO: e[4],
                                   L_SLD_PART_NUM: e[5],
                                   PRODUCTFAMILY: e[6],
                                   PARTNUM: e[7],
                                   SLD_BO: e[8],
                                   THREE_DIGIT_WAFER_CODE: e[9],
                                   AIRBEARINGDESIGN: e[10],
                                   SDET_ACTIVATION_DT: e[11],
                                   SDET_BN: e[12],
                                   SDET_BUILDGROUP: e[13],
                                   SDET_CONTROLGROUP: e[14],
                                   SDET_MIN_QTY: e[15],
                                   SDET_PART_OF_EXP: e[16],
                                   SDET_PRIORITY: e[17],
                                   SDET_QTY: e[18],
                                   SDET_RETEST_BUILD_NUMBER: e[19],
                                   SDET_SETS_PARTNUM: e[20],
                                   SDET_SETS_VERSION: e[21],
                                    SDET_SITE: e[22],
                                   SDET_TAB: e[23],
                               }

                               data.push(build)
                           });
                           history.push({
                               pathname: '/ama-lsd-sdet',
                               state: { data: data }
                           })
                        //    console.log('new data', data)
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
                <p>Create buil flow AMA - L-Slider SDET</p>
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