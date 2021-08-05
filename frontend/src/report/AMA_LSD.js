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
    createTableHeader('LDU&nbsp;Lot&nbsp;ID'),
    createTableHeader('BO&nbsp;SLIDER'),
    createTableHeader('Slider&nbsp;Lot&nbsp;ID'),
    createTableHeader('L&nbsp;-&nbsp;Slider&nbsp;BO'),
    createTableHeader('TAB'),
    createTableHeader('L&nbsp;-&nbsp;Slider&nbsp;WO'),
    createTableHeader('SDET&nbsp;SBR'),
    createTableHeader(`L&nbsp;-&nbsp;slider&nbsp;Good Q'ty&nbsp;for&nbsp;SDET`),
    createTableHeader(`L&nbsp;-&nbsp;slider&nbsp;Q'ty&nbsp;for Shear&nbsp;and&nbsp;%Wetting`),
    createTableHeader(`L&nbsp;-&nbsp;slider&nbsp;Q'ty for&nbsp;Lab`),
];

function binDetail(title) {
    return { title }
}
const rowBinDetail = [
    binDetail('TAB'),
    binDetail('Slider&nbsp;P/N'),
    binDetail('LDU&nbsp;P/N'),
    binDetail('L-Slider&nbsp;P/N'),

]

function product(title, result) {
    return { title, result }
}

