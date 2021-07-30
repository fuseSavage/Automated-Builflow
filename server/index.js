const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const multer = require('multer');
const path = require('path');


const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 24 * 60 * 60 * 1000 //1 day

    }
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root11549",
    database: "demoautodb",
});

const dbimg = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root11549",
    database: "images",
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/images");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
        }
    }
});

app.get('/login', (req, res) => {

    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
})

app.post('/login', (req, res) => {
    const gid = req.body.gid;
    const password = req.body.password;

    db.query(`SELECT * FROM employees WHERE gid = "${gid}" AND password = "${password}" `,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                req.session.user = result
                res.send(result);
            } else {
                res.send({ message: "gid / password is invalid!" });
                console.log("error : ", err)
            }
        }
    )
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    });
})

app.get('/rdh-ro', (req, res) => {
    const exp_bin = req.query.exp_bin;
    const rdh_ro_table = "EXP_ID, BUILDGROUP, PRODUCTFAMILY, PARTNUM, BLD_INTENT_TYPE, HGA_SUSPENSION_PN, HGA_PART_NUM, SLC_PRIORITY, PARM_HGA_TAB, HGA_BO, AIRBEARINGDESIGN, SLD_BO, TSR_PN_G_SAAM, CL_TSR_PN_I_ELECTRIC1, THREE_DIGIT_WAFER_CODE"

    db.query(`SELECT ${rdh_ro_table} FROM data_2 WHERE EXP_ID = "${exp_bin}" ORDER BY HGA_BO ASC`,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length != 0) {
                res.send(result)
            } else {
                res.send({
                    message: "There is no information on this bill number."
                })
            }
        })
})

app.get('/swfw', (req, res) => {
    db.query(`SELECT * FROM sw_fw`,
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
})
app.post('/add-swfw', (req, res) => {
    const sw_fw = req.query.sw_fw;
    db.query(`INSERT INTO sw_fw (swfw) VALUES (?)`, [sw_fw],
        (err, result) => {
            if (err) {
                res.send({ message: 'Insert fail :(' })
            } else {
                res.send({ message: 'successfully added to the list :)' })
            }
        })
})
app.delete('/delswfw', (req, res) => {
    const id = req.query.id;
    db.query(`DELETE FROM sw_fw WHERE id = ?`, [id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({ message: 'successfully deleted' })
            }
        })
})


app.get('/check-title', (req, res) => {
    dbimg.query(`SHOW TABLES`, (err, result) => {
        if (err) {
            console.log('err', err)
        } else {
            res.send(result)
        }
    })
})

app.delete('/deleteTitle', (req, res) => {
    const title = req.query.title;
    dbimg.query(`DROP TABLE ${title}`, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send({
                message: 'Successfully Deleted'
            })
        }
    })
})

app.post('/uploadimg', upload.array('imagesArray'), (req, res) => {
    const title = req.query.title;
    const images = req.files;
    let reqFiles = [];

    for (let i = 0; i < images.length; i++) {
        reqFiles.push(images[i].filename)
        dbimg.query(`INSERT INTO ${title} (images) VALUES ("${reqFiles[i]}")`, (err) => {
            if (err) {
                dbimg.query(`CREATE TABLE ${title} (id INT AUTO_INCREMENT PRIMARY KEY, images VARCHAR(255))`, (err) => {
                    if (err) {
                        dbimg.query(`INSERT INTO ${title} (images) VALUES ("${reqFiles[i]}")`, () => {
                            
                        })
                    } else {
                        dbimg.query(`INSERT INTO ${title} (images) VALUES ("${reqFiles[i]}")`, () => {
                        
                        })
                    }
                })
            } else {
                console.log('error')
            }
        })
    }
})

app.get('/getImage', (req, res) => {
    const title = req.query.title;
    dbimg.query(`SELECT * FROM ${title}`, (err, result) => {
        if (err) {

        } else {
            res.send(result)
        }
    })
})

app.get('/showImages/:name', (req, res) => {
    res.sendFile(path.resolve(__dirname, `./uploads/images/${req.params.name}`));
});

app.delete('/deleteItem', (req, res) => {
    const id = req.query.id;
    const title = req.query.title;
    // console.log(id, title)

    dbimg.query(`DELETE FROM ${title} WHERE id = ${id}`, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                message: 'Successfully Deleted'
            })
        }
    })
})

app.get('/getImage', (req, res) => {
    const title = req.query.title;
    if (title != undefined) {
        imgdb.query(`SELECT * FROM ${title}`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
    }
    // res.sendFile(path.resolve(__dirname, `./uploads/images/${req.params.name}`));
});

app.post('/changeImage', upload.array('imagesArr'), (req, res) => {
    const title = req.query.title;
    const images = req.files;
    let reqFiles = [];

    for (let i = 0; i < images.length; i++) {
        reqFiles.push(images[i].filename)

        dbimg.query(`INSERT INTO ${title} (images) VALUES ("${reqFiles[i]}")`, () => {
                        
        })
    }
})


app.listen(3001, () => {
    console.log('Server is running...')
})