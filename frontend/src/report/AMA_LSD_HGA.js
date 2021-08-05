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
    createTableHeader('Wafer'),
    createTableHeader('&nbsp;AAB&nbsp;&nbsp;Design&nbsp;'),
    createTableHeader('Group'),
    createTableHeader('L&nbsp;-&nbsp;Slider&nbsp;from SDET&nbsp;BO'),
    createTableHeader('SDET&nbsp;sort'),
    createTableHeader('HGA&nbsp;BO'),
    createTableHeader(`HGA&nbsp;loading&nbsp;Q'ty`),
    createTableHeader('HGA&nbsp;WO&nbsp;file'),
    createTableHeader('TAB'),
    createTableHeader('TMWI'),
    createTableHeader('Build&nbsp;Num&nbsp;'),
    createTableHeader('ET&nbsp;TSR&nbsp;'),
    createTableHeader('Meadia&nbsp;LOT'),
    createTableHeader('Flamework'),
    createTableHeader('WITE&nbsp;Revision'),
];

function binDetail(title) {
    return { title }
}
const rowBinDetail = [
    binDetail('TAB'),
    binDetail('L&nbsp;-&nbsp;Slider&nbsp;P/N'),
    binDetail('HGA&nbsp;P/N'),
    binDetail('TGA&nbsp;P/N'),

]

function product(title, result) {
    return { title, result }
}

