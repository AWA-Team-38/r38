const OrderStatus = require("../enums/orderStatus");

const isValidStatus = async (status) => {
    switch (status) {
        case OrderStatus.Received:
            return true
        case OrderStatus.Preparing:
            return true
        case OrderStatus.Ready_To_Deliver:
            return true
        case OrderStatus.Delivering:
            return true
        case OrderStatus.Delivered:
            return true
        default: 
            return false
    }
}

module.exports = {
    isValidStatus
}