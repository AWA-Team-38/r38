var express = require('express');
const { updateProductToCategory } = require('../logic/categories');
const { getMenu, updateCategoryToMenu } = require('../logic/menus');
const { getToken, isAdminRole } = require('../utils/isAdminRole');
var router = express.Router();


router.post('/category/:categoryId', async function (req, res, next) {
    getToken(req, res, async (userId) => {
        if (isAdminRole(userId)) {
            const categoryId = req.params.categoryId
            const body = req.body
            const response = await updateProductToCategory(categoryId, body)
            res.json(response)
        } else {
            res.sendStatus(401)
        }
    })


});

module.exports = router