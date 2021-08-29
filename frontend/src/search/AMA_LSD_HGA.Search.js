import { TextField, Tooltip } from '@material-ui/core'
import Axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function SCH_AMA_LSD_HGA(props) {

    const { name } = props
    const history = useHistory()
    const [exp_bin, setExp_bin] = useState('');
    const [statusResult, setStatusResult] = useState('')

    const handleSubmit =  () => {

        if (name) {
             Axios.get(`http://localhost:3001/ama-lsd-hga?exp_bin=${exp_bin}`)
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
                                   HGA_ET_TSR: e[1],
                                   L_SLD_BO: e[2],
                                   L_SLD_BUILD_GROUP: e[3],
                                   L_SLD_PART_NUM: e[4],
                                   L_SLD_TAB: e[5],
                                   BUILDGROUP: e[6],
                                   SDET_BN: e[7],
                                   HGA_QTY: e[8],
                                   PRODUCTFAMILY: e[9],
                                   PARTNUM: e[10],
                                   BLD_INTENT_TYPE: e[11],
                                   HGA_SUSPENSION_PN: e[12],
                                   HGA_PART_NUM: e[13],
                                   SLC_PRIORITY: e[14],
                                   PARM_HGA_TAB: e[15],
                                   HGA_BO: e[16],
                                   AIRBEARINGDESIGN: e[17],
                                   SLD_BO: e[18],
                                   TSR_PN_G_SAAM: e[29],
                                   CL_TSR_PN_I_ELECTRIC1: e[20],
                                   THREE_DIGIT_WAFER_CODE: e[21],
                               }

                               data.push(build)
                           });
                           
                           history.push({
                               pathname: '/ama-lsd-hga',
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
                <p>Create buil flow AMA - L-Slider HGA</p>
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