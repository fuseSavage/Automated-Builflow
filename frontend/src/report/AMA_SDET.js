import { TableContainer, Table, TableCell, TableHead, TableRow, Paper, TableBody, Grid, Tooltip } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
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
    createTableHeader('BO&nbsp;SLIDER'),
    createTableHeader('L&nbsp;-&nbsp;Slider&nbsp;BO'),
    createTableHeader('SDET&nbsp;SBR'),
    createTableHeader('SDET&nbsp;WO&nbsp;file'),
    createTableHeader(`SDET&nbsp;loading&nbsp;Q'ty`),
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
    binDetail('Slider&nbsp;P/N'),
    binDetail('L-Slider&nbsp;P/N'),
    binDetail('SET&nbsp;P/N'),
    binDetail('ALULLM&nbsp;-&nbsp;L'),
    binDetail('LSA'),
    binDetail('ALULLM&nbsp;-&nbsp;UL'),
    binDetail('WO&nbsp;Buy-off'),

]

function product(title, result) {
    return { title, result }
}





export default function AMA_SDET(props) {

    const data = useLocation().state.data;
    const { name } = props;
    const [textEditer, setTextEditer] = useState('');
    const [expID, setExpID] = useState(data[0].EXP_ID)

    // console.log(data)

    //************************ set Bin Detail  START ************************//
    const [productfamily, setProductfanily] = useState()
    const [sliderD, setsliderD] = useState()
    const [sliderU, setsliderU] = useState()
    const [LsliderD, setLsliderD] = useState()
    const [LsliderU, setLsliderU] = useState()
    const [pnD, setPnD] = useState()
    const [pnU, setPnU] = useState()

    const [L_U, setL_U] = useState("ALGMP0AU")
    const [L_D, setL_D] = useState("ALGMP0AD")
    const [UL_U, setUL_U] = useState("AUGMP0AU")
    const [UL_D, setUL_D] = useState("AUGMP0AD")
    const [LSA_U, setLSA_U] = useState("LLSFSMBU")
    const [LSA_D, setLSA_D] = useState("LLSFSMBD")
    const [buyoff_U, setbuyoff_U] = useState("SFRSFBFU-0.wo")
    const [buyoff_D, setbuyoff_D] = useState("SFRSFBFD-0.wo")
    useEffect(() => {
        async function fetchData() {
            data.forEach(e => {
                if (e.SDET_TAB === '0' || e.SDET_TAB === '00') {
                    e.SDET_TAB = 'Dn'
                }
                if (e.SDET_TAB === '1' || e.SDET_TAB === '01') {
                    e.SDET_TAB = 'Up'
                }
                if (e.SDET_TAB === 'Dn') {
                    setsliderD(e.PARTNUM)
                    setLsliderD(e.L_SLD_PART_NUM)
                    setPnD(e.SDET_SETS_PARTNUM)
                }
                if (e.SDET_TAB === 'Up') {
                    setsliderU(e.PARTNUM)
                    setLsliderU(e.L_SLD_PART_NUM)
                    setPnU(e.SDET_SETS_PARTNUM)
                }
                setinputFieldQTY(arr => [...arr, e.SDET_QTY])
                setinputFieldAAB((arr => [...arr, e.AIRBEARINGDESIGN.slice(0, 3) + '.' + e.AIRBEARINGDESIGN.slice(3, 5) + ' ' + e.AIRBEARINGDESIGN.slice(5)]))
                setinputFieldWafer(arr => [...arr, e.THREE_DIGIT_WAFER_CODE])
                setExpID(e.EXP_ID)
                setProductfanily(e.PRODUCTFAMILY)
            });
        }
        fetchData();
    }, [data])



    const [selectfile, setSelectFile] = useState([])
    const [imagesName, setImagesName] = useState([])

    const handleselectImg = (e) => {
        setSelectFile(e.target.files)
    }

    const handleUpload = () => {
        if (selectfile != null) {
            let formData = new FormData();
            for (const key of Object.keys(selectfile)) {
                formData.append('imagesArray', selectfile[key])
            }

            fetch(`http://localhost:3001/uploadimg`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'multipart/form-data',
                },
                credentials: 'include',
            })
                .then(async (res) => {
                    const data = await res.json()
                    setImagesName(data)
                })
                .catch(error => {
                    throw error;
                })
        } else {
            alert('Please select image ')
        }
    }
    //************************ ser Bin Detail  END ************************//



    //************************ input input QTY && WOF START ************************//
    const [inputFieldQTY, setinputFieldQTY] = useState([])
    const handleInputQTY = (index, event) => {
        const values = [...inputFieldQTY];
        values[index] = event.target.value;
        data[index].SDET_QTY = event.target.value;
        setinputFieldQTY(values);
    };

    const [inputFieldWOF, setinputFieldWOF] = useState([])
    const handleInputWOF = (index, event) => {
        const values = [...inputFieldWOF];
        values[index] = event.target.value;
        data[index].WOF = 'S' + data[index].SDET_BUILDGROUP + data[index].SDET_BN.slice(2) + data[index].SDET_TAB[0] + '-' + event.target.value + '.wo';
        setinputFieldWOF(values);
    };

    const [allQTY, setAllQTY] = useState([])
    const handleInputAllQTY = (event) => {
        const values = [...allQTY];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            data[i].SDET_QTY = event.target.value;
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
            data[i].WOF = 'S' + data[i].SDET_BUILDGROUP + data[i].SDET_BN.slice(2) + data[i].SDET_TAB[0] + '-' + event.target.value + '.wo';
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
    //************************ input input QTY && WOF END ************************//


    // *********************** div Preview-grid START ****************************//
    const [persurface, setPersurface] = useState(500)
    const [testON, setTestON] = useState('')

    const [sw, setSW] = useState('')
    const [fw, setFW] = useState('')




    // *********************** div Preview-grid END ****************************//

    // ***********************  Handle Preview START ****************************//
    const [newSW, setNewSW] = useState('')
    const [newFW, setNewFW] = useState('')
    const [newTestOn, setNewTestOn] = useState('')

    const [newProduct, setNewProduct] = useState([])
    const [newData, setNewData] = useState([])

    function handlePreview() {
        setNewSW(sw)
        setNewFW(fw)
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
            if (inputFieldQTY[i] !== "" && inputFieldQTY[i] != null && inputFieldQTY[i] !== "0" && inputFieldQTY[i] > 0) {
                newvalue.push(data[i])

                const newD = data[i]
                newD.SW = sw;
                newD.FW = fw;

                newD.WO = 'S' + data[i].SDET_BUILDGROUP + data[i].SDET_BN.slice(2) + data[i].SDET_TAB[0]
                newD.TMWI_ET = 'S' + data[i].SDET_BUILDGROUP + data[i].SDET_BN.slice(2)
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
                { title: "Group", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "BO SLIDER", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },

                { title: "L-Slider BO", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "SDET SBR", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "SDET WO file", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "SDET loading Q'ty", width: { wpx: 150 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "TAB", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },

                { title: "TMWI", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Build Num ", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "ET TSR", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Media LOT", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Flamework", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "WITE Revision", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },

            ],
            data: newData.map((data, index) => [
                { value: index + 1, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.THREE_DIGIT_WAFER_CODE, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.AIRBEARINGDESIGN, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: 'Group ?', style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SLD_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },

                { value: data.L_SLD_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SDET_BN, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.WOF, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SDET_QTY, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SDET_TAB, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },

                { value: data.TMWI_ET, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SDET_BN, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SDET_ET_TSR, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
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
            <p>Flow AMA-SDET</p>
            <p className="m-t-3">Create by <b> GID : {name}</b></p>
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

            <TableContainer className="detail-card m-t-3" component={Paper} >
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
                            <TableCell><input type="text" className="i-s-5" value={sliderU} onChange={(e) => {
                                setsliderU(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={LsliderU} onChange={(e) => {
                                setLsliderU(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={pnU} onChange={(e) => {
                                setPnU(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={L_U} onChange={(e) => {
                                setL_U(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={LSA_U} onChange={(e) => {
                                setLSA_U(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={UL_U} onChange={(e) => {
                                setUL_U(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={buyoff_U} onChange={(e) => {
                                setbuyoff_U(e.target.value)
                            }} /></TableCell>
                        </TableRow>
                        <TableRow align="center">
                            <TableCell>Dn</TableCell>
                            <TableCell><input type="text" className="i-s-5" value={sliderD} onChange={(e) => {
                                setsliderD(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={LsliderD} onChange={(e) => {
                                setLsliderD(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={pnD} onChange={(e) => {
                                setPnD(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={L_D} onChange={(e) => {
                                setL_D(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={LSA_D} onChange={(e) => {
                                setLSA_D(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={UL_D} onChange={(e) => {
                                setUL_D(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={buyoff_D} onChange={(e) => {
                                setbuyoff_D(e.target.value)
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

                                let perfix = 'S' + val.SDET_BUILDGROUP

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
                                        <TableCell align="right">group?</TableCell>
                                        <TableCell align="right">{val.SLD_BO}</TableCell>
                                        <TableCell align="right">{val.L_SLD_BO}</TableCell>
                                        <TableCell align="right">{val.SDET_BN}</TableCell>
                                        <TableCell align="center">{perfix}{val.SDET_BN.slice(2)}{val.SDET_TAB[0]}-
                                            <input className="input-size" type="number" value={inputFieldWOF[index]} onChange={event => {
                                                handleInputWOF(
                                                    index,
                                                    event
                                                );

                                            }} />
                                            .wo
                                        </TableCell>
                                        <TableCell align="right">
                                            <input className="input-size" type="number" value={inputFieldQTY[index]} onChange={event => {
                                                handleInputQTY(
                                                    index,
                                                    event
                                                );
                                            }} />
                                        </TableCell>
                                        <TableCell align="right">{val.SDET_TAB}</TableCell>
                                        <TableCell align="right">{perfix}{val.SDET_BN.slice(2)}</TableCell>
                                        <TableCell align="right">{val.SDET_BN}</TableCell>
                                        <TableCell align="right">{val.SDET_ET_TSR}</TableCell>
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
                            <p>SDET QTY : </p>
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

                            <p>SW :
                                <input type="text" value={sw} required onChange={(event) => {
                                    setSW(event.target.value);
                                }} />
                            </p>
                            <p>FW :
                                <input type="text" value={fw} required onChange={(event) => {
                                    setFW(event.target.value);
                                }} />
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

                        <h3>Final Table</h3>

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
                                        <TableCell align="right">{val.THREE_DIGIT_WAFER_CODE}</TableCell>
                                        <TableCell align="right">{val.AIRBEARINGDESIGN}</TableCell>
                                        <TableCell align="right">group?</TableCell>
                                        <TableCell align="right">{val.SLD_BO}</TableCell>
                                        <TableCell align="right">{val.L_SLD_BO}</TableCell>
                                        <TableCell align="right">{val.SDET_BN}</TableCell>
                                        <TableCell align="center">{val.WOF}</TableCell>
                                        <TableCell align="right">{val.SDET_QTY}</TableCell>
                                        <TableCell align="right">{val.SDET_TAB}</TableCell>
                                        <TableCell align="right">{val.TMWI_ET}</TableCell>
                                        <TableCell align="right">{val.SDET_BN}</TableCell>
                                        <TableCell align="right">{val.SDET_ET_TSR}</TableCell>
                                        <TableCell align="right">{val.MEDIA_LOT}</TableCell>
                                        <TableCell align="right">{val.FW}</TableCell>
                                        <TableCell align="right">{val.SW}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>
                    </div>

                    {/* export Excel */}

                    <div className="export m-t-3">
                        <ExcelFile filename="Automated Buildflow" element={<p className="submit-preview"  >Export Excel</p>}>
                            <ExcelSheet dataSet={multiDataSet} name="AMA SDET" />
                        </ExcelFile>
                    </div>

                    <div className="m-t-5">
                        <Grid component={Paper}>
                            <div className="form-group">
                                <p>Select Image</p>
                                <input type="file" multiple onChange={(e) => handleselectImg(e)} />
                                <Tooltip title="upload">
                                    <p className="submit-preview" onClick={handleUpload}>Submit</p>
                                </Tooltip>
                            </div>
                        </Grid>
                        <div className="grid-images">
                            {imagesName.length !== 0 ? imagesName.map((val, index) => (

                                <img key={index} src={`${host}/showImages/${(encodeURIComponent(val.trim()))}`} alt="not images" />

                            )) : <p className="p-5-10">Please select images</p>}
                        </div>

                    </div>

                </div>
            ) : null}

        </div>

    )
}