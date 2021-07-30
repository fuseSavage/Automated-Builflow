import { TableContainer, Table, TableCell, TableHead, TableRow, Paper, TableBody, Grid, Divider } from '@material-ui/core'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import Axios from 'axios';

function createTableHeader(nameHeader) {
    return { nameHeader }
}

const rowHeader = [
    createTableHeader('No.'),
    createTableHeader('BIN'),
    createTableHeader('PERFIX'),
    createTableHeader('PRIORITY '),
    createTableHeader('TAB'),
    createTableHeader('SBR '),
    createTableHeader('AAB&nbsp;Design'),
    createTableHeader(`QTY`),
    createTableHeader('SEQ#/Old&nbsp;BO'),
    createTableHeader('W/O'),
    createTableHeader('Work&nbsp;Order&nbsp;File'),
    createTableHeader('TMWI&nbsp;ET'),
    createTableHeader('Build&nbsp;Num&nbsp;ET'),
    createTableHeader('SAAM&nbsp;TSR'),
    createTableHeader('Cl&nbsp;tsr&nbsp;pn&nbsp;i&nbsp;electric'),
    createTableHeader('Media'),
    createTableHeader('Tester# '),
    createTableHeader('ET&nbsp;S/W'),
    createTableHeader('ET&nbsp;F/W'),
    createTableHeader('THREE&nbsp;DIGIT&nbsp;WAF&nbsp;CODE'),
    createTableHeader('WAFER&nbsp;INFO'),
];

function binDetail(title, detail) {
    return { title, detail }
}

function product(title, result) {
    return { title, result }
}

function TableHGAshipment(title) {
    return { title }
}

