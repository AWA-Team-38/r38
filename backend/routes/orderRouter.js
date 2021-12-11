var express = require('express');
const { getAdminOrderHistory, getUserOrderHistory, getReceivedOrders, updateStatusAndEstimation, confirmOrderDelivered } = require('../logic/orders');
const { getToken, isAdminRole } = require('../utils/isAdminRole');
const { isValidStatus } = require('../utils/mapper');
var router = express.Router();

router.get('/', async function (req, res, next) {
    getToken(req, res, (userId) => {
        if (isAdminRole(userId)) {
            res.json(getAdminOrderHistory())
        } else {
            res.json(getUserOrderHistory(userId))
        }
    })
});

router.get('/received', async function (req, res, next) {
    getToken(req, res, (userId) => {
        if (isAdminRole(userId)) {
            res.json(getReceivedOrders())
        } else {
            res.sendStatus(401)
        }
    })
})
router.put('/', async function (req, res, next) {
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

router.put('/order/:orderId', async function (req, res, next) {
    getToken(req, res, (userId) => {
        const orderId = req.params.orderId
        confirmOrderDelivered(orderId, userId)
    })
})

module.exports = router