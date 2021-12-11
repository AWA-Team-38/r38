const DBUser = require("../database/entities/dbuser")
const Order = require("../database/entities/order")
const OrderStatus = require("../enums/orderStatus")
const getConnection = require("../utils/getConnection")

const getUserOrderHistory = async (userId) => {
    const connection = await getConnection
    const repository = connection.getRepository(DBUser)
    const user = await repository.findOne({
        id: userId,
        relations: ["orders"]
    })
    return user.orders
}

const getAdminOrderHistory = async () => {
    const connection = await getConnection
    const repository = connection.getRepository(Order)
    const orders = await repository.find()
    return orders
}

const getReceivedOrders = async () => {
    const connection = await getConnection
    const repository = connection.getRepository(Order)
    const orders = await repository.find({
        status: OrderStatus.Received
    })
    return orders
}

const updateStatusAndEstimation = async (order) => {
    const connection = await getConnection
    const repository = connection.getRepository(Order)
    const newOrder = await repository.save(order)
    return newOrder
}

const confirmOrderDelivered = async (orderId, userId, res) => {
    const connection = await getConnection
    const repository = connection.getRepository(Order)
    const order = await repository.find({
        id: orderId, relations: ["user"]
    })
    if (order.user.id = userId) {
        await repository.save({
            id:orderId,
            estimation:order.estimation,
            status:OrderStatus.Delivered
        }) 
        res.sendStatus(200)
    } else res.sendStatus(401)
}

module.exports = {
    getUserOrderHistory,
    getAdminOrderHistory,
    getReceivedOrders,
    updateStatusAndEstimation,
    confirmOrderDelivered
}