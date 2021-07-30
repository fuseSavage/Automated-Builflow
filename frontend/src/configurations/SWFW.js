import React, { useEffect, useState } from 'react'
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from '@material-ui/core'

import Axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function SWFW(props) {

    const { name } = props
    const history = useHistory();
    const [data_swfw, setData_SWFW] = useState([])
    const [sw, setSW] = useState("")
    const [fw, setFW] = useState("")

    useEffect(() => {
        async function fetchData() {
            const host = `${window.location.protocol}//${window.location.hostname}:3001`
            await Axios.get(`${host}/swfw`)
                .then((response) => {
                    setData_SWFW(response.data)
                })
                .catch((error) => {
                    throw error;
                })
        }
        fetchData();
    }, [])

    function createTitle(title) {
        return { title }
    }
    const rowTitle = [
        createTitle('No.'),
        createTitle('SW'),
        createTitle('FW'),
        createTitle('Action'),
    ]

    const handleDelete = async (id) => {
        if (name) {
            await Axios.delete(`http://localhost:3001/delswfw?id=${id}`)
                .then(() => {
                    history.go(0)
                })
                .catch((error) => {
                    throw error;
                })
        } else {
            alert('Please login')
            history.push('/')
        }
    }

    const handleSubmit = async () => {
        let sw_fw = `${sw} / ${fw}`;

        if (name) {
            if (sw !== '' && fw !== '') {
                await Axios.post(`http://localhost:3001/add-swfw?sw_fw=${sw_fw}`)
                    .then(async (response) => {
                        if (response.data.message) {
                            alert(response.data.message);
                            history.go(0)
                        } else {
                            alert(response.data.message);
                            history.go(0)
                        }
                    })
                    .catch((error) => {
                        throw error;
                    })
            } else {
                alert('Please complete the information.')
            }
        } else {
            alert('Please login')
            history.push('/')
        }
    }

    return (
        <div className="main-content">
            <div className="margin-content">
                <p>SW FW Setting</p>
                <div>
                    <div className="container">
                        <TableContainer component={Paper} >
                            <Table size="small" aria-label="customized table" >
                                <TableHead>
                                    <TableRow className="table-h">
                                        {rowTitle.map((val, index) => (
                                            <TableCell key={index} align="right">
                                                <p> {val.title} </p>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {data_swfw.map((val, index) => (
                                        <TableRow hover key={index} >
                                            <TableCell align="right"> {index + 1} </TableCell>
                                            <TableCell align="right"> {val.swfw.split("/")[0]} </TableCell>
                                            <TableCell align="right"> {val.swfw.split("/")[1]} </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title='delete'>
                                                    <div>
                                                        <p className="submit-delete" type="submit" onClick={() => {
                                                            if (window.confirm('Are you sure you wish to delete this item?'))
                                                                handleDelete(val.id)
                                                        }} >Delete</p>
                                                    </div>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>

            <div className="margin-content m-t-5">
                <p> Add SW FW</p>
                <div>
                    <div className="table-swfw">
                        <Container component={Paper} >
                            <div className="box-input-sw">
                                <p>Input SW FW</p>
                                <div className="input">
                                    <p>SW : </p>
                                    <Tooltip title='SW'>
                                        <TextField
                                            label="Enter SW"
                                            color="primary"
                                            type="text"
                                            autoComplete="current-password"
                                            variant="filled"
                                            onChange={(e) => { setSW(e.target.value) }}
                                        />
                                    </Tooltip>
                                </div>

                                <div className="input">
                                    <p>FW : </p>
                                    <Tooltip title='FW'>
                                        <TextField
                                            label="Enter FW"
                                            color="primary"
                                            type="text"
                                            autoComplete="current-password"
                                            variant="filled"
                                            onChange={(e) => { setFW(e.target.value) }}
                                        />
                                    </Tooltip>
                                </div>
                                <Tooltip title='submit'>
                                    <div className="submit-default" onClick={handleSubmit} >
                                        <p type="submit">Submit</p>
                                    </div>
                                </Tooltip>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </div >
    )
}