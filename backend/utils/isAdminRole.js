const DBUser = require("../database/entities/dbuser")
const getConnection = require("./getConnection")
const jwt = require("jsonwebtoken")
const { secret } = require("../logic/auth")

const isAdminRole = async (id) => {
    const connection = await getConnection
    const repository = connection.getRepository(DBUser)
    const user = repository.findOne({
        id:id
    }) 
    return user.isAdmin
}
const getToken = (req,res,callback) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, secret,(error, user)=>{
        if(error) return res.sendStatus(403)
        callback(user.id)
    })
}

module.exports = {
    isAdminRole,
    getToken
}
