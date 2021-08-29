// import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core'
// import React, { useEffect, useState } from 'react'
// import { useLocation, useHistory } from 'react-router-dom'
// import Axios from 'axios'

// export default function ShowImages(props) {

//     // const dataImage = useLocation().state.dataImage
//     const imgName = useLocation().state.imgName
//     const history = useHistory();

//     const [dataImage, setDataImage] = useState([])
//     const [selectfile, setSelectFile] = useState()

//     const host = `${window.location.protocol}//${window.location.hostname}:3001`

//     useEffect(() => {
//         async function fetchData() {
//             Axios.get(`http://localhost:3001/getImage`, {
//                 params: {
//                     title: imgName,
//                 }
//             })
//                 .then((response) => {
//                     setDataImage(response.data)
//                 })
//                 .catch((error) => {
//                     throw error;
//                 })
//         }
//         fetchData()
//     }, [imgName, props.name, history])

//     const handleDelete = async (id) => {

//         await Axios.delete(`${host}/deleteItem?id=${id}&title=${imgName}`)
//             .then(() => {
//                 history.go(0)
//             })
//             .catch((err) => {
//                 throw err;
//             })
//     }

//     const handleselectImg = (e) => {
//         setSelectFile(e.target.files)
//     }

//     const handleUpload = () => {
//         if (selectfile != null) {
//             let formData = new FormData();
//             for (const key of Object.keys(selectfile)) {
//                 formData.append('imagesArr', selectfile[key])
//             }
//             fetch(`${host}/changeImage?title=${imgName}`, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Accept': 'multipart/form-data',
//                 },
//                 credentials: 'include',
//             })
//                 .then(() => {
//                 })
//                 .catch((error) => {
//                     throw error;
//                 })

//             history.go(0)
//         } else {
//             alert("Please Select Image");
//         }
//     }


//     return (
//         <div className="main-content">
//             <h2><b>Image Name :  {imgName}</b></h2>
//             <div className="margin-content">
            
//                 <TableContainer component={Paper}>
//                     <Table size="small" aria-label="simple table">
//                         <TableHead>
//                             <TableRow className="table-h">
//                                 <TableCell align="center"><p>No.</p></TableCell>
//                                 <TableCell align="center"><p>Images</p></TableCell>
//                                 <TableCell align="center"><p>Delete</p></TableCell>
//                             </TableRow>
//                         </TableHead>

//                         <TableBody>
//                             {dataImage.map((val, index) => (
//                                 <TableRow key={index} hover >
//                                     <TableCell align="center">{index + 1}</TableCell>
//                                     <TableCell align="center">
//                                         <a href={`${host}/showImages/${(encodeURIComponent(val.images.trim()))}`}>
//                                             <img src={`${host}/showImages/${(encodeURIComponent(val.images.trim()))}`} alt="not images" />
//                                         </a>
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Tooltip title="delete">
//                                             <p className="submit-delete" onClick={() => {
//                                                 if (window.confirm('Are you sure you wish to delete this item?'))
//                                                     handleDelete(val.id)
//                                             }}>
//                                                 delete
//                                             </p>
//                                         </Tooltip>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//             </div>

//             <div className="main-content">
//                 <p>Add Images</p>
//                 <Grid component={Paper}>
//                     <div className="form-group">
//                         <p>Select Image</p>
//                         <input type="file" multiple onChange={(e) => handleselectImg(e)} />
//                         <Tooltip title="upload">
//                             <p className="submit-preview" onClick={handleUpload}>Upload</p>
//                         </Tooltip>
//                     </div>
//                 </Grid>
//             </div>
//         </div>
//     )
// }