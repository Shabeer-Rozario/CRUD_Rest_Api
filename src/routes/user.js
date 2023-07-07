const express = require('express');

const usermodel = require('../models/user.js')

const router = express.Router()

router.post('/adduser', async (req, res) => {
    const reqdata = req.body;
    console.log("reqbody", req.body);
    let userdata = new usermodel({
        firstname: reqdata.firstname,
        lastname: reqdata.lastname,
        email: reqdata.email,
        password: reqdata.password
    })
    try {
        let finaluserdata = await userdata.save();
        console.log(finaluserdata);
        res.status(200).json({ "status": 200, "data": finaluserdata, "message": "user Added Successfully", "error": false })

    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.get('/getuser', async (req, res) => {
    try {
        const posteduserdata = await usermodel.find()
        console.log("paramsid", req.params._id);
        console.log("find", usermodel.find());
        var userdata = {
            "finaldata": posteduserdata,
            // "finaldataLength": posteduserdata.length
        }
        console.log(userdata);
        res.status(200).json({ "status": 200, "data": userdata, "message": "Successfully fetched user data", "error": false })

    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })

    }
})

router.put('/updateuser/:id', async (req, res) => {
    const reqdata = req.body
    try {
        const updateData = await usermodel.findByIdAndUpdate({ _id: req.params.id }, { ...reqdata })
        res.status(200).json({ "status": 200, "data": updateData, "message": "Successfully fetched user data", "error": false })
    } catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.delete('/DeleteUser/:id', async (req, res) => {
    const reqdata = req.body
    try {
        const deletedata = await usermodel.findByIdAndDelete({ _id: req.params.id }, { ...reqdata })
        res.status(200).json({ "status": 200, "data": deletedata, "message": "Successfully fetched user data", "error": false })
    } catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})
module.exports = router;  