export default function AMA_LSD_HGA(props) {

    const data = useLocation().state.data;
    const { swfwList, imageName } = props
    const [textEditer, setTextEditer] = useState('');
    const [expID, setExpID] = useState(data[0].EXP_ID)

    console.log(data)

    //************************ set Bin Detail  START ************************//
    const [productfamily, setProductfamily] = useState()

    const [lsdPN_D, setlsdPN_D] = useState()
    const [lsdPN_U, setlsdPN_U] = useState()
    const [hgaD, sethgaD] = useState()
    const [hgaU, sethgaU] = useState()
    const [tgaD, settgaD] = useState()
    const [tgaU, settgaU] = useState()

    useEffect(() => {
        async function fetchData() {
            data.forEach(e => {
                if (e.L_SLD_TAB === 'Down-00') {
                    setlsdPN_D(e.L_SLD_PART_NUM)
                    sethgaD(e.HGA_PART_NUM)
                    settgaD(e.HGA_SUSPENSION_PN)
                }
                if (e.L_SLD_TAB === 'Up-01') {
                    setlsdPN_U(e.L_SLD_PART_NUM)
                    sethgaU(e.HGA_PART_NUM)
                    settgaU(e.HGA_SUSPENSION_PN)
                }
                setinputFieldQTY(arr => [...arr, e.HGA_QTY])
                setinputFieldAAB((arr => [...arr, e.AIRBEARINGDESIGN.slice(0, 3) + '.' + e.AIRBEARINGDESIGN.slice(3, 5) + ' ' + e.AIRBEARINGDESIGN.slice(5)]))
                setinputFieldWafer(arr => [...arr, e.THREE_DIGIT_WAFER_CODE])
                setExpID(e.EXP_ID)
                setProductfamily(e.PRODUCTFAMILY)
                // val.AIRBEARINGDESIGN.slice(0, 3) + '.' + val.AIRBEARINGDESIGN.slice(3, 5) + ' ' + val.AIRBEARINGDESIGN.slice(5)
            });
        }
        fetchData();
    }, [data])
    //************************ ser Bin Detail  END ************************//



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

    const [inputFieldWafer, setinputFieldWafer] = useState([])
    const handleInputWafer = (index, event) => {
        const values = [...inputFieldWafer];
        values[index] = event.target.value;
        setinputFieldWafer(values);
    };

    const [inputFieldAAB, setinputFieldAAB] = useState([])
    const handleInputAAB = (index, event) => {
        const values = [...inputFieldAAB];
        values[index] = event.target.value;
        setinputFieldAAB(values);
    };

    const [inputFieldSort, setinputFieldSort] = useState([])
    const handleInputSort = (index, event) => {
        const values = [...inputFieldSort];
        values[index] = event.target.value;
        setinputFieldSort(values);
    };
    const [allSort, setAllSort] = useState([])
    const handleInputAllSort = (event) => {
        const values = [...allSort];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            setAllSort(values);
        }
    }
    const handleSubmitSort = () => {
        setinputFieldSort(allSort)
    }


    //************************ input input QTY && WOF END ************************//


    // *********************** div Preview-grid START ****************************//
    const [persurface, setPersurface] = useState(500)
    const [swfw, setSWFW] = useState(["4.51B213", "SHF 1.6.1.246"])
    const [newswfw, setNewSWFW] = useState('')

    const [testON, setTestON] = useState('')

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
    const [newTestOn, setNewTestOn] = useState('')

    const [newProduct, setNewProduct] = useState([])

    function handlePreview() {
        setNewSW(swfw[0])
        setNewFW(swfw[1])
        setNewTestOn(testON)

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
            <p>Flow AMA L-Slider HGA</p>
            <TableContainer className="detail-card" component={Paper} style={{ width: '280px' }}>
                <Table size="small" aria-label="customized table">
                    <TableBody>
                        <TableRow hover >
                            <TableCell align="right" className="detail-card" style={{ color: 'aliceblue' }}>
                                BIN
                            </TableCell>
                            <TableCell >{expID}</TableCell>
                        </TableRow>
                        <TableRow hover >
                            <TableCell align="right" className="detail-card" style={{ color: 'aliceblue' }}>
                                PRODUCT
                            </TableCell>
                            <TableCell >{productfamily}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer className="detail-card m-t-3" component={Paper} style={{ width: '520px' }}>
                <Table size="small" aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {rowBinDetail.map((val, index) => (
                                <TableCell key={index} align="center" className="table-h-text">
                                    {Parser(val.title)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow align="center">
                            <TableCell>Up</TableCell>

                            <TableCell><input type="text" className="i-s-5" value={lsdPN_U} onChange={(e) => {
                                setlsdPN_U(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={hgaU} onChange={(e) => {
                                sethgaU(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={tgaU} onChange={(e) => {
                                settgaU(e.target.value)
                            }} /></TableCell>

                        </TableRow>
                        <TableRow align="center">
                            <TableCell>Dn</TableCell>

                            <TableCell><input type="text" className="i-s-5" value={lsdPN_D} onChange={(e) => {
                                setlsdPN_D(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={hgaD} onChange={(e) => {
                                sethgaD(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={tgaD} onChange={(e) => {
                                settgaD(e.target.value)
                            }} /></TableCell>
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
                                if (val.L_SLD_TAB === 'Down-00') {
                                    tab = 'Dn'
                                } else {
                                    tab = 'Up'
                                }
                                return (
                                    <TableRow key={index} hover>
                                        <TableCell align="right">
                                            <input className="input-size" type="text" value={inputFieldWafer[index]} onChange={event => {
                                                handleInputWafer(
                                                    index,
                                                    event
                                                );

                                            }} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input className="i-s-5" type="text" value={inputFieldAAB[index]} onChange={event => {
                                                handleInputAAB(
                                                    index,
                                                    event
                                                );

                                            }} />
                                        </TableCell>
                                        <TableCell align="right">Group ?</TableCell>
                                        <TableCell align="right">{val.SDET_BN}</TableCell>
                                        <TableCell align="right">
                                            <input className="input-size" type="text" value={inputFieldSort[index]} onChange={event => {
                                                handleInputSort(
                                                    index,
                                                    event
                                                );
                                            }} />
                                        </TableCell>
                                        <TableCell align="right">{val.HGA_BO}</TableCell>
                                        <TableCell align="right">
                                            <input className="input-size" type="number" value={inputFieldQTY[index]} onChange={event => {
                                                handleInputQTY(
                                                    index,
                                                    event
                                                );

                                            }} />
                                        </TableCell>
                                        <TableCell align="center">{val.BUILDGROUP}{val.HGA_BO.slice(2)}{tab[0]}-
                                            <input className="input-size" type="number" value={inputFieldWOF[index]} onChange={event => {
                                                handleInputWOF(
                                                    index,
                                                    event
                                                );

                                            }} />
                                            .wo
                                        </TableCell>
                                        <TableCell align="right">{tab}</TableCell>
                                        <TableCell align="right">{val.BUILDGROUP}{val.HGA_BO.slice(2)}</TableCell>
                                        <TableCell align="right">{val.HGA_BO}</TableCell>
                                        <TableCell align="right">{val.HGA_ET_TSR}</TableCell>
                                        <TableCell align="right">{newTestOn}</TableCell>
                                        <TableCell align="right">{newFW}</TableCell>
                                        <TableCell align="right">{newSW}</TableCell>
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
                        <div className="grid-qty-content">
                            <p>Set Sort : </p>
                            <p>
                                <input className="input-size" type="text" onChange={event => {
                                    handleInputAllSort(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitSort}>submit</p>
                        </div>
                    </div>
                </Grid>

                <div className="content-preview">
                    <Grid component={Paper}>
                        <div className="grid-content">
                            <p>Set surface :
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

                            <p>1) Set Media Lot :
                                <input type="text" value={testON} onChange={(event) => {
                                    setTestON(event.target.value);
                                }} />
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