var express = require('express');
const { getAdminOrderHistory, getUserOrderHistory, getReceivedOrders, updateStatusAndEstimation } = require('../logic/orders');
const { getToken, isAdminRole } = require('../utils/isAdminRole');
const { isValidStatus } = require('../utils/mapper');
var router = express.Router();

router.get('/orders', async function (req, res, next) {
    getToken(req, res, (userId) => {
        if (isAdminRole(userId)) {
            res.json(getAdminOrderHistory())
        } else {
            res.json(getUserOrderHistory(userId))
        }
    })
});

router.get('/orders/received', async function (req, res, next) {
    getToken(req, res, (userId) => {
        if (isAdminRole(userId)) {
            res.json(getReceivedOrders())
        } else {
            res.sendStatus(401)
        }
    })
})
// to do: change date to match database //* 
router.put('/order', async function (req, res, next) {
    getToken(req, res, (userId) => {
        if (isAdminRole(userId)) {
            const body = req.body
            if (isValidStatus(body.status)) {
                res.json(updateStatusAndEstimation(body))
            } else {
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(401)
        }
    })
})

module.exports = router