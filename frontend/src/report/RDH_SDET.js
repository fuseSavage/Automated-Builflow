import { TableContainer, Table, TableCell, TableHead, TableRow, Paper, TableBody, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import Axios from 'axios';

function createTableHeader(nameHeader) {
    return { nameHeader }
}
const rowHeader = [
    createTableHeader('No.'),
    createTableHeader('PERFIX'),
    createTableHeader('PRIORITY '),
    createTableHeader('&nbsp;&nbsp;TAB&nbsp&nbsp'),
    createTableHeader('SDET&nbsp;BO '),
    createTableHeader('AAB&nbsp;Design'),
    createTableHeader(`SDET&nbsp;loading&nbsp;Q'ty`),
    createTableHeader('SDET&nbsp;Retest&nbsp;BIN'),
    createTableHeader('SDET&nbsp;Retest&nbsp;BO'),
    createTableHeader('SEQ#/Old&nbsp;BO'),
    createTableHeader('WAF_CODE'),
    createTableHeader('W/O'),
    createTableHeader('Work&nbsp;Order&nbsp;File'),
    createTableHeader('SAAM&nbsp;TSR'),
    createTableHeader('ET&nbsp;TSR'),
    createTableHeader('TMWI&nbsp;ET'),
    createTableHeader('Build&nbsp;Num&nbsp;ET'),
    createTableHeader('ET&nbsp;S/W'),
    createTableHeader('ET&nbsp;F/W'),
];

function binDetail(title) {
    return { title }
}
const rowBinDetail = [
    binDetail('TAB'),
    binDetail('SETS&nbsp;J1.1&nbsp;P/N'),
    binDetail('Slider&nbsp;P/N')
]

function product(title, result) {
    return { title, result }
}

export default function RDH_SDET(props) {

    const data = useLocation().state.data;
    const { swfwList, imageName } = props
    const [textEditer, setTextEditer] = useState('');
    const [expID, setExpID] = useState(data[0].EXP_ID)


    //************************ set partNum  START ************************//
    const [PNDn, setPNDn] = useState()
    const [PNUp, setPNUp] = useState()
    const [sdetPNDn, setSdetPNDn] = useState()
    const [sdetPNUp, setSdetPNUp] = useState()
    useEffect(() => {
        async function fetchData() {
            data.forEach(e => {
                if (e.SDET_TAB === '0') {
                    setPNDn(e.PARTNUM)
                    setSdetPNDn(e.SDET_SETS_PARTNUM)
                }
                if (e.SDET_TAB === '1') {
                    setPNUp(e.PARTNUM)
                    setSdetPNUp(e.SDET_SETS_PARTNUM)
                }
                setinputFieldQTY(arr => [...arr, e.SDET_QTY])
            });
        }
        fetchData();
    }, [data])
    //************************ set partNum  END ************************//



    //************************ input input QTY && WOF START ************************//
    const [inputFieldQTY, setinputFieldQTY] = useState([])
    const handleInputQTY = (index, event) => {
        const values = [...inputFieldQTY];
        values[index] = event.target.value;
        setinputFieldQTY(values);
    };

    const [inputFieldWOF, setinputFieldWOF] = useState([])
    const handleInputWOF = (index, event) => {
        const values = [...inputFieldWOF];
        values[index] = event.target.value;
        setinputFieldWOF(values);
    };

    const [allQTY, setAllQTY] = useState([])
    const handleInputAllQTY = (event) => {
        const values = [...allQTY];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            setAllQTY(values);
        }
    }
    const handleSubmitQTY = () => {
        setinputFieldQTY(allQTY)
    }

    const [allWOF, setAllWOF] = useState([])
    const handleInputAllWOF = (event) => {
        const values = [...allWOF];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            setAllWOF(values);
        }
    }
    const handleSubmitWOF = () => {
        setinputFieldWOF(allWOF)
    }
    //************************ input input QTY && WOF END ************************//


    // *********************** div Preview-grid START ****************************//
    const [persurface, setPersurface] = useState(500)
    const [swfw, setSWFW] = useState(["4.51B213", "SHF 1.6.1.246"])
    const [newswfw, setNewSWFW] = useState('')
    const handleSelectSWFW = (e) => {
        setSWFW((e.target.value).split("/"))
        setNewSWFW(e.target.value)
    }

    const [dataImage, setDataImage] = useState([])
    const handleSelectImage = (e) => {
        let imageName = e.target.value
        if (imageName.length !== 0) {
            console.log('image', imageName)
            Axios.get(`http://localhost:3001/getImage`, {
                params: {
                    title: imageName,
                }
            })
                .then((response) => {
                    setDataImage(response.data)
                })
                .catch((error) => {
                    throw error;
                })
        }
    }


    // *********************** div Preview-grid END ****************************//

    // ***********************  Handle Preview START ****************************//
    const [newSW, setNewSW] = useState('')
    const [newFW, setNewFW] = useState('')

    const [newProduct, setNewProduct] = useState([])

    function handlePreview() {
        setNewSW(swfw[0])
        setNewFW(swfw[1])

        const rowCal = createCalculate(0, 0, 0)

        const rowProduct = [
            product('BIN', data[0].EXP_ID),
            product('PRODUCT', data[0].PRODUCTFAMILY),
            product('BIN QTY', rowCal.sumQTY),
            product('No. BO', rowCal.NoBO),
            product('No surface', rowCal.NoSurface),
            product('Unit per. surface', persurface)
        ]

        setNewProduct(rowProduct)

    }
    // ***********************  Handle Preview END ****************************//

    // ***********************  Calculate After click Preview START ***************************//

    const NoQTY = inputFieldQTY.map(Number);
    function createCalculate(sumQTY, NoBO, NoSurface, newData = []) {
        for (let i = 0; i < inputFieldQTY.length; i++) {
            if (NoQTY[i] > 1) {
                sumQTY = sumQTY + NoQTY[i]
                NoBO = NoBO + 1
            }
        }
        if (sumQTY !== 0) {
            NoSurface = Math.ceil(sumQTY / persurface);
        }
        for (let i = 0; i < data.length; i++) {
            if (inputFieldQTY[i] !== "" && inputFieldQTY[i] != null && inputFieldQTY[i] !== "0") {
                newData.push(data[i])
            }
        }
        return { sumQTY, NoBO, NoSurface, newData };
    }

    // ***********************  Calculate After click Preview END ****************************//

    const host = `${window.location.protocol}//${window.location.hostname}:3001`
    return (
        <div className="main-content">
            <p>Flow RDH-SDET</p>
            <TableContainer className="detail-card" component={Paper} style={{ width: '280px' }}>
                <Table size="small" aria-label="customized table">
                    <TableBody>
                        <TableRow hover >
                            <TableCell align="right" className="detail-card" style={{ color: 'aliceblue' }}>
                                BIN
                            </TableCell>
                            <TableCell >
                                <input type="text" value={expID} onChange={(e) => {
                                    setExpID(e.target.value)
                                }}></input>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer className="detail-card m-t-3" component={Paper} style={{ width: '350px' }}>
                <Table size="small" aria-label="customized table">
                    <TableHead>
                        <TableRow className="table-h">
                            {rowBinDetail.map((val, index) => (
                                <TableCell key={index} align="center" className="table-h-text">
                                    {Parser(val.title)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow align="center">
                            <TableCell>Up-01</TableCell>
                            <TableCell>{sdetPNUp}</TableCell>
                            <TableCell>{PNUp}</TableCell>
                        </TableRow>
                        <TableRow align="center">
                            <TableCell>Dn-00</TableCell>
                            <TableCell>{sdetPNDn}</TableCell>
                            <TableCell>{PNDn}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                <Grid component={Paper} className="m-t-3">
                    <ReactQuill
                        theme="snow"
                        value={textEditer}
                        onChange={setTextEditer}
                        placeholder="..... Write something ....." />
                </Grid>

                <TableContainer className="main-table" component={Paper} >
                    <Table size="small" aria-label="customized table">

                        <TableHead>
                            <TableRow className="table-h">
                                {rowHeader.map((row, index) => (
                                    <TableCell key={index} align="right" className="table-h-text">
                                        {Parser(row.nameHeader)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((val, index) => {
                                let tab;
                                if (val.SDET_TAB === '0') {
                                    tab = 'DN-00'
                                } else {
                                    tab = 'UP-01'
                                }
                                return (
                                    <TableRow key={index} hover>
                                        <TableCell align="right">{index + 1}</TableCell>
                                        <TableCell align="right">{val.SDET_BUILDGROUP}</TableCell>
                                        <TableCell align="right">{val.SDET_PRIORITY}</TableCell>
                                        <TableCell align="right">{tab}</TableCell>
                                        <TableCell align="right">{val.SDET_BN}</TableCell>
                                        <TableCell align="right">{val.AIRBEARINGDESIGN}</TableCell>
                                        <TableCell align="center">
                                            <input className="input-size" type="number" value={inputFieldQTY[index]} onChange={event => {
                                                handleInputQTY(
                                                    index,
                                                    event
                                                );

                                            }} />
                                        </TableCell>
                                        {val.SDET_BUILDGROUP === 'SFR' ? <TableCell align="right">RDH_?????</TableCell> : <TableCell align="right">null</TableCell>}
                                        {val.SDET_BUILDGROUP === 'SFR' ? <TableCell align="right">RDH_?????</TableCell> : <TableCell align="right">null</TableCell>}
                                        <TableCell align="right">{val.SLD_BO}</TableCell>
                                        <TableCell align="right">{val.THREE_DIGIT_WAFER_CODE}</TableCell>
                                        <TableCell align="right">{val.SDET_BUILDGROUP}{val.SDET_BN.slice(2)}{tab[0]}</TableCell>
                                        <TableCell align="right">{val.SDET_BUILDGROUP}{val.SDET_BN.slice(2)}{tab[0]}-
                                            <input className="input-size" type="number" value={inputFieldWOF[index]} onChange={event => {
                                                handleInputWOF(
                                                    index,
                                                    event
                                                );

                                            }} />
                                            .wo
                                        </TableCell>
                                        <TableCell align="right">หาไม่เจอครับ</TableCell>
                                        <TableCell align="right">{val.SDET_ET_TSR}</TableCell>
                                        <TableCell align="right">{val.SDET_BUILDGROUP}{val.SDET_BN.slice(2)}</TableCell>
                                        <TableCell align="right">{val.SDET_BN}</TableCell>
                                        <TableCell align="right">{newSW}</TableCell>
                                        <TableCell align="right">{newFW}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>

                <Grid component={Paper} className="w-400">
                    <div className="qty-content">
                        <div className="grid-qty-content">
                            <p>Set QTY : </p>
                            <p>
                                <input className="input-size" type="number" onChange={event => {
                                    handleInputAllQTY(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitQTY}>submit</p>
                        </div>
                        <div className="grid-qty-content">
                            <p>Set Work Order File : </p>
                            <p>
                                <input className="input-size" type="number" onChange={event => {
                                    handleInputAllWOF(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitWOF}>submit</p>
                        </div>
                    </div>
                </Grid>

                <div className="content-preview">
                    <Grid component={Paper}>
                        <div className="grid-content">
                            <p>Set HGA BO Per surface :
                                <input type="number" value={persurface} onChange={(event) => {
                                    setPersurface(event.target.value);
                                }} />
                            </p>

                            <p>SW/FW :
                                <select value={newswfw} onChange={handleSelectSWFW} >
                                    {swfwList.map((val) => {
                                        return (
                                            <option key={val.id} value={val.swfw}>{val.swfw}</option>
                                        )
                                    })}
                                </select>
                            </p>

                            <p className="submit-preview" onClick={handlePreview}>Preview</p>
                        </div>
                    </Grid>
                </div>
            </div>

            {newProduct.length !== 0 && persurface > 0 ? (
                <div>

                    <div className="m-t-3">
                        <TableContainer className="detail-card" component={Paper} style={{ width: '280px' }}>
                            <Table size="small" aria-label="customized table">
                                <TableBody>
                                    {newProduct.map((val, index) => (
                                        <TableRow hover key={index} >
                                            <TableCell align="right" className="detail-card" style={{ color: 'aliceblue' }}>
                                                {val.title}
                                            </TableCell>
                                            <TableCell >
                                                {val.result}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>


                    <div>
                        <p>Image Flow :
                            <select onChange={handleSelectImage} >
                                <option> select image</option>
                                {imageName.map((val, index) => {
                                    return (
                                        <option key={index} value={val}>{val}</option>
                                    )
                                })}
                            </select>
                        </p>
                        <div className="m-t-3 grid-images">
                            {dataImage.map((val, index) => (
                                    <a key={index} href={`${host}/showImages/${(encodeURIComponent(val.images.trim()))}`}>
                                        <img src={`${host}/showImages/${(encodeURIComponent(val.images.trim()))}`} alt="not images" width="350" height="auto" />
                                    </a>
                            ))}
                        </div>

                    </div>

                </div>
            ) : null}

        </div>

    )
}