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
    createTableHeader('L&nbsp;-&nbsp;Slider&nbsp;from SDET&nbsp;BO'),
    createTableHeader('L&nbsp;-&nbsp;Slider&nbsp;BO'),
    createTableHeader('SDET&nbsp;sort'),
    createTableHeader('LDU&nbsp;Lot&nbsp;ID'),
    createTableHeader('HGA&nbsp;BO'),
    createTableHeader('Slider&nbsp;Lot&nbsp;ID'),
    createTableHeader(`HGA&nbsp;loading&nbsp;Q'ty`),
    createTableHeader('HGA&nbsp;WO&nbsp;file'),
    createTableHeader(`L&nbsp;-&nbsp;Slider&nbsp;WO`),
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
    binDetail('L&nbsp;-&nbsp;Slider&nbsp;P/N'),
    binDetail('HGA&nbsp;P/N'),
    binDetail('TGA&nbsp;P/N'),

]

function product(title, result) {
    return { title, result }
}









export default function AMA_LSD_HGA(props) {

    const data = useLocation().state.data;
    const { name } = props;
    const [textEditer, setTextEditer] = useState('');
    const [expID, setExpID] = useState(data[0].EXP_ID)

    // console.log(data)

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
                    e.L_SLD_TAB = 'Dn'
                }
                if (e.L_SLD_TAB === 'Up-01') {
                    e.L_SLD_TAB = 'Up'
                }
                if (e.L_SLD_TAB === 'Dn') {
                    setlsdPN_D(e.L_SLD_PART_NUM)
                    sethgaD(e.HGA_PART_NUM)
                    settgaD(e.HGA_SUSPENSION_PN)
                }
                if (e.L_SLD_TAB === 'Up') {
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
        data[index].HGA_QTY = event.target.value;
        setinputFieldQTY(values);
    };
    // {val.BUILDGROUP}{val.HGA_BO.slice(2)}{val.PARM_HGA_TAB[0]}-
    const [inputFieldWOF, setinputFieldWOF] = useState([])
    const handleInputWOF = (index, event) => {
        const values = [...inputFieldWOF];
        values[index] = event.target.value;
        data[index].WOF = data[index].BUILDGROUP + data[index].HGA_BO.slice(2) + data[index].PARM_HGA_TAB[0] + '-' + event.target.value + '.wo'
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
            data[i].WOF = data[i].BUILDGROUP + data[i].HGA_BO.slice(2) + data[i].PARM_HGA_TAB[0] + '-' + event.target.value + '.wo'
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

    const [inputFieldLDU_LotID, setinputFieldLDU_LotID] = useState([])
    const handleInputLDU_LotID = (index, event) => {
        const values = [...inputFieldLDU_LotID];
        values[index] = event.target.value;
        data[index].LDU_LOT = event.target.value;
        setinputFieldLDU_LotID(values);
    };


    const [inputFieldSlider_LotID, setinputFieldSlider_LotID] = useState([])
    const handleInputSlider_LotID = (index, event) => {
        const values = [...inputFieldSlider_LotID];
        values[index] = event.target.value;
        data[index].SLIDER_LOT = event.target.value;
        setinputFieldSlider_LotID(values);
    };

    const [inputFieldWOF_LSD, setinputFieldWOF_LSD] = useState([])
    const handleInputWOF_LSD = (index, event) => {
        const values = [...inputFieldWOF_LSD];
        values[index] = event.target.value;
        data[index].WOF_LSD = 'L' + data[index].L_SLD_BUILD_GROUP.slice(0, 2) + data[index].L_SLD_BO.slice(2) + data[index].L_SLD_TAB[0] + '-' + event.target.value + '.wo'
        setinputFieldWOF_LSD(values);
    };
    const [allWOF_LSD, setAllWOF_LSD] = useState([])
    const handleInputAllWOF_LSD = (event) => {
        const values = [...allWOF_LSD];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            data[i].WOF_LSD = 'L' + data[i].L_SLD_BUILD_GROUP.slice(0, 2) + data[i].L_SLD_BO.slice(2) + data[i].L_SLD_TAB[0] + '-' + event.target.value + '.wo'
            setAllWOF_LSD(values);
        }
    }
    const handleSubmitWOF_LSD = () => {
        setinputFieldWOF_LSD(allWOF_LSD)
    }


    //************************ input input QTY && WOF END ************************//


    // *********************** div Preview-grid START ****************************//
    const [persurface, setPersurface] = useState(500)
    const [sw, setSW] = useState('')
    const [fw, setFW] = useState('')

    const [testON, setTestON] = useState('')




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
                { title: "AAB Design ", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Group", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "L-Slider from SDET BO", width: { wpx: 150 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },

                { title: "L-Slider BO", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "SDET sort", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "LDU Lot ID", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "HGA BO", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Slider Lot ID", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },

                { title: "HGA loading Q'ty", width: { wpx: 150 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "HGA WO file", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "L-Slider WO", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "TAB", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "TMWI", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },

                { title: "Build Num", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
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
                { value: data.SDET_BN, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },

                { value: data.SLD_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SORT, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.LDU_LOT, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.HGA_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SLIDER_LOT, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },

                { value: data.HGA_QTY, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.WOF, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.WOF_LSD, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.L_SLD_TAB, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
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
            <p>Flow AMA L-Slider HGA</p>
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

                                let l_Slider_build = 'L' + val.L_SLD_BUILD_GROUP.slice(0, 2)
                                return (
                                    <TableRow key={index} hover>
                                        <TableCell align="right">
                                            <input className="i-s-5" type="text" value={inputFieldWafer[index]} onChange={event => {
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
                                        <TableCell align="right">{val.SLD_BO}</TableCell>
                                        <TableCell align="right">
                                            <input className="input-size" type="text" value={inputFieldSort[index]} onChange={event => {
                                                handleInputSort(
                                                    index,
                                                    event
                                                );
                                            }} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input className="i-s-5" type="text" value={inputFieldLDU_LotID[index]} onChange={event => {
                                                handleInputLDU_LotID(
                                                    index,
                                                    event
                                                );

                                            }} />
                                        </TableCell>
                                        <TableCell align="right">{val.HGA_BO}</TableCell>
                                        <TableCell align="right">
                                            <input className="i-s-5" type="text" value={inputFieldSlider_LotID[index]} onChange={event => {
                                                handleInputSlider_LotID(
                                                    index,
                                                    event
                                                );
                                            }} />
                                        </TableCell>

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
                                        <TableCell align="center">{l_Slider_build}{val.L_SLD_BO.slice(2)}{val.L_SLD_TAB[0]}-
                                            <input className="input-size" type="number" value={inputFieldWOF_LSD[index]} onChange={event => {
                                                handleInputWOF_LSD(
                                                    index,
                                                    event
                                                );

                                            }} />
                                            .wo
                                        </TableCell>
                                        <TableCell align="right">{val.L_SLD_TAB}</TableCell>
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
                            <p>Rev .WO L-Slider : </p>
                            <p>
                                <input className="input-size" type="number" onChange={event => {
                                    handleInputAllWOF_LSD(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitWOF_LSD}>submit</p>
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
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell align="right">{val.THREE_DIGIT_WAFER_CODE}</TableCell>
                                                <TableCell align="right">{val.AIRBEARINGDESIGN}</TableCell>
                                                <TableCell align="right">Group ?</TableCell>
                                                <TableCell align="right">{val.SDET_BN}</TableCell>
                                                <TableCell align="right">{val.SLD_BO}</TableCell>
                                                <TableCell align="right">{val.SORT}</TableCell>
                                                <TableCell align="right">{val.LDU_LOT}</TableCell>
                                                <TableCell align="right">{val.HGA_BO}</TableCell>
                                                <TableCell align="right">{val.SLIDER_LOT}</TableCell>

                                                <TableCell align="right">{val.HGA_QTY}</TableCell>
                                                <TableCell align="center">{val.WOF}</TableCell>
                                                <TableCell align="center">{val.WOF_LSD}</TableCell>
                                                <TableCell align="right">{val.L_SLD_TAB}</TableCell>
                                                <TableCell align="right">{val.TMWI_ET}</TableCell>
                                                <TableCell align="right">{val.HGA_BO}</TableCell>
                                                <TableCell align="right">{val.HGA_ET_TSR}</TableCell>
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
                            <ExcelSheet dataSet={multiDataSet} name="AMA L-Slider-HGA" />
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