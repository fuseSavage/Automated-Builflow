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
    createTableHeader('LDU&nbsp;Lot&nbsp;ID'),
    createTableHeader('BO&nbsp;SLIDER'),
    createTableHeader('Slider&nbsp;Lot&nbsp;ID'),
    createTableHeader('L&nbsp;-&nbsp;Slider&nbsp;BO'),
    createTableHeader('TAB'),
    createTableHeader('L&nbsp;-&nbsp;Slider&nbsp;WO'),
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
    binDetail('Machine&nbsp;Number'),
    binDetail('PD&nbsp;Ratio'),
    binDetail('Reflow&nbsp;Power'),

]






export default function AMA_LSD(props) {

    const data = useLocation().state.data;
    const { imageName } = props
    const [textEditer, setTextEditer] = useState('');
    const [expID, setExpID] = useState(data[0].EXP_ID)

    // console.log(data)

    //************************ set Bin Detail  START ************************//
    const [productfamily, setProductfanily] = useState()
    const [sliderD, setsliderD] = useState()
    const [sliderU, setsliderU] = useState()
    const [LsliderD, setLsliderD] = useState()
    const [LsliderU, setLsliderU] = useState()
    const [LDU_D, setLDU_D] = useState('739074601')
    const [LDU_U, setLDU_U] = useState('739074601')

    const [Machine_D, setMachine_D] = useState('HVLA04')
    const [Machine_U, setMachine_U] = useState('HVLA04')
    const [Ratio_D, setRatio_D] = useState(1)
    const [Ratio_U, setRatio_U] = useState(1)
    const [Reflow_D, setReflow_D] = useState('10W')
    const [Reflow_U, setReflow_U] = useState('10W')

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
                    setsliderD(e.PARTNUM)
                    setLsliderD(e.L_SLD_PART_NUM)
                }
                if (e.L_SLD_TAB === 'Up') {
                    setsliderU(e.PARTNUM)
                    setLsliderU(e.L_SLD_PART_NUM)
                }
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
    const [inputFieldQTY_good, setinputFieldQTY_good] = useState([])
    const handleInputQTY_good = (index, event) => {
        const values = [...inputFieldQTY_good];
        values[index] = event.target.value;
        data[index].QTY_GOOD = event.target.value;
        setinputFieldQTY_good(values);
    };
    
    const [inputFieldWOF, setinputFieldWOF] = useState([])
    const handleInputWOF = (index, event) => {
        const values = [...inputFieldWOF];
        values[index] = event.target.value;
        data[index].WOF = 'L' + data[index].L_SLD_BUILD_GROUP.slice(0, 2) + data[index].L_SLD_BO.slice(2) + data[index].L_SLD_TAB[0] + '-' + event.target.value + '.wo'
        setinputFieldWOF(values);
    };

    const [allQTY_good, setAllQTY_good] = useState([])
    const handleInputAllQTY_good = (event) => {
        const values = [...allQTY_good];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            data[i].QTY_GOOD = event.target.value;
            setAllQTY_good(values);
        }
    }
    const handleSubmitQTY_good = () => {
        setinputFieldQTY_good(allQTY_good)
    }

    const [allWOF, setAllWOF] = useState([])
    const handleInputAllWOF = (event) => {
        const values = [...allWOF];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            data[i].WOF = 'L' + data[i].L_SLD_BUILD_GROUP.slice(0, 2) + data[i].L_SLD_BO.slice(2) + data[i].L_SLD_TAB[0] + '-' + event.target.value + '.wo'
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

    const [inputFieldLDU_LotID, setinputFieldLDU_LotID] = useState([])
    const handleInputLDU_LotID = (index, event) => {
        const values = [...inputFieldLDU_LotID];
        values[index] = event.target.value;
        data[index].LDU_LOT = event.target.value;
        setinputFieldLDU_LotID(values);
    };

    const [inputFieldSLD_BO, setinputFieldSLD_BO] = useState([])
    const handleInputSLD_BO = (index, event) => {
        const values = [...inputFieldSLD_BO];
        values[index] = event.target.value;
        data[index].SLD_BO = event.target.value;
        setinputFieldSLD_BO(values);
    };

    const [inputFieldSlider_LotID, setinputFieldSlider_LotID] = useState([])
    const handleInputSlider_LotID = (index, event) => {
        const values = [...inputFieldSlider_LotID];
        values[index] = event.target.value;
        data[index].SLIDER_LOT = event.target.value;
        setinputFieldSlider_LotID(values);
    };

    const [inputFieldQTY_shear, setinputFieldQTY_shear] = useState([])
    const handleInputQTY_shear = (index, event) => {
        const values = [...inputFieldQTY_shear];
        values[index] = event.target.value;
        data[index].QTY_SHEAR = event.target.value;
        setinputFieldQTY_shear(values);
    };
    const [allQTY_shear, setAllQTY_shear] = useState([])
    const handleInputAllQTY_shear = (event) => {
        const values = [...allQTY_shear];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            data[i].QTY_SHEAR = event.target.value;
            setAllQTY_shear(values);
        }
    }
    const handleSubmitQTY_shear = () => {
        setinputFieldQTY_shear(allQTY_shear)
    }

    const [inputFieldQTY_lab, setinputFieldQTY_lab] = useState([])
    const handleInputQTY_lab = (index, event) => {
        const values = [...inputFieldQTY_lab];
        values[index] = event.target.value;
        data[index].QTY_LAB = event.target.value;
        setinputFieldQTY_lab(values);
    };
    const [allQTY_lab, setAllQTY_lab] = useState([])
    const handleInputAllQTY_lab = (event) => {
        const values = [...allQTY_lab];
        for (let i = 0; i < data.length; i++) {
            values[i] = event.target.value
            data[i].QTY_LAB = event.target.value;
            setAllQTY_lab(values);
        }
    }
    const handleSubmitQTY_lab = () => {
        setinputFieldQTY_lab(allQTY_lab)
    }
    //************************ input input QTY && WOF END ************************//


    // *********************** div Preview-grid START ****************************//


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
    const [newData, setNewData] = useState([])
    function handlePreview() {
        const rowCal = createCalculate(0, 0, 0)

        setNewData(rowCal.newvalue)
        // console.log('data', rowCal.newvalue)

    }

    // ***********************  Handle Preview END ****************************//

    // ***********************  Calculate After click Preview START ***************************//

    function createCalculate(sumQTY, NoBO, NoSurface, newvalue = []) {

        for (let i = 0; i < data.length; i++) {
            if (inputFieldQTY_good[i] !== "" && inputFieldQTY_good[i] != null && inputFieldQTY_good[i] !== "0") {
                newvalue.push(data[i])

                const newD = data[i]

                newD.WO = 'L' + data[i].L_SLD_BUILD_GROUP.slice(0, 2) + data[i].L_SLD_BO.slice(2) + data[i].L_SLD_TAB[0]
                newD.TMWI_ET = 'L' + data[i].L_SLD_BUILD_GROUP.slice(0, 2) + data[i].L_SLD_BO.slice(2)

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
                { title: "AAB  Design", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Group", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "LDU Lot ID", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },

                { title: "BO SLIDER", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "Slider Lot ID", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "L-Slider BO", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "TAB", style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },

                { title: "L-Slider WO", width: { wpx: 120 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "L-slider Good Q'ty for SDET", width: { wpx: 180 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },
                { title: "L-slider Q'ty for Shear and %Wetting", width: { wpx: 190 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },

                { title: "L-slider Q'ty for Lab ", width: { wpx: 180 }, style: { font: fonttitle, fill: filltitle, alignment: aligncenter, border: borders } },


            ],
            data: newData.map((data, index) => [
                { value: index + 1, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.THREE_DIGIT_WAFER_CODE, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.AIRBEARINGDESIGN, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: 'Group ?', style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },

                { value: data.LDU_LOT, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SLD_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.SLIDER_LOT, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.L_SLD_BO, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },

                { value: data.L_SLD_TAB, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.WOF, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.QTY_GOOD, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },
                { value: data.QTY_SHEAR, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },

                { value: data.QTY_LAB, style: { font: fontvalue, fill: fillvalue, alignment: aligncenter, border: borders } },




            ])
        }
    ];

    // ***********************  Export ExcelFile  END ****************************//


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

            <TableContainer className="detail-card m-t-3" component={Paper}>
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

                            <TableCell><input type="text" className="i-s-5" value={LDU_U} onChange={(e) => {
                                setLDU_U(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={LsliderU} onChange={(e) => {
                                setLsliderU(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={Machine_U} onChange={(e) => {
                                setMachine_U(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={Ratio_U} onChange={(e) => {
                                setRatio_U(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={Reflow_U} onChange={(e) => {
                                setReflow_U(e.target.value)
                            }} /></TableCell>

                        </TableRow>
                        <TableRow align="center">
                            <TableCell>Dn</TableCell>
                            <TableCell><input type="text" className="i-s-5" value={sliderD} onChange={(e) => {
                                setsliderD(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={LDU_D} onChange={(e) => {
                                setLDU_D(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={LsliderD} onChange={(e) => {
                                setLsliderD(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={Machine_D} onChange={(e) => {
                                setMachine_D(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={Ratio_D} onChange={(e) => {
                                setRatio_D(e.target.value)
                            }} /></TableCell>
                            <TableCell><input type="text" className="i-s-5" value={Reflow_D} onChange={(e) => {
                                setReflow_D(e.target.value)
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

                                let Buildgroup = 'L' + val.L_SLD_BUILD_GROUP.slice(0, 2)

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
                                        <TableCell align="center">{val.L_SLD_TAB}</TableCell>
                                        <TableCell align="center">{Buildgroup}{val.L_SLD_BO.slice(2)}{val.L_SLD_TAB[0]}-
                                            <input className="input-size" type="number" value={inputFieldWOF[index]} onChange={event => {
                                                handleInputWOF(
                                                    index,
                                                    event
                                                );

                                            }} />
                                            .wo
                                        </TableCell>
                                        <TableCell align="right">
                                            <input className="input-size" type="number" value={inputFieldQTY_good[index]} onChange={event => {
                                                handleInputQTY_good(
                                                    index,
                                                    event
                                                );
                                            }} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input className="input-size" type="number" value={inputFieldQTY_shear[index]} onChange={event => {
                                                handleInputQTY_shear(
                                                    index,
                                                    event
                                                );
                                            }} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <input className="input-size" type="number" value={inputFieldQTY_lab[index]} onChange={event => {
                                                handleInputQTY_lab(
                                                    index,
                                                    event
                                                );
                                            }} />
                                        </TableCell>

                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>

                <Grid component={Paper} style={{ width: '50%' }}>
                    <div className="qty-content">
                        <div className="grid-qty-content-column">
                            <p>Rev .WO : </p>
                            <p>
                                <input className="input-size" type="number" onChange={event => {
                                    handleInputAllWOF(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitWOF}>submit</p>
                        </div>
                        <div className="grid-qty-content-column">
                            <p>L-Slider Good Qty for SDET (ไม่รวม buy off) : </p>
                            <p>
                                <input className="input-size" type="number" onChange={event => {
                                    handleInputAllQTY_good(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitQTY_good}>submit</p>
                        </div>
                        <div className="grid-qty-content-column">
                            <p>L-Slider Qty for Shear and %Wetting : </p>
                            <p>
                                <input className="input-size" type="number" onChange={event => {
                                    handleInputAllQTY_shear(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitQTY_shear}>submit</p>
                        </div>
                        <div className="grid-qty-content-column">
                            <p>L-Slider Qty for Lab : </p>
                            <p>
                                <input className="input-size" type="number" onChange={event => {
                                    handleInputAllQTY_lab(event)
                                }} />
                            </p>
                            <p className="submit-smail" onClick={handleSubmitQTY_lab}>submit</p>
                        </div>

                    </div>
                </Grid>

                <div className="content-preview">
                    <p className="submit-preview" onClick={handlePreview}>Preview</p>
                </div>

                {newData.length !== 0 ? (
                    <div>

                        <div className="export m-t-3">
                            <ExcelFile filename="Automated Buildflow" element={<p className="submit-preview"  >Export Excel</p>}>
                                <ExcelSheet dataSet={multiDataSet} name="AMA L-Slider" />
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


        </div>

    )
}