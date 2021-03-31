const jwt = require('jsonwebtoken')
const routeService = require('./routeService');

function jwtVerification(req, res, next) {
    let token = req.headers['authorization'];
    console.log("TOKEN :", token)
    jwt.verify(token, process.env.JWT_KEY, async function (err, payload) {
        console.log("payload", payload);
        if (err == null) {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Pragma', 'no-cache');
            next();
        } else {
            console.error("JWT VERIFY ERROR :", err);
            res.status(403).json({ code: process.env.ERROR_CODE, msg: 'Unauthorised Access' });
        }
    })
}


exports.routeHelper = async function (app) {

    // app.use('/users', jwtVerification, routeService.users)

    app.get('/all-tasks', jwtVerification, (req, res) => {
        routeService.getAllTask().then((result) => {
            res.send({
                code: process.env.SUCCESS_CODE,
                count: result.rows.length,
                data: result.rows
            });
        }).catch(error => {
            res.send({ code: process.env.ERROR_CODE, data: error.message })
        })
    })

    // app.use('/user-task', jwtVerification, routeService.getUser)

    app.get('/user-task', jwtVerification, (req, res) => {
        routeService.getUserTask(req.query.id).then((result) => {
            res.send({
                code: process.env.SUCCESS_CODE,
                count: result.rows.length,
                data: result.rows
            });
        }).catch(error => {
            res.send({ code: process.env.ERROR_CODE, data: error.message })
        })
    })

    app.post('/filter-task', jwtVerification, (req, res) => {
        routeService.filterTask(req.body).then((result) => {
            res.send({
                code: process.env.SUCCESS_CODE,
                count: result.rows.length,
                data: result.rows
            });
        }).catch(error => {
            res.send({ code: process.env.ERROR_CODE, data: error.message })
        })
    })

    // app.use('/delete-task', jwtVerification, routeService.deleteMoment)

    app.post('/add-task', jwtVerification, (req, res) => {
        routeService.addTask(req.body).then((result) => {
            console.log(result)
            res.send({
                code: process.env.SUCCESS_CODE,
                data: `inserted ${result.rowCount} record.`
            })
        }).catch(error => {
            res.send({ code: process.env.ERROR_CODE, data: error.message })
        });
    })


    app.post('/update-task', jwtVerification, (req, res) => {
        routeService.updateTask(req.body).then((result) => {
            console.log(result)
            res.send({
                code: process.env.SUCCESS_CODE,
                data: `updated ${result.rowCount} record.`
            })
        }).catch(error => {
            res.send({ code: process.env.ERROR_CODE, data: error.message })
        });
    })

};
