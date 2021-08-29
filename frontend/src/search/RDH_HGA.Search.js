import { TextField, Tooltip } from '@material-ui/core'
import Axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function SCH_RDH_HGA(props) {

    const { name } = props
    const history = useHistory()
    const [exp_bin, setExp_bin] = useState('');
    const [statusResult, setStatusResult] = useState('')

    const handleSubmit = async () => {

        if (name) {
            await Axios.get(`http://localhost:3001/rdh-hga?exp_bin=${exp_bin}`)
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
                                    BUILDGROUP: e[1],
                                    SDET_BN: e[2],
                                    HGA_QTY: e[3],
                                    HGA_ET_TSR: e[4],
                                    PRODUCTFAMILY: e[5],
                                    PARTNUM: e[6],
                                    BLD_INTENT_TYPE: e[7],
                                    HGA_SUSPENSION_PN: e[8],
                                    HGA_PART_NUM: e[9],
                                    SLC_PRIORITY: e[10],
                                    PARM_HGA_TAB: e[11],
                                    HGA_BO: e[12],
                                    AIRBEARINGDESIGN: e[13],
                                    SLD_BO: e[14],
                                    TSR_PN_G_SAAM: e[15],
                                    CL_TSR_PN_I_ELECTRIC1: e[16],
                                    THREE_DIGIT_WAFER_CODE: e[17],
                                }

                                data.push(build)
                            });
                            history.push({
                                pathname: '/rdh-hga',
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
                <p>Create buil flow RDH - HGA </p>
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