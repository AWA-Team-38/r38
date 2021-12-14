const DBUser = require("../database/entities/dbuser")
const Order = require("../database/entities/order")
const Restaurant = require("../database/entities/restaurant")
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
    const orders = await repository.find({
        relations: ["fooditems"]
    })
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
    const order = await repository.findOne({
        id: orderId, relations: ["user"]
    }) 
    order.status = OrderStatus.Delivered
    if (order.user.id = userId) {
        await repository.save({
            id:order.id,
            estimation: order.estimation,
            status: order.status
        })
        res.sendStatus(200)
    } else res.sendStatus(401)
}

const createOrder = async (items, userId, restaurantId) => {
    const fooditems = items
    const connection = await getConnection
    const repository = connection.getRepository(Order)
    const userRepository = connection.getRepository(DBUser)
    const restaurantRepository = connection.getRepository(Restaurant)
    const user = await userRepository.findOne({
        id: userId
    })
    const restaurant = await restaurantRepository.findOne({
        id: restaurantId
    })
    const order = await repository.save({
        status: OrderStatus.Received,
        estimation: new Date(new Date().getTime() + 30 * 60000).toString(),
        fooditems: fooditems,
        user: user,
        restaurant: restaurant
    })
    return {
        id: order.id,
        status: order.status,
        estimation: order.estimation,
        fooditems: order.fooditems,
        restaurant: order.restaurant
    }
}

module.exports = {
    getUserOrderHistory,
    getAdminOrderHistory,
    getReceivedOrders,
    updateStatusAndEstimation,
    confirmOrderDelivered,
    createOrder
}