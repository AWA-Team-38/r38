var express = require('express');
const { getAdminOrderHistory, getUserOrderHistory, getReceivedOrders, updateStatusAndEstimation, confirmOrderDelivered, createOrder } = require('../logic/orders');
const { getToken, isAdminRole } = require('../utils/isAdminRole');
const { isValidStatus } = require('../utils/mapper');
var router = express.Router();

router.get('/', function (req, res, next) {
    getToken(req, res, async (userId) => {
        if (isAdminRole(userId)) {
            const result = await getAdminOrderHistory()
            res.json(result)
        } else {
            const result = await getUserOrderHistory(userId)
            res.json(result)
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
        confirmOrderDelivered(orderId, userId, res)
    })
})

router.post('/order/:restaurantId', function (req, res, next) {
    getToken(req, res, async (userId) => {
        const restaurantid = req.params.restaurantId
        const body = req.body.fooditems
        const order = await createOrder(body, userId, restaurantid)
        res.json(order)
    })
})

module.exports = router