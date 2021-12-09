var express = require('express');
const { getMenu, updateCategoryToMenu } = require('../logic/menus');
var router = express.Router();

router.get('/menu/:restaurantId', async function (req, res, next) {
    const restaurantId = req.params.restaurantId
    const response = await getMenu(restaurantId)
    res.json(response)

});

router.post('/menu/:menuId', async function (req, res, next) {
    getToken(req, res, async (userId) => {
        if (isAdminRole(userId)) {
            const menuId = req.params.menuId
            const body = req.body
            const response = await updateCategoryToMenu(menuId, body)
            res.json(response)
        } else {
            res.sendStatus(401)
        }
    })

});

module.exports = router

