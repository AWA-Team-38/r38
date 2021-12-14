var express = require('express');
const { getMenu } = require('../logic/menus');
const { getRestaurants, addRestaurant, updateMenuOnRestaurant } = require('../logic/restaurants');
const { getToken, isAdminRole } = require('../utils/isAdminRole');
const { isValidPriceType, isValidRestaurantType } = require('../utils/mapper');
var router = express.Router();

router.get('/restaurants', async function (req, res, next) {
    const response = await getRestaurants()
    res.json(response)
});

router.post('/restaurant', async function (req, res, next) {
    getToken(req, res, async (userId) => {
        if (isAdminRole(userId)) {
            const body = req.body
            const response = await addRestaurant(body)
            res.json(response)
        } else {
            res.sendStatus(401)
        }
    })

});

router.post('/restaurant/:restaurantId', async function (req, res, next) {
    getToken(req, res, async (userId) => {
        if (isAdminRole(userId)) {
            const body = req.body
            const restaurantId = req.params.restaurantId
            const response = await updateMenuOnRestaurant(restaurantId, body)
            res.json(response)
        } else {
            res.sendStatus(401)
        }
    })

});


module.exports = router;