export default function RDH_RO(props) {

    const data = useLocation().state.data;
    const { swfwList, imageName } = props
    const [textEditer, setTextEditer] = useState('');


    const rowBinDetail = [
        binDetail('TAB', data[0].PARM_HGA_TAB),
        binDetail('HGA P/N', data[0].HGA_PART_NUM),
        binDetail('FSA P/N', data[0].HGA_SUSPENSION_PN),
        binDetail('Slider P/N', data[0].PARTNUM),
        binDetail('BLD_INTENT_TYPE', data[0].BLD_INTENT_TYPE)
    ]

    const rowHGAshipment = [
        TableHGAshipment('BO'),
        TableHGAshipment('S1'),
        TableHGAshipment('S2'),
        TableHGAshipment('S3'),
        TableHGAshipment('S4'),
        TableHGAshipment('S5'),
        TableHGAshipment('S6'),
        TableHGAshipment('S7'),
        TableHGAshipment('S8'),
    ]


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
    // ************************ input QTY && WOF END ************************ //



    // *********************** div Preview-grid START ****************************//
    const [type, setTYPE] = useState("PRIME BUILD");
    const handleSelectType = (e) => {
        setTYPE(e.target.value)
    }

    const [persurface, setPersurface] = useState(500)

    const [swfw, setSWFW] = useState(["4.51B213", "SHF 1.6.1.246"])
    const [newswfw, setNewSWFW] = useState('')
    const handleSelectSWFW = (e) => {
        setSWFW((e.target.value).split("/"))
        setNewSWFW(e.target.value)
    }

    const [testON, setTestON] = useState('')

    const [media, setMedia] = useState()

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

    console.log(dataImage)

    // *********************** div Preview-grid END ****************************//


    // ***********************  Handle Preview START ****************************//
    const [newTestOn, setNewTestOn] = useState('')
    const [newMedia, setNewMedia] = useState('')
    const [newSW, setNewSW] = useState('')
    const [newFW, setNewFW] = useState('')

    const [newProduct, setNewProduct] = useState([])
    const [newData, setNewData] = useState([])

    function handlePreview() {
        setNewTestOn(testON)
        setNewMedia(media)
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
        setNewData(rowCal.newData)
    }
    // ***********************  Handle Preview END ****************************//

    // console.log('newProduct', newData)
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
            <p>Flow RDH-RO</p>
            <TableContainer className="detail-card" component={Paper} style={{ width: '280px' }}>
                <Table size="small" aria-label="customized table">
                    <TableBody>
                        {rowBinDetail.map((val, index) => (
                            <TableRow hover key={index} >
                                <TableCell align="right" className="detail-card" style={{ color: 'aliceblue' }}>
                                    {val.title}
                                </TableCell>
                                <TableCell >
                                    {val.detail}
                                </TableCell>
                            </TableRow>
                        ))}

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
                                        <p>{Parser(row.nameHeader)}</p>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((val, index) => (
                                <TableRow key={index} hover>
                                    <TableCell align="right">{index + 1}</TableCell>
                                    <TableCell align="right">{val.EXP_ID}</TableCell>
                                    <TableCell align="right">{val.BUILDGROUP}</TableCell>
                                    <TableCell align="right">{val.SLC_PRIORITY}</TableCell>
                                    <TableCell align="right">{val.PARM_HGA_TAB}</TableCell>
                                    <TableCell align="right">{val.HGA_BO}</TableCell>
                                    <TableCell align="right">{val.AIRBEARINGDESIGN}</TableCell>
                                    <TableCell align="right">
                                        <input className="input-size" type="number" value={inputFieldQTY[index]} onChange={event => {
                                            handleInputQTY(
                                                index,
                                                event
                                            );

                                        }} />
                                    </TableCell>
                                    <TableCell align="right">{val.SLD_BO}</TableCell>
                                    <TableCell align="right">{val.BUILDGROUP}{val.HGA_BO.slice(2)}{val.PARM_HGA_TAB[0]}</TableCell>
                                    <TableCell align="right">{val.BUILDGROUP}{val.HGA_BO.slice(2)}{val.PARM_HGA_TAB[0]}-
                                        <input className="input-size" type="number" value={inputFieldWOF[index]} onChange={event => {
                                            handleInputWOF(
                                                index,
                                                event
                                            );

                                        }} />
                                        .wo
                                    </TableCell>
                                    <TableCell align="right">{val.BUILDGROUP}{val.HGA_BO.slice(2)}</TableCell>
                                    <TableCell align="right">{val.HGA_BO}</TableCell>
                                    <TableCell align="right">{val.TSR_PN_G_SAAM}</TableCell>
                                    <TableCell align="right">{val.CL_TSR_PN_I_ELECTRIC1}</TableCell>
                                    <TableCell align="right">{newMedia}</TableCell>
                                    <TableCell align="right">{newTestOn}</TableCell>
                                    <TableCell align="right">{newSW}</TableCell>
                                    <TableCell align="right">{newFW}</TableCell>
                                    <TableCell align="right">{val.THREE_DIGIT_WAFER_CODE}</TableCell>
                                    <TableCell align="right">-</TableCell>
                                </TableRow>
                            ))}
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
            </div>

            <div className="content-preview">
                <Grid component={Paper}>
                    <div className="grid-content">
                        <p>BUILD TYPE :
                            <select value={type} onChange={handleSelectType} >
                                <option value="PRIME BUILD">PRIME BUILD</option>
                                <option value="WSAT">WSAT</option>
                                <option value="DVT Retest">DVT Retest</option>
                            </select>
                        </p>

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

                        <Divider />

                        <p>1) Build flow สำหรับ Test งาน <b>{data.length} BOs</b> กลุ่ม <b> RO-02359 </b> จะ ทำการ Test บน เครื่อง
                            <input type="text" value={testON} onChange={(event) => {
                                setTestON(event.target.value);
                            }} />
                        </p>
                        <p>- ลำดับการ test ในแต่ละ Surf.
                            <p className="m-l-5" ><b>* Surf. ที่เป็นเลขคี่ให้เริ่ม test จาก Tab DN ให้หมดก่อน (Surf. 1, 3, 5, ... )</b></p>
                            <p className="m-l-5" ><b>* Surf. ที่เป็นเลขคู่ให้เริ่ม test จาก Tab UP ให้หมดก่อน (Surf. 2, 4, 6, ....)</b></p>
                        </p>

                        <p>2) Media ที่ใช้ เราจะใช้ Media <input type="number" value={media} onChange={(event) => {
                            setMedia(event.target.value);
                        }} /> จำนวน <b>{newProduct.length !== 0 ? (newProduct[4].result !== 0 ? newProduct[4].result : 'X') : 'X'}</b> surfaces เพื่อ test งาน {data.length} BO. นี้
                        </p>

                        {/* จำนวน <b>{newProduct.length !== 0  ? newProduct[3].result :  'X' }</b> surfaces เพื่อ test งาน {data.length} BO. นี้ */}

                        <p>3) โปรดใช้ความระมัดระวัง ในการ Load media ให้เป็นไปตามลำดับในการ test ให้ดู ตารางข้อมูล ประกอบ</p>
                        <p>4) กรณีเกิด media scratch</p>
                        <p className="m-l-1"> - ถ้า test งานได้ {'< 80%'} ของ surf.ใดๆ แล้วเกิด media scratch ให้เปลี่ยน media แล้ว retest ทั้ง surf.</p>
                        <p className="m-l-1"> - ถ้า test งานได้ {'>='} 80% ของ surf. ใดๆ แล้วเกิด media scratch ไม่ต้อง retest ทั้ง surf. ให้เปลี่ยน media แล้ว test งานที่เหลืออีก 20% และใช้ media นี้ test งาน surf. ต่อไปได้เลย</p>
                        <p className="m-l-1"> - ถ้า เป็น BIN WSAT กรณีเกิด media scratch ไม่ต้อง retest ให้เปลี่ยน media แล้ว test งานต่อได้เลย</p>
                        <p className="m-l-1"> - wDVT Retest BIN ไม่ต้อง retest ให้เปลี่ยน media surface แล้ว test ต่อไปได้เลย</p>
                        <p className="m-l-1"><b> ปล. 80% ของ surf. สามารถดูได้จากตัวเลขจำนวน tray ที่ row {'>'} Minimum BOLA tray require / surface</b></p>
                        <p className="m-l-1"> 5) หลังจาก test เสร็จ ค่อย ทำการ Sort งานในแต่ล่ะ BOs และ complete แต่ละ BOs ที่ Label print <b>(Completed HOLD)</b></p>

                        <p className="submit-preview" onClick={handlePreview}>Preview</p>
                    </div>
                </Grid>
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

                    <div className="m-t-3">
                        <p>HGA shipment detail</p>
                        <TableContainer className="main-table" component={Paper} style={{ width: '1000px' }}>
                            <Table size="small" aria-label="customized table">
                                <TableHead className="table-h">
                                    <TableRow>
                                        {rowHGAshipment.map((val, index) => (
                                            <TableCell key={index} align="left" className="table-h-text"><p>{val.title}</p></TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {newData.map((val, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell align="left">{val.HGA_BO}</TableCell>
                                            <TableCell align="left"><input className="input-size" type="number" /></TableCell>
                                            <TableCell align="left"><input className="input-size" type="number" /></TableCell>
                                            <TableCell align="left"><input className="input-size" type="number" /></TableCell>
                                            <TableCell align="left"><input className="input-size" type="number" /></TableCell>
                                            <TableCell align="left"><input className="input-size" type="number" /></TableCell>
                                            <TableCell align="left"><input className="input-size" type="number" /></TableCell>
                                            <TableCell align="left"><input className="input-size" type="number" /></TableCell>
                                            <TableCell align="left"><input className="input-size" type="number" /></TableCell>
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