export default function AMA_LSD(props) {

    const data = useLocation().state.data;
    const { swfwList, imageName } = props
    const [textEditer, setTextEditer] = useState('');
    const [expID, setExpID] = useState(data[0].EXP_ID)

    console.log(data)

    //************************ set Bin Detail  START ************************//
    const [productfamily, setProductfanily] = useState()
    const [sliderD, setsliderD] = useState()
    const [sliderU, setsliderU] = useState()
    const [LsliderD, setLsliderD] = useState()
    const [LsliderU, setLsliderU] = useState()
    const [pnD, setPnD] = useState()
    const [pnU, setPnU] = useState()

    useEffect(() => {
        async function fetchData() {
            data.forEach(e => {
                if (e.L_SLD_TAB === 'Down-00') {
                    setsliderD(e.PARTNUM)
                    setLsliderD(e.L_SLD_PART_NUM)
                    setPnD(e.SDET_SETS_PARTNUM)
                }
                if (e.L_SLD_TAB === 'Up-01') {
                    setsliderU(e.PARTNUM)
                    setLsliderU(e.L_SLD_PART_NUM)
                    setPnU(e.SDET_SETS_PARTNUM)
                }
                setinputFieldQTY(arr => [...arr, e.SDET_QTY])
                setinputFieldAAB((arr => [...arr, e.AIRBEARINGDESIGN.slice(0, 3) + '.' + e.AIRBEARINGDESIGN.slice(3, 5) + ' ' + e.AIRBEARINGDESIGN.slice(5)]))
                setinputFieldWafer(arr => [...arr, e.THREE_DIGIT_WAFER_CODE])
                setinputFieldSLD_BO(arr => [...arr, e.SLD_BO])
                setExpID(e.EXP_ID)
                setProductfanily(e.PRODUCTFAMILY)
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

    const [inputFieldLDU_LotID, setinputFieldLDU_LotID] = useState([])
    const handleInputLDU_LotID = (index, event) => {
        const values = [...inputFieldLDU_LotID];
        values[index] = event.target.value;
        setinputFieldLDU_LotID(values);
    };

    const [inputFieldSLD_BO, setinputFieldSLD_BO] = useState([])
    const handleInputSLD_BO = (index, event) => {
        const values = [...inputFieldSLD_BO];
        values[index] = event.target.value;
        setinputFieldSLD_BO(values);
    };

    const [inputFieldSlider_LotID, setinputFieldSlider_LotID] = useState([])
    const handleInputSlider_LotID = (index, event) => {
        const values = [...inputFieldSlider_LotID];
        values[index] = event.target.value;
        setinputFieldSlider_LotID(values);
    };
    //************************ input input QTY && WOF END ************************//


    // *********************** div Preview-grid START ****************************//
    const [persurface, setPersurface] = useState(500)
    const [swfw, setSWFW] = useState(["4.51B213", "SHF 1.6.1.246"])
    const [newswfw, setNewSWFW] = useState('')

    const [media, setMedia] = useState()
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
    const [newMedia, setNewMedia] = useState('')

    const [newProduct, setNewProduct] = useState([])

    function handlePreview() {
        setNewSW(swfw[0])
        setNewFW(swfw[1])
        setNewTestOn(testON)
        setNewMedia(media)

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
            <p>Flow AMA L-Slider</p>
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

            <TableContainer className="detail-card m-t-3" component={Paper} style={{ width: '550px' }}>
                <Table size="small" aria-label="customized table">
                    <TableHead>
                        <TableRow >
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

                            <TableCell><input type="text" className="i-s-5" value={pnU} onChange={(e) => {
                                setPnU(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={LsliderU} onChange={(e) => {
                                setLsliderU(e.target.value)
                            }} /></TableCell>

                        </TableRow>
                        <TableRow align="center">
                            <TableCell>Dn</TableCell>
                            <TableCell><input type="text" className="i-s-5" value={sliderD} onChange={(e) => {
                                setsliderD(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={pnD} onChange={(e) => {
                                setPnD(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={LsliderD} onChange={(e) => {
                                setLsliderD(e.target.value)
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
                            <TableRow >
                                {rowHeader.map((row, index) => (
                                    <TableCell key={index} align="center" className="table-h-text">
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
                                        <TableCell align="right">
                                            <input className="i-s-5" type="text" value={inputFieldLDU_LotID[index]} onChange={event => {
                                                handleInputLDU_LotID(
                                                    index,
                                                    event
                                                );

                                            }} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input className="i-s-5" type="text" value={inputFieldSLD_BO[index]} onChange={event => {
                                                handleInputSLD_BO(
                                                    index,
                                                    event
                                                );

                                            }} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input className="i-s-5" type="text" value={inputFieldSlider_LotID[index]} onChange={event => {
                                                handleInputSlider_LotID(
                                                    index,
                                                    event
                                                );
                                            }} />
                                        </TableCell>
                                        <TableCell align="right">{val.L_SLD_BO}</TableCell>
                                        <TableCell align="center">{tab}</TableCell>
                                        <TableCell align="center">{val.L_SLD_BUILD_GROUP.slice(0,2)}{val.L_SLD_BO.slice(2)}{tab[0]}-
                                            <input className="input-size" type="number" value={inputFieldWOF[index]} onChange={event => {
                                                handleInputWOF(
                                                    index,
                                                    event
                                                );

                                            }} />
                                            .wo
                                        </TableCell>
                                        <TableCell align="right">{val.L_SLD_BO}</TableCell>
                                        <TableCell align="right">{tab}</TableCell>
                                        <TableCell align="right">{val.SDET_BUILDGROUP}{val.SDET_BN.slice(2)}</TableCell>
                                        <TableCell align="right">{val.SDET_BN}</TableCell>
                                        <TableCell align="right">
                                            <input className="input-size" type="number" value={inputFieldQTY[index]} onChange={event => {
                                                handleInputQTY(
                                                    index,
                                                    event
                                                );
                                            }} />
                                        </TableCell>
                                        <TableCell align="right">{newTestOn}{newMedia}</TableCell>
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

                            <p>1) Build flow สำหรับ Test งาน <b>{data.length} BOs</b> กลุ่ม <b> {expID} </b> จะ ทำการ Test บน เครื่อง
                                <input type="text" value={testON} onChange={(event) => {
                                    setTestON(event.target.value);
                                }} />
                            </p>

                            <p> Media ที่ใช้ เราจะใช้ Media <input type="number" value={media} onChange={(event) => {
                                setMedia(event.target.value);
                            }} /> จำนวน <b>{newProduct.length !== 0 ? (newProduct[4].result !== 0 ? newProduct[4].result : 'X') : 'X'}</b> surfaces เพื่อ test งาน <b>{data.length} BO.</b>  นี้
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