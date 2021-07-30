import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function AddImage(props) {

    const history = useHistory()
    const [nameTitle, setNameTitle] = useState([])
    const [selectfile, setSelectFile] = useState()
    const [title, setTitle] = useState('')

    useEffect(() => {
        function fetchData() {
            Axios.get(`http://localhost:3001/check-title`)
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

    const handleselectImg = (e) => {
        setSelectFile(e.target.files)
    }

    const handleEdit = async (title) => {
        await Axios.get(`http://localhost:3001/getImage?title=${title}`)
            .then(() => {
                history.push({
                    pathname: '/showImg',
                    state: {
                        imgName: title
                    }
                })
            })
            .catch((error) => {
                throw error;
            })
    }

    const handleDelete = async (title) => {
        Axios.delete(`http://localhost:3001/deleteTitle?title=${title}`)
            .then(() => {
                history.go(0)
            })
            .catch((err) => {
                throw err
            })
    }

    const handleUpload = () => {
        if (title !== '') {
            if (selectfile != null) {
                if (nameTitle.includes(title) === false) {
                    console.log(title, selectfile)
                    let formData = new FormData();
                    for (const key of Object.keys(selectfile)) {
                        formData.append('imagesArray', selectfile[key])
                    }
                    fetch(`http://localhost:3001/uploadimg?title=${title}`, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'multipart/form-data',
                        },
                        credentials: 'include',
                    })
                        .then((res) => {
                            res.json()
                        })
                        .catch(error => {
                            throw error;
                        })
                    history.go(0)
                } else {
                    alert("This item already exists!!");
                }
            } else {
                alert('Please select image ')
            }
        } else {
            alert('Please enter image name ');
        }

    }




    return (
        <div className="main-content">
            <div className="margin-content">
                <p> Add Image Flow</p>
                <div>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow className="table-h">
                                    <TableCell align="center"><p>No</p></TableCell>
                                    <TableCell align="center"><p>Name</p></TableCell>
                                    <TableCell align="center"><p>Edit</p></TableCell>
                                    <TableCell align="center"><p>Delete</p></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {nameTitle.map((val, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center"><b>{val}</b></TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="edit">
                                                <p className="submit-preview" onClick={() => { handleEdit(val) }}>
                                                    Edit
                                                </p>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="delete">
                                                <p className="submit-delete" onClick={() => {
                                                    if (window.confirm('Are you sure you wish to delete this item?'))
                                                        handleDelete(val)
                                                }}>
                                                    Delete
                                                </p>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <div className="main-content">
                <p>Add Images</p>
                <Grid component={Paper}>
                    <div className="form-group">
                        <p>Image name</p>
                        <input type="text" required="wee" className="input-long" placeholder="input image name" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <p>Select Image</p>
                        <input type="file" multiple onChange={(e) => handleselectImg(e)} />
                        <Tooltip title="upload">
                            <p className="submit-preview" onClick={handleUpload}>Upload</p>
                        </Tooltip>

                    </div>
                </Grid>
            </div>
        </div>
    )
}