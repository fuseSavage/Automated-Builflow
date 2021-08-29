import { TableContainer, Table, TableCell, TableHead, TableRow, Paper, TableBody, Grid, Divider, Tooltip } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import ReactExport from 'react-data-export';
import axios from 'axios';



const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;



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
    createTableHeader('WAF&nbsp;CODE'),
    createTableHeader('WAFER&nbsp;INFO'),
];

function binDetail(title, detail) {
    return { title, detail }
}

function product(title, result) {
    return { title, result }
}










export default function RDH_RO(props) {

    const data = useLocation().state.data;
    const { name } = props
    const [textEditer, setTextEditer] = useState('');
    const [expID, setExpID] = useState(data[0].EXP_ID)

    // console.log(gid)

    //************************ set partNum  START ************************//
    useEffect(() => {
        async function fetchData() {
            data.forEach((e, index) => {
                setinputFieldQTY(arr => [...arr, e.HGA_QTY])
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
    //************************ set partNum  END ************************//


    const rowBinDetail = [
        binDetail('TAB', data[0].PARM_HGA_TAB),
        binDetail('HGA P/N', data[0].HGA_PART_NUM),
        binDetail('FSA P/N', data[0].HGA_SUSPENSION_PN),
        binDetail('Slider P/N', data[0].PARTNUM),
        binDetail('BLD_INTENT_TYPE', data[0].BLD_INTENT_TYPE)
    ]


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
        const wof = data[index]
        values[index] = event.target.value;
        wof.WOF = wof.WOF = data[index].BUILDGROUP + data[index].HGA_BO.slice(2) + data[index].PARM_HGA_TAB[0] + '-' + event.target.value + '.wo';
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
            const wof = data[i]
            values[i] = event.target.value
            // data[i].BUILDGROUP + data[i].HGA_BO.slice(2) + data[i].PARM_HGA_TAB[0]
            wof.WOF = data[i].BUILDGROUP + data[i].HGA_BO.slice(2) + data[i].PARM_HGA_TAB[0] + '-' + event.target.value + '.wo';
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

    // const [swfw, setSWFW] = useState(["4.51B213", "SHF 1.6.1.246"])
    // const [newswfw, setNewSWFW] = useState('')
    // const handleSelectSWFW = (e) => {
    //     setSWFW((e.target.value).split("/"))
    //     setNewSWFW(e.target.value)
    // }

    const [sw, setSW] = useState('')
    const [fw, setFW] = useState('')


    const [testON, setTestON] = useState('')

    const [media, setMedia] = useState()


    // console.log(dataImage)

    // *********************** div Preview-grid END ****************************//


    // ***********************  Handle Preview START ****************************//
    const [newTestOn, setNewTestOn] = useState('')
    const [newMedia, setNewMedia] = useState('')
    const [newSW, setNewSW] = useState('')
    const [newFW, setNewFW] = useState('')

    const [newProduct, setNewProduct] = useState([])
    const [newData, setNewData] = useState([])
    // console.log('new', newData)

    function handlePreview() {
        setNewTestOn(testON)
        setNewMedia(media)
        setNewSW(sw)
        setNewFW(fw)

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

        // console.log(rowCal.newvalue)



    }
    // ***********************  Handle Preview END ****************************//



    // ***********************  Calculate After click Preview START ***************************//

    const NoQTY = inputFieldQTY.map(Number);
    function createCalculate(sumQTY, NoBO, NoSurface, newvalue = [],) {
        for (let i = 0; i < inputFieldQTY.length; i++) {
            if (NoQTY[i] > 0) {
                sumQTY = sumQTY + NoQTY[i]
                NoBO = NoBO + 1
            }
        }
        if (sumQTY !== 0) {
            NoSurface = Math.ceil(sumQTY / persurface);
        }
        for (let i = 0; i < data.length; i++) {
            if (inputFieldQTY[i] !== "" && inputFieldQTY[i] != null && inputFieldQTY[i] !== "0" && inputFieldQTY[i] > 0) {
                const newD = data[i]
                newvalue.push(data[i])
                // {val.BUILDGROUP}{val.HGA_BO.slice(2)}{val.PARM_HGA_TAB[0]}-
                newD.MEDIA = media;
                newD.SW = sw;
                newD.FW = fw;
                newD.TESTON = testON;

                newD.WO = data[i].BUILDGROUP + data[i].HGA_BO.slice(2) + data[i].PARM_HGA_TAB[0]
                newD.TMWI_ET = data[i].BUILDGROUP + data[i].HGA_BO.slice(2)
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
                { title: "BIN", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "PERPIX", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "PRIORITY", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "TAB", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "SBR", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "AAB Design", width: { wpx: 100 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "QTY", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "SEQ#/Old BO", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "W/O", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Work Order File", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "TMWI ET", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Build Num ET", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "SAAM TSR", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Cl tsr pn i electric", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Media", width: { wpx: 100 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Tester#", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "ET S/W", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "ET F/W", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "WAF CODE", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "WAFER INFO", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
            ],
            data: newData.map((data, index) => [
                { value: index + 1, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.EXP_ID, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.BUILDGROUP, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SLC_PRIORITY, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.PARM_HGA_TAB, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.HGA_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.AIRBEARINGDESIGN, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.HGA_QTY, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SLD_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.WO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.WOF, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.TMWI_ET, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.HGA_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.TSR_PN_G_SAAM, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.CL_TSR_PN_I_ELECTRIC1, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.MEDIA, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.TESTON, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SW, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.FW, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.THREE_DIGIT_WAFER_CODE, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: '-', style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
            ])
        }
    ];

    // ***********************  Export ExcelFile  END ****************************//

    const testSubmit = async () => {
        await axios.get(`http://localhost:3001/automail`, {
            params: {
                image: imagesName,
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                throw error;
            })
    }

    // const testAutomail = () => {
    //     const smtpjs = window.Email;
    //     smtpjs.send({
    //         Host : "mailhost.seagate.com",
    //         Username : "chaiwat.singkibut@seagate.com",
    //         Password : "Singkibut931897",
    //         To : 'chaiwat.singkibut@seagate.com',
    //         From : "you@isp.com",
    //         Subject : "This is the subject",
    //         Body : "And this is the body"
    //     }).then(
    //       message => alert(message)
    //     );
    // }

    const host = `${window.location.protocol}//${window.location.hostname}:3001`


    return (
        <div className="main-content">
            <p>Flow RDH-RO</p>
            <p className="m-t-3">Create by <b> GID : {name}</b></p>
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

            <TableContainer className="detail-card m-t-3" component={Paper} style={{ width: '280px' }}>
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

                <TableContainer className="main-table" component={Paper}  >
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
                                        <input className="input-size" type="text" value={inputFieldQTY[index]} onChange={event => {
                                            handleInputQTY(
                                                index,
                                                event
                                            );

                                        }} />
                                    </TableCell>
                                    <TableCell align="right">{val.SLD_BO}</TableCell>
                                    <TableCell align="right">{val.BUILDGROUP}{val.HGA_BO.slice(2)}{val.PARM_HGA_TAB[0]}</TableCell>
                                    <TableCell align="right">{val.BUILDGROUP}{val.HGA_BO.slice(2)}{val.PARM_HGA_TAB[0]}-
                                        <input className="input-size" type="text" value={inputFieldWOF[index]} onChange={event => {
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
                                <input className="input-size" type="text" required onChange={event => {
                                    handleInputAllQTY(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitQTY}>submit</p>
                        </div>
                        <div className="grid-qty-content">
                            <p>Set Work Order File : </p>
                            <p>
                                <input className="input-size" type="text" required onChange={event => {
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
                            <input type="text" value={persurface} required onChange={(event) => {
                                setPersurface(event.target.value);
                            }} />
                        </p>

                        {/* <p>SW/FW :
                            <select value={newswfw} onChange={handleSelectSWFW} >
                                {swfwList.map((val) => {
                                    return (
                                        <option key={val.id} value={val.swfw}>{val.swfw}</option>
                                    )
                                })}
                            </select>
                        </p> */}
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

                        <Divider />

                        <p>1) Build flow สำหรับ Test งาน <b>{data.length} BOs</b> กลุ่ม <b> {data[0].EXP_ID} </b> จะ ทำการ Test บน เครื่อง
                            <input type="text" value={testON} required onChange={(event) => {
                                setTestON(event.target.value);
                            }} />
                        </p>
                        <p>- ลำดับการ test ในแต่ละ Surf.
                            <p className="m-l-5" ><b>* Surf. ที่เป็นเลขคี่ให้เริ่ม test จาก Tab DN ให้หมดก่อน (Surf. 1, 3, 5, ... )</b></p>
                            <p className="m-l-5" ><b>* Surf. ที่เป็นเลขคู่ให้เริ่ม test จาก Tab UP ให้หมดก่อน (Surf. 2, 4, 6, ....)</b></p>
                        </p>

                        <p>2) Media ที่ใช้ เราจะใช้ Media <input type="text" value={media} required onChange={(event) => {
                            setMedia(event.target.value);
                        }} /> จำนวน <b>{newProduct.length !== 0 ? (newProduct[4].result !== 0 ? newProduct[4].result : 'X') : 'X'}</b> surfaces เพื่อ test งาน <b>{data.length} BO.</b>  นี้
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
                       
                       
                       <h3>Final Table</h3>
                        <TableContainer className="main-table" component={Paper}  >
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
                                    {newData.map((val, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell align="right">{index + 1}</TableCell>
                                            <TableCell align="right">{val.EXP_ID}</TableCell>
                                            <TableCell align="right">{val.BUILDGROUP}</TableCell>
                                            <TableCell align="right">{val.SLC_PRIORITY}</TableCell>
                                            <TableCell align="right">{val.PARM_HGA_TAB}</TableCell>
                                            <TableCell align="right">{val.HGA_BO}</TableCell>
                                            <TableCell align="right">{val.AIRBEARINGDESIGN}</TableCell>
                                            <TableCell align="right">{val.HGA_QTY}</TableCell>
                                            <TableCell align="right">{val.SLD_BO}</TableCell>
                                            <TableCell align="right">{val.WO}</TableCell>
                                            <TableCell align="right">{val.WOF}</TableCell>
                                            <TableCell align="right">{val.TMWI_ET}</TableCell>
                                            <TableCell align="right">{val.HGA_BO}</TableCell>
                                            <TableCell align="right">{val.TSR_PN_G_SAAM}</TableCell>
                                            <TableCell align="right">{val.CL_TSR_PN_I_ELECTRIC1}</TableCell>
                                            <TableCell align="right">{val.MEDIA}</TableCell>
                                            <TableCell align="right">{val.TESTON}</TableCell>
                                            <TableCell align="right">{val.SW}</TableCell>
                                            <TableCell align="right">{val.FW}</TableCell>
                                            <TableCell align="right">{val.THREE_DIGIT_WAFER_CODE}</TableCell>
                                            <TableCell align="right">-</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>

                        </TableContainer>

                    </div>

                    {/* export Excel */}

                    <div className="export m-t-3">
                        <ExcelFile filename="Automated Buildflow" element={<p className="submit-preview"  >Export Excel</p>}>
                            <ExcelSheet dataSet={multiDataSet} name="RDH RO" />
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
                    <p className="submit-preview" onClick={testSubmit}>Submit</p>


                    {/* <p className="submit-preview" onClick={testAutomail}></p> */}


                </div>

            ) : null}



        </div>
    )
}

