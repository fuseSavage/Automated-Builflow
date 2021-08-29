// // import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core'
// import { Grid, Paper, Tooltip } from '@material-ui/core'
// import React, { useEffect, useState } from 'react'
// // import Axios from 'axios'
// // import { useHistory } from 'react-router-dom'

// export default function AddImage(props) {

//     // const history = useHistory()
//     // const [nameTitle, setNameTitle] = useState([])
//     const [selectfile, setSelectFile] = useState([])

//     const [imagesName, setImagesName] = useState([])
//     const host = `${window.location.protocol}//${window.location.hostname}:3001`

//     useEffect(() => {
//         function fetchData() {
//             // Axios.get(`http://localhost:3001/check-title`)
//             //     .then((response) => {
//             //         for (let i = 0; i < response.data.length; i++) {
//             //             setNameTitle(arrlist => [...arrlist, response.data[i].Tables_in_images])
//             //         }

//             //     })
//             //     .catch((error) => {
//             //         throw error;
//             //     })
//             if (imagesName.length !== 0) {
//                 console.log('test', imagesName)
//             }
//         }
//         fetchData();




//     }, [imagesName])

//     const handleselectImg = (e) => {
//         setSelectFile(e.target.files)
//     }

//     // const handleEdit = async (title) => {
//     //     await Axios.get(`http://localhost:3001/getImage?title=${title}`)
//     //         .then(() => {
//     //             history.push({
//     //                 pathname: '/showImg',
//     //                 state: {
//     //                     imgName: title
//     //                 }
//     //             })
//     //         })
//     //         .catch((error) => {
//     //             throw error;
//     //         })
//     // }

//     // const handleDelete = async (title) => {
//     //     Axios.delete(`http://localhost:3001/deleteTitle?title=${title}`)
//     //         .then(() => {
//     //             history.go(0)
//     //         })
//     //         .catch((err) => {
//     //             throw err
//     //         })
//     // }

//     const handleUpload = () => {
//         if (selectfile != null) {
//             let formData = new FormData();
//             for (const key of Object.keys(selectfile)) {
//                 formData.append('imagesArray', selectfile[key])
//             }

//             fetch(`http://localhost:3001/uploadimg`, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Accept': 'multipart/form-data',
//                 },
//                 credentials: 'include',
//             })
//                 .then(async (res) => {
//                     const data = await res.json()
//                     setImagesName(data)
//                 })
//                 .catch(error => {
//                     throw error;
//                 })
//         } else {
//             alert('Please select image ')
//         }
//     }


//     // console.log('test', test)

//     return (
//         <div className="main-content">
//             {/* <div className="margin-content">
//                 <p> Add Image Flow</p>
//                 <div>
//                     <TableContainer component={Paper}>
//                         <Table size="small" aria-label="simple table">
//                             <TableHead>
//                                 <TableRow className="table-h">
//                                     <TableCell align="center"><p>No</p></TableCell>
//                                     <TableCell align="center"><p>Name</p></TableCell>
//                                     <TableCell align="center"><p>Edit</p></TableCell>
//                                     <TableCell align="center"><p>Delete</p></TableCell>
//                                 </TableRow>
//                             </TableHead>

//                             <TableBody>
//                                 {nameTitle.map((val, index) => (
//                                     <TableRow key={index} hover>
//                                         <TableCell align="center">{index + 1}</TableCell>
//                                         <TableCell align="center"><b>{val}</b></TableCell>
//                                         <TableCell align="center">
//                                             <Tooltip title="edit">
//                                                 <p className="submit-preview" onClick={() => { handleEdit(val) }}>
//                                                     Edit
//                                                 </p>
//                                             </Tooltip>
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             <Tooltip title="delete">
//                                                 <p className="submit-delete" onClick={() => {
//                                                     if (window.confirm('Are you sure you wish to delete this item?'))
//                                                         handleDelete(val)
//                                                 }}>
//                                                     Delete
//                                                 </p>
//                                             </Tooltip>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </div>
//             </div> */}

//             <div className="main-content">
//                 <Grid component={Paper}>
//                     <div className="form-group">
//                         <p>Select Image</p>
//                         <input type="file" multiple onChange={(e) => handleselectImg(e)} />
//                         <Tooltip title="upload">
//                             <p className="submit-preview" onClick={handleUpload}>Submit</p>
//                         </Tooltip>
//                     </div>
//                     {imagesName.length !== 0 ? imagesName.map((val, index) => (
//                         <a key={index} href={`${host}/showImages/${(encodeURIComponent(val.trim()))}`}>
//                             <img src={`${host}/showImages/${(encodeURIComponent(val.trim()))}`} alt="not images" />
//                         </a>
//                     )) : <p className="p-5-10">Please select images</p>}
//                 </Grid>
//             </div>
//         </div>
//     )
// }