import { TableContainer, Table, TableCell, TableHead, TableRow, Paper, TableBody, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import Axios from 'axios';
import ReactExport from 'react-data-export';



const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
    // createTableHeader('TRAY&nbsp;TYPE'),
    createTableHeader('TAB'),
    createTableHeader('TMWI'),
    createTableHeader('Build&nbsp;Num&nbsp;'),
    createTableHeader('ET&nbsp;TSR&nbsp;'),
    createTableHeader('Media&nbsp;LOT'),
    createTableHeader('Flamework'),
    createTableHeader('WITE&nbsp;Revision'),
];

function binDetail(title) {
    return { title }
}
const rowBinDetail = [
    binDetail('TAB'),
    binDetail('HGA&nbsp;P/N'),
    binDetail('TGA&nbsp;P/N'),

]

function product(title, result) {
    return { title, result }
}




export default function AMA_HGA(props) {

    const data = useLocation().state.data;
    const { swfwList, imageName } = props
    const [textEditer, setTextEditer] = useState('');
    const [expID, setExpID] = useState(data[0].EXP_ID)

    // console.log(data)

    //************************ set Bin Detail  START ************************//
    const [productfamily, setProductfanily] = useState()

    const [hgaD, sethgaD] = useState()
    const [hgaU, sethgaU] = useState()
    const [tgaD, settgaD] = useState()
    const [tgaU, settgaU] = useState()

    useEffect(() => {
        async function fetchData() {
            data.forEach(e => {
                if (e.PARM_HGA_TAB === 'Down-00') {
                    e.PARM_HGA_TAB = 'Dn'
                }
                if (e.PARM_HGA_TAB === 'Up-01') {
                    e.PARM_HGA_TAB = 'Up'
                }
                if (e.PARM_HGA_TAB === 'Dn') {
                    sethgaD(e.HGA_PART_NUM)
                    settgaD(e.HGA_SUSPENSION_PN)
                }
                if (e.PARM_HGA_TAB === 'Up') {
                    sethgaU(e.HGA_PART_NUM)
                    settgaU(e.HGA_SUSPENSION_PN)
                }
                setinputFieldQTY(arr => [...arr, e.HGA_QTY])
                setinputFieldAAB((arr => [...arr, e.AIRBEARINGDESIGN.slice(0, 3) + '.' + e.AIRBEARINGDESIGN.slice(3, 5) + ' ' + e.AIRBEARINGDESIGN.slice(5)]))
                setinputFieldWafer(arr => [...arr, e.THREE_DIGIT_WAFER_CODE])
                setExpID(e.EXP_ID)
                setProductfanily(e.BLD_INTENT_PLATFORM)
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
        data[index].HGA_QTY = event.target.value;
        setinputFieldQTY(values);
    };

    const [inputFieldWOF, setinputFieldWOF] = useState([])
    const handleInputWOF = (index, event) => {
        const values = [...inputFieldWOF];
        values[index] = event.target.value;
        data[index].WOF = data[index].BUILDGROUP + data[index].HGA_BO.slice(2) + data[index].PARM_HGA_TAB[0] + '-' + event.target.value + '.wo';
        setinputFieldWOF(values);
    };

    const [allQTY, setAllQTY] = useState([])
    const handleInputAllQTY = (event) => {
        const values = [...allQTY];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            data[i].HGA_QTY = event.target.value;
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
            data[i].WOF = data[i].BUILDGROUP + data[i].HGA_BO.slice(2) + data[i].PARM_HGA_TAB[0] + '-' + event.target.value + '.wo';
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
        data[index].THREE_DIGIT_WAFER_CODE = event.target.value;
        setinputFieldWafer(values);
    };

    const [inputFieldAAB, setinputFieldAAB] = useState([])
    const handleInputAAB = (index, event) => {
        const values = [...inputFieldAAB];
        values[index] = event.target.value;
        data[index].AIRBEARINGDESIGN = event.target.value;
        setinputFieldAAB(values);
    };

    const [inputFieldSort, setinputFieldSort] = useState([])
    const handleInputSort = (index, event) => {
        const values = [...inputFieldSort];
        values[index] = event.target.value;
        data[index].SORT = event.target.value;
        setinputFieldSort(values);
    };
    const [allSort, setAllSort] = useState([])
    const handleInputAllSort = (event) => {
        const values = [...allSort];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            data[i].SORT = event.target.value;
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

    // const [media, setMedia] = useState()
    const [testON, setTestON] = useState('')

    const handleSelectSWFW = (e) => {
        setSWFW((e.target.value).split("/"))
        setNewSWFW(e.target.value)
    }

    const [dataImage, setDataImage] = useState([])
    const handleSelectImage = (e) => {
        let imageName = e.target.value
        if (imageName.length !== 0) {
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
    // const [newMedia, setNewMedia] = useState('')

    const [newProduct, setNewProduct] = useState([])
    const [newData, setNewData] = useState([])

    function handlePreview() {
        setNewSW(swfw[0])
        setNewFW(swfw[1])
        setNewTestOn(testON)
        // setNewMedia(media)

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
        setNewData(rowCal.newvalue)
        // console.log('data', rowCal.newvalue)

    }
    // ***********************  Handle Preview END ****************************//

    // ***********************  Calculate After click Preview START ***************************//



    const NoQTY = inputFieldQTY.map(Number);
    function createCalculate(sumQTY, NoBO, NoSurface, newvalue = []) {
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
                newvalue.push(data[i])

                const newD = data[i]
                newD.SW = swfw[0];
                newD.FW = swfw[1];

                newD.WO = data[i].BUILDGROUP + data[i].HGA_BO.slice(2) + data[i].PARM_HGA_TAB[0]
                newD.TMWI_ET = data[i].BUILDGROUP + data[i].HGA_BO.slice(2)
                newD.MEDIA_LOT = testON;
            }
        }
        return { sumQTY, NoBO, NoSurface, newvalue };
    }

    // ***********************  Calculate After click Preview END ****************************//


        // ***********************  Export ExcelFile  START ****************************//

        const borders = {
            top: { style: "thin", color: { rgb: '001400' } },
            bottom: { style: "thin", color: { rgb: '001400' } },
            left: { style: "thin", color: { rgb: '001400' } },
            right: { style: "thin", color: { rgb: '001400' } }
        }
        const fonttitle = {
            name: 'Arial',
            sz: '11',
            bold: true,
            color: { rgb: 'ffffff' }
        }
        const filltitle = {
            fgColor: { rgb: '00cc00' }
        }
    
        const fontvalue = {
            name: 'Arial',
            sz: '11',
        }
        const fillvalue = {
            fgColor: { rgb: 'ebffeb' }
        }
    
        const aligncenter = {
            horizontal: "center"
        }
        const multiDataSet = [
            {
                columns: [
                    { title: "No", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "Wafer", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "AAB  Design ", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "Group", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "L-Slider from SDET BO", width: { wpx: 150 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    
                    { title: "SDET sort", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "HGA BO", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "HGA loading Q'ty", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "HGA WO file", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    
                    { title: "TAB", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "TMWI", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "Build Num", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
    
                    { title: "ET TSR ", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "Media LOT", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "Flamework", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                    { title: "WITE Revision", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
    
                ],
                data: newData.map((data, index) => [
                    { value: index + 1, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.THREE_DIGIT_WAFER_CODE, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.AIRBEARINGDESIGN, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: 'Group ?', style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
    
                    { value: data.SDET_BN, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.SORT, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.HGA_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.HGA_QTY, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
    
                    { value: data.WOF, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.PARM_HGA_TAB, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.TMWI_ET, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.HGA_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
    
                    { value: data.HGA_ET_TSR, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.MEDIA_LOT, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.FW, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                    { value: data.SW, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
    
                    
    
                ])
            }
        ];
    
        // ***********************  Export ExcelFile  END ****************************//

    const host = `${window.location.protocol}//${window.location.hostname}:3001`
    return (
        <div className="main-content">
            <p>Flow AMA-HGA</p>
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

            <TableContainer className="detail-card m-t-3" component={Paper} style={{ width: '400px' }}>
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
                            <TableCell>Up</TableCell>

                            <TableCell><input type="text" className="i-s-5" value={hgaU} onChange={(e) => {
                                sethgaU(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={tgaU} onChange={(e) => {
                                settgaU(e.target.value)
                            }} /></TableCell>

                        </TableRow>
                        <TableRow align="center">
                            <TableCell>Dn</TableCell>

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
                            <TableRow>
                                {rowHeader.map((row, index) => (
                                    <TableCell key={index} align="right" className="table-h-text">
                                        {Parser(row.nameHeader)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((val, index) => {

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
                                        <TableCell align="center">{val.BUILDGROUP}{val.HGA_BO.slice(2)}{val.PARM_HGA_TAB[0]}-
                                            <input className="input-size" type="number" value={inputFieldWOF[index]} onChange={event => {
                                                handleInputWOF(
                                                    index,
                                                    event
                                                );

                                            }} />
                                            .wo
                                        </TableCell>
                                        {/* <TableCell align="right">{newMedia}</TableCell> */}
                                        <TableCell align="right">{val.PARM_HGA_TAB}</TableCell>
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
                            <p>HGA QTY : </p>
                            <p>
                                <input className="input-size" type="number" onChange={event => {
                                    handleInputAllQTY(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitQTY}>submit</p>
                        </div>
                        <div className="grid-qty-content">
                            <p>Rev .WO : </p>
                            <p>
                                <input className="input-size" type="number" onChange={event => {
                                    handleInputAllWOF(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitWOF}>submit</p>
                        </div>
                        <div className="grid-qty-content">
                            <p>SDET Sort : </p>
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
                            <p>surface :
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

                            <p>Media Lot :
                                <input type="text" value={testON} onChange={(event) => {
                                    setTestON(event.target.value);
                                }} />
                            </p>

                            {/* <p> Media ที่ใช้ เราจะใช้ Media <input type="number" value={media} onChange={(event) => {
                                setMedia(event.target.value);
                            }} /> จำนวน <b>{newProduct.length !== 0 ? (newProduct[4].result !== 0 ? newProduct[4].result : 'X') : 'X'}</b> surfaces เพื่อ test งาน <b>{data.length} BO.</b>  นี้
                            </p> */}

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


                    {/* export Excel */}

                    <div className="export m-t-3">
                        <ExcelFile filename="Automated Buildflow" element={<p className="submit-preview"  >Export Excel</p>}>
                            <ExcelSheet dataSet={multiDataSet} name="AMA HGA" />
                        </ExcelFile>
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