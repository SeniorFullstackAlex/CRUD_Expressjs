//importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

const Data = require('./models/data');
const School = require('./models/school');

const passwordHash = require('password-hash');
const User = require('./models/user_model');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/schools');
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Mongodb connection success');
});

//addingmiddleware-cors
app.use(cors({origin: 'http://localhost:3000'}));

//data management
router.route('/data').get((req, res) => {
    Data.find((err, datas) => {
        if (err)
            console.log(err);
        else
            res.json(datas);
    });
});

router.route('/data/:id').get((req, res) => {
    Data.findById(req.params.id, (err, data) => {
        if (err)
            console.log(err)
        else
            res.json(data);
    });
});

router.route('/data/add').post((req, res) => {
    let data = new Data(req.body);
        data.save()
            .then(data => {
                res.status(200).json({'data': 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record');
            });
});

router.route('/data/update/:id').post((req, res) => {
    Data.findById(req.params.id, (err, data) => {
        if (!data)
            return next(new Error('Could not load document'));
        else {
            data.name = req.body.name;
            data.year = req.body.year;
            data.month = req.body.month;
            data.week = req.body.week;
            data.eleuro = req.body.eleuro;
            data.elkwh = req.body.elkwh;
            data.heateuro = req.body.heateuro;
            data.heatkwh = req.body.heatkwh;
            data.watereuro = req.body.watereuro;
            data.waterlitre = req.body.waterlitre;

            data.save().then(data => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/school/update/:id').post((req, res) => {
    School.findById(req.params.id, (err, school) => {
        if (!school)
            return next(new Error('Could not load document'));
        else {
            school.name = req.body.name;
            
            school.save().then(data => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

//delete data
router.route('/data/delete/:id').get((req, res) => {
    Data.findByIdAndRemove({_id: req.params.id}, (err, school) => {
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(school);
        }   
    });
});

//school management
router.route('/school').get((req, res) => {
    School.find((err, school) => {
        if (err)
            console.log(err);
        else
            res.json(school);
    });
});

router.route('/school/:id').get((req, res) => {
    School.findById(req.params.id, (err, school) => {
        if (err)
            console.log(err)
        else
            res.json(school);
    });
});

router.route('/school/add').post((req, res) => {
    let school = new School(req.body);
        school.save()
            .then(data => {
                res.status(200).json({'data': 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record');
            });
});

//delete school
router.route('/school/delete/:id').get((req, res) => {
    School.findByIdAndRemove({_id: req.params.id}, (err, school) => {
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(school);
        }   
    });
});

//Authentication
router.route('/auth').post((req,res,next) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
    });
    console.log(user);
    // res.json(newList);
    User.regiester(user, (err, list) => {
        if(err) {
            res.json({success: false, message: `Failed to register. Error: ${err}`});

        }
        else
            res.json({success:true, message: "Register successfully."});
    });
});

router.route('/auth/login').post((req, res, next) => {
    let email = req.body.email;
    let pass = req.body.password;
    console.log("______email_____", email);
    User.signin(email, (err, user) => {
        if(err){
            res.json({success: false, message: `Error: ${err}`});
        }else{
            if(user){
                if(passwordHash.verify(pass, user.password)){
                    res.json({success: true, message: ""});
                }else{
                    res.json({success: false, message: "Invalid Password!"});
                }
            }else{
                res.json({success: false, message: "Invalid Email!"});
            }
        }
    })
});

app.use('/', router);


app.listen(4000,()=>{
    console.log('Server started at 4000');
});