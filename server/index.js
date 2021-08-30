// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');
// var mailer = require("nodemailer");

// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");

// const multer = require('multer');
// const path = require('path');

// const oracledb = require("oracledb");
// const app = express();


// app.use(express.json());



// app.use(bodyParser.json())


// app.use(cors({
//     // origin: ['http://10.127.241.88:3000'],
//     origin: ['http://10.44.94.152/auto_build_flow'],
//     // origin: "*",
//     methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT", "PATCH"],
//     credentials: true,
// }))


// // Add headers before the routes are defined
// // app.use(function (req, res, next) {

// //     // Website you wish to allow to connect
// //     res.setHeader('Access-Control-Allow-Origin', 'http://10.44.94.152/auto_build_flow');
// //     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

// //     // Request methods you wish to allow
// //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// //     // Request headers you wish to allow
// //     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

// //     // Set to true if you need the website to include cookies in the requests sent
// //     // to the API (e.g. in case you use sessions)
// //     res.setHeader('Access-Control-Allow-Credentials', true);

// //     // Pass to next layer of middleware
// //     next();
// // });
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 24 * 60 * 60 * 1000 //1 day

//     }
// }))

// // app.use(cors())

// // app.set('etag', false);



// //**************** run node-windows service *************************** *//
// var Service = require('node-windows').Service;
// var svc = new Service({
//     name: 'autobuilflow',
//     description: 'autobuilflow',
//     script: path.resolve(__dirname, '\index.js')
// })
// svc.on('install', function () {svc.start()})
// svc.on('start', function () {console.log('start')})
// svc.install()


// // Connect Database Oracle//
// const ODS_TTDSS2 = `(DESCRIPTION =
//     (ADDRESS_LIST =
//     (ADDRESS = (PROTOCOL = TCP)(HOST = TTDSS2.TEP.THAI.SEAGATE.COM)(PORT = 1521))
//     )
//     (CONNECT_DATA =
//     (SID = ODS)
//     )
//     )`



// //******************** Login Logout START ***********************//



// app.get('/login', (req, res) => {

//     if (req.session.user) {
//         // res.send({ loggedIn: true, user: req.session.user });
//         res.status(200).send({ loggedIn: true, user: req.session.user });
//     } else {
//         // res.send({ loggedIn: false });
//         res.status(200).send({ loggedIn: false });
//     }
// })

// app.post('/login', (req, res) => {
//     const gid = req.body.gid;

//     if (gid.length > 0) {
//         req.session.user = gid
//         // res.send(gid);
//         res.status(200).send(gid);
//     }
// })

// app.post('/logout', (req, res) => {
//     req.session.destroy((err, result) => {
//         if (err) {
//             throw err;
//         } else {
//             // res.redirect('/auto_build_flow');
//             // console.log(result)
//             // res.send(result)
//             res.status(200).send(result);
//         }
//     });
// })
// //******************** Login Logout END ***********************//


// //******************** Images START ***********************//
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./uploads/images");
//     },
//     filename: function (req, file, cb) {
//         const ext = file.mimetype.split("/")[1];
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });


// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
//         }
//     }
// });


// app.post('/uploadimg', upload.array('imagesArray'), (req, res) => {
//     const images = req.files;
//     let reqFiles = [];


//     for (let i = 0; i < images.length; i++) {
//         reqFiles.push(images[i].filename)
//     }
//     res.send(reqFiles)

// })

// app.get('/showImages/:name', (req, res) => {
//     res.sendFile(path.resolve(__dirname, `./uploads/images/${req.params.name}`));
// });

// //******************** Images END ***********************//


// //******************** Search BIN START ***********************//
// async function selectRDH_RO(req, res, exp_bin) {
//     try {
//         connection = await oracledb.getConnection({
//             user: "RHTDEVAPP",
//             password: "rhtseagate",
//             connectString: ODS_TTDSS2
//         });
//         // run query to get employee with employee_id
//         const table = "EXP_ID, BUILDGROUP, HGA_QTY, PRODUCTFAMILY, PARTNUM, BLD_INTENT_TYPE, HGA_SUSPENSION_PN, HGA_PART_NUM, SLC_PRIORITY, PARM_HGA_TAB, HGA_BO, AIRBEARINGDESIGN, SLD_BO, TSR_PN_G_SAAM, CL_TSR_PN_I_ELECTRIC1, THREE_DIGIT_WAFER_CODE"
//         result = await connection.execute(`SELECT ${table} FROM REPORT.etsa_th_bin where EXP_ID=:exp_bin ORDER BY HGA_BO ASC`, [exp_bin]);

//     } catch (err) {
//         //send error message
//         return res.send(err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Always close connections
//                 await connection.close();
//             } catch (err) {
//                 return console.error(err.message);
//             }
//         }
//         if (result.rows.length == 0) {
//             //query return zero employees
//             return res.send({ message: 'There is no information on this bill number.' });
//         } else {
//             //send all employees
//             return res.send(result.rows);
//         }
//     }
// }

// //get /employee?id=<id employee>
// app.get('/rdh-ro', function (req, res) {
//     //get query param ?id
//     const exp_bin = req.query.exp_bin;
//     // id param if it is number

//     selectRDH_RO(req, res, exp_bin);
// })


// async function selectRDH_SDET(req, res, exp_bin) {
//     try {
//         connection = await oracledb.getConnection({
//             user: "RHTDEVAPP",
//             password: "rhtseagate",
//             connectString: ODS_TTDSS2
//         });
//         // run query to get employee with employee_id
//         const table = "EXP_ID, PARTNUM, SLD_BO,PRODUCTFAMILY, THREE_DIGIT_WAFER_CODE, AIRBEARINGDESIGN, SDET_ACTIVATION_DT, SDET_BN, SDET_BUILDGROUP, SDET_CONTROLGROUP, SDET_ET_TSR, SDET_MIN_QTY, SDET_PART_OF_EXP, SDET_PRIORITY, SDET_QTY, SDET_RETEST_BUILD_NUMBER, SDET_SETS_PARTNUM, SDET_SETS_VERSION, SDET_SITE, SDET_TAB"
//         result = await connection.execute(`SELECT ${table} FROM REPORT.etsa_th_bin where EXP_ID=:exp_bin AND SDET_PART_OF_EXP=:booleen ORDER BY SDET_TAB ASC`, [exp_bin, booleen = "YES"]);

//     } catch (err) {
//         //send error message
//         return res.send(err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Always close connections
//                 await connection.close();
//             } catch (err) {
//                 return console.error(err.message);
//             }
//         }
//         if (result.rows.length == 0) {
//             //query return zero employees
//             return res.send({ message: 'There is no information on this bill number.' });
//         } else {
//             //send all employees
//             return res.send(result.rows);
//             // console.log(result)
//         }
//     }
// }

// //get /employee?id=<id employee>
// app.get('/rdh-sdet', function (req, res) {
//     //get query param ?id
//     const exp_bin = req.query.exp_bin;
//     // id param if it is number

//     selectRDH_SDET(req, res, exp_bin);
// })


// async function selectRDH_HGA(req, res, exp_bin) {
//     try {
//         connection = await oracledb.getConnection({
//             user: "RHTDEVAPP",
//             password: "rhtseagate",
//             connectString: ODS_TTDSS2
//         });
//         // run query to get employee with employee_id
//         const table = "EXP_ID, BUILDGROUP,SDET_BN, HGA_QTY, HGA_ET_TSR, PRODUCTFAMILY, PARTNUM, BLD_INTENT_TYPE, HGA_SUSPENSION_PN, HGA_PART_NUM, SLC_PRIORITY, PARM_HGA_TAB, HGA_BO, AIRBEARINGDESIGN, SLD_BO, TSR_PN_G_SAAM, CL_TSR_PN_I_ELECTRIC1, THREE_DIGIT_WAFER_CODE"
//         result = await connection.execute(`SELECT ${table} FROM REPORT.etsa_th_bin where EXP_ID=:exp_bin ORDER BY HGA_BO ASC`, [exp_bin]);

//     } catch (err) {
//         //send error message
//         return res.send(err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Always close connections
//                 await connection.close();
//             } catch (err) {
//                 return console.error(err.message);
//             }
//         }
//         if (result.rows.length == 0) {
//             //query return zero employees
//             return res.send({ message: 'There is no information on this bill number.' });
//         } else {
//             //send all employees
//             return res.send(result.rows);
//         }
//     }
// }

// //get /employee?id=<id employee>
// app.get('/rdh-hga', function (req, res) {
//     //get query param ?id
//     const exp_bin = req.query.exp_bin;
//     // id param if it is number

//     selectRDH_HGA(req, res, exp_bin);
// })



// async function selectAMA_SDET(req, res, exp_bin) {
//     try {
//         connection = await oracledb.getConnection({
//             user: "RHTDEVAPP",
//             password: "rhtseagate",
//             connectString: ODS_TTDSS2
//         });
//         // run query to get employee with employee_id
//         const table = "EXP_ID, L_SLD_BO, L_SLD_PART_NUM, PRODUCTFAMILY, PARTNUM, SLD_BO, THREE_DIGIT_WAFER_CODE, AIRBEARINGDESIGN, SDET_ACTIVATION_DT, SDET_BN, SDET_BUILDGROUP, SDET_CONTROLGROUP, SDET_ET_TSR, SDET_MIN_QTY, SDET_PART_OF_EXP, SDET_PRIORITY, SDET_QTY, SDET_RETEST_BUILD_NUMBER, SDET_SETS_PARTNUM, SDET_SETS_VERSION, SDET_SITE, SDET_TAB"
//         result = await connection.execute(`SELECT ${table} FROM REPORT.etsa_th_bin where EXP_ID=:exp_bin AND SDET_PART_OF_EXP=:booleen ORDER BY SLD_BO ASC`, [exp_bin, booleen = "YES"]);

//     } catch (err) {
//         //send error message
//         return res.send(err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Always close connections
//                 await connection.close();
//             } catch (err) {
//                 return console.error(err.message);
//             }
//         }
//         if (result.rows.length == 0) {
//             //query return zero employees
//             return res.send({ message: 'There is no information on this bill number.' });
//         } else {
//             //send all employees
//             return res.send(result.rows);
//         }
//     }
// }

// //get /employee?id=<id employee>
// app.get('/ama-sdet', function (req, res) {
//     //get query param ?id
//     const exp_bin = req.query.exp_bin;
//     // id param if it is number

//     selectAMA_SDET(req, res, exp_bin);
// })



// async function selectAMA_HGA(req, res, exp_bin) {
//     try {
//         connection = await oracledb.getConnection({
//             user: "RHTDEVAPP",
//             password: "rhtseagate",
//             connectString: ODS_TTDSS2
//         });
//         // run query to get employee with employee_id
//         const table = "EXP_ID, HGA_ET_TSR, BLD_INTENT_PLATFORM, L_SLD_PART_NUM, BUILDGROUP,SDET_BN, HGA_QTY, PRODUCTFAMILY, PARTNUM, BLD_INTENT_TYPE, HGA_SUSPENSION_PN, HGA_PART_NUM, SLC_PRIORITY, PARM_HGA_TAB, HGA_BO, AIRBEARINGDESIGN, SLD_BO, TSR_PN_G_SAAM, CL_TSR_PN_I_ELECTRIC1, THREE_DIGIT_WAFER_CODE"
//         result = await connection.execute(`SELECT ${table} FROM REPORT.etsa_th_bin where EXP_ID=:exp_bin ORDER BY HGA_BO ASC`, [exp_bin]);

//     } catch (err) {
//         //send error message
//         return res.send(err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Always close connections
//                 await connection.close();
//             } catch (err) {
//                 return console.error(err.message);
//             }
//         }
//         if (result.rows.length == 0) {
//             //query return zero employees
//             return res.send({ message: 'There is no information on this bill number.' });
//         } else {
//             //send all employees
//             return res.send(result.rows);
//         }
//     }
// }

// //get /employee?id=<id employee>
// app.get('/ama-hga', function (req, res) {
//     //get query param ?id
//     const exp_bin = req.query.exp_bin;
//     // id param if it is number

//     selectAMA_HGA(req, res, exp_bin);
// })


// async function selectAMA_LSD(req, res, exp_bin) {
//     try {
//         connection = await oracledb.getConnection({
//             user: "RHTDEVAPP",
//             password: "rhtseagate",
//             connectString: ODS_TTDSS2
//         });
//         // run query to get employee with employee_id
//         const table = "EXP_ID, SDET_BN, L_SLD_TEAM, L_SLD_TAB,L_SLD_PART_NUM, SDET_ET_TSR, L_SLD_BO, L_SLD_CMP_DT, L_SLD_BUILD_GROUP, PRODUCTFAMILY, PARTNUM, SLD_BO, THREE_DIGIT_WAFER_CODE, AIRBEARINGDESIGN"
//         result = await connection.execute(`SELECT ${table} FROM REPORT.etsa_th_bin where EXP_ID=:exp_bin ORDER BY SLD_BO ASC`, [exp_bin]);

//     } catch (err) {
//         //send error message
//         return res.send(err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Always close connections
//                 await connection.close();
//             } catch (err) {
//                 return console.error(err.message);
//             }
//         }
//         if (result.rows.length == 0) {
//             //query return zero employees
//             return res.send({ message: 'There is no information on this bill number.' });
//         } else {
//             //send all employees
//             return res.send(result.rows);
//         }
//     }
// }

// //get /employee?id=<id employee>
// app.get('/ama-lsd', function (req, res) {
//     //get query param ?id
//     const exp_bin = req.query.exp_bin;
//     // id param if it is number

//     selectAMA_LSD(req, res, exp_bin);
// })



// async function selectAMA_LSD_HGA(req, res, exp_bin) {
//     try {
//         connection = await oracledb.getConnection({
//             user: "RHTDEVAPP",
//             password: "rhtseagate",
//             connectString: ODS_TTDSS2
//         });
//         // run query to get employee with employee_id
//         const table = "EXP_ID, HGA_ET_TSR, L_SLD_BO, L_SLD_BUILD_GROUP, L_SLD_PART_NUM, L_SLD_TAB, BUILDGROUP,SDET_BN, HGA_QTY, PRODUCTFAMILY, PARTNUM, BLD_INTENT_TYPE, HGA_SUSPENSION_PN, HGA_PART_NUM, SLC_PRIORITY, PARM_HGA_TAB, HGA_BO, AIRBEARINGDESIGN, SLD_BO, TSR_PN_G_SAAM, CL_TSR_PN_I_ELECTRIC1, THREE_DIGIT_WAFER_CODE"
//         result = await connection.execute(`SELECT ${table} FROM REPORT.etsa_th_bin where EXP_ID=:exp_bin ORDER BY HGA_BO ASC`, [exp_bin]);

//     } catch (err) {
//         //send error message
//         return res.send(err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Always close connections
//                 await connection.close();
//             } catch (err) {
//                 return console.error(err.message);
//             }
//         }
//         if (result.rows.length == 0) {
//             //query return zero employees
//             return res.send({ message: 'There is no information on this bill number.' });
//         } else {
//             //send all employees
//             return res.send(result.rows);
//         }
//     }
// }

// //get /employee?id=<id employee>
// app.get('/ama-lsd-hga', function (req, res) {
//     //get query param ?id
//     const exp_bin = req.query.exp_bin;
//     // id param if it is number

//     selectAMA_LSD_HGA(req, res, exp_bin);
// })



// async function selectAMA_LSD_SDET(req, res, exp_bin) {
//     try {
//         connection = await oracledb.getConnection({
//             user: "RHTDEVAPP",
//             password: "rhtseagate",
//             connectString: ODS_TTDSS2
//         });
//         // run query to get employee with employee_id
//         const table = "EXP_ID, SDET_ET_TSR,L_SLD_TAB, L_SLD_BUILD_GROUP, L_SLD_BO, L_SLD_PART_NUM, PRODUCTFAMILY, PARTNUM, SLD_BO, THREE_DIGIT_WAFER_CODE, AIRBEARINGDESIGN, SDET_ACTIVATION_DT, SDET_BN, SDET_BUILDGROUP, SDET_CONTROLGROUP, SDET_MIN_QTY, SDET_PART_OF_EXP, SDET_PRIORITY, SDET_QTY, SDET_RETEST_BUILD_NUMBER, SDET_SETS_PARTNUM, SDET_SETS_VERSION, SDET_SITE, SDET_TAB"
//         result = await connection.execute(`SELECT ${table} FROM REPORT.etsa_th_bin where EXP_ID=:exp_bin AND SDET_PART_OF_EXP=:booleen ORDER BY SLD_BO ASC`, [exp_bin, booleen = "YES"]);

//     } catch (err) {
//         //send error message
//         return res.send(err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Always close connections
//                 await connection.close();
//             } catch (err) {
//                 return console.error(err.message);
//             }
//         }
//         if (result.rows.length == 0) {
//             return res.send({ message: 'There is no information on this bill number.' });
//         } else {
//             return res.send(result.rows);
//         }
//     }
// }

// app.get('/ama-lsd-sdet', function (req, res) {
//     //get query param ?id
//     const exp_bin = req.query.exp_bin;
//     // id param if it is number

//     selectAMA_LSD_SDET(req, res, exp_bin);
// })

// //******************** Search BIN END ***********************//



// app.post('/automail', (req, res) => {
//     // console.log('commweee')
//     var smtp = {
//         host: 'mailhost.seagate.com', //set to your host name or ip
//         port: 587, //25, 465, 587 depend on your 
//         secure: false, // use SSL
//         auth: {
//             user: 'chaiwat.singkibut@seagate.com', //user account
//             pass: 'Singkibut931897' //user password
//         }
//     };
//     var smtpTransport = mailer.createTransport(smtp);
    

//     var mail = {
//         from: 'testemail@email.com', //from email (option)
//         to: 'chaiwat.singkibut@seagate.com', //to email (require)
//         subject: "Subject Text", //subject
//         html: `<p>Test</p>`  //email body
//      }
//      smtpTransport.sendMail(mail, function(error, response){
//         smtpTransport.close();
//         if(error){
//            //error handler
//            res.send({message : error});
//         }else{
//            //success handler 
//            res.send({message : 'send email success'});
//         }
//      });


//     // console.log(imagesName)

//     // for (let i = 0; i < imagesName.length; i++) {
//     //     console.log(path.resolve(__dirname, `./uploads/images/${imagesName[i]}`))
//     // }
// })




// app.listen(3001, () => {
//     console.log('Server is running...')
// })
