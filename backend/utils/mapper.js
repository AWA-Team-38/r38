const OrderStatus = require("../enums/orderStatus");
const PriceTypes = require("../enums/priceTypes");
const RestaurantTypes = require("../enums/restaurantTypes");

const isValidStatus = (status) => {
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

const isValidPriceType = (priceType) => {
    switch (priceType) {
        case PriceTypes.Low:
            return true
        case PriceTypes.Medium:
            return true
        case PriceTypes.High:
            return true
        default: 
            return false
    }
}

const isValidRestaurantType = (restaurantType) => {
    switch (restaurantType) {
        case RestaurantTypes.Buffet:
            return true
        case RestaurantTypes.Fine_Dining:
            return true
        case RestaurantTypes.Fast_Food:
            return true
        default: 
            return false
    }
}

module.exports = {
    isValidStatus,
    isValidPriceType,
    isValidRestaurantType
}