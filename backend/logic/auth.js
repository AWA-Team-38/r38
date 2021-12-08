const getConnection = require("../utils/getConnection")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secret = "njuosafunjiofafgsweioujnfosjdanu"
const salt = 10

const login = async(username, password) => {
        // first we have to get the user from the db, secondly we are going to validate the password to see if it matches and lastly we are going to give the user an identifier *// 
        const connection = await getConnection
        const repository = connection.getRepository(DBUser)
        const user = await repository.findOne({
            username, 
        })
        const isidentical = await bcrypt.compare(password, user.password)
        if (isidentical) {
            const token = jwt.sign({
                id: user.id
            },
            secret)
            return { data: token, message: "success"}
        } else {
            return { data: "", message: "failed"}
        }
}

const register = async (username, password) => {
    // Hash the password and insert user into db //* 
    const hashpassword = await bcrypt.hash(password, salt)
    const connection = await getConnection
    const repository = connection.getRepository(DBUser)
    await repository.save({
        username, password: hashpassword
    })
    return { data:"", message: "You have succesfully registered the user"}
}
module.exports = {
    login, register
}