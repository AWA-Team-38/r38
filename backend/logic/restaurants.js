const Menu = require("../database/entities/menu")
const Restaurant = require("../database/entities/restaurant")
const getConnection = require("../utils/getConnection")

const getRestaurants = async () => {
    // We are gonna get all the restaurants from the db //*
    const connection = await getConnection
    const repository = connection.getRepository(Restaurant)
    const restaurants = await repository.find()
    return restaurants
}
const addRestaurant = async (restaurant) => {
    const connection = await getConnection
    const repository = connection.getRepository(Restaurant)
    const newRestaurant = await repository.save({
        address: restaurant.address,
        image: restaurant.image,
        openinghours: restaurant.openinghours,
        pricetype: restaurant.pricetype,
        restauranttype: restaurant.restauranttype,
    })
    return {
        message: "Added to the database",
        data: newRestaurant
    }
}
const updateMenuOnRestaurant = async (restaurantId, menu) => {
    const connection = await getConnection
    const menuRepository = connection.getRepository(Menu)
    const restaurantRepository = connection.getRepository(Restaurant)
    const restaurant = await restaurantRepository.findOne({
        id: restaurantId
    })
    const newMenu = await menuRepository.save(menu)
    await restaurantRepository.save({
        ...restaurant, menu: newMenu
    })

    return {
        message: "Sucess"
    }
}

module.exports = {
    getRestaurants,
    addRestaurant,
    updateMenuOnRestaurant
}