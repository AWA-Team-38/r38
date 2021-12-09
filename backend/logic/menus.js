const { createQueryBuilder } = require("typeorm")
const Category = require("../database/entities/category")
const Restaurant = require("../database/entities/restaurant")
const getConnection = require("../utils/getConnection")

const getMenu = async (restaurantId) => {
    // We are gonna get the menu from the db //*
    const connection = await getConnection
    const repository = connection.getRepository(Restaurant)
    const result = await repository.findOne({
        relations: ["menu"], where:{
            id:restaurantId
        }
    })
    return result.menu
}
const updateCategoryToMenu = async (menuId,category) => {
    const connection = await getConnection
    const categoryRepository = connection.getRepository(Category)
    const menuRepository = connection.getRepository(Menu)
    const menu = await menuRepository.findOne({
        id:menuId
    })
    const newCategory = await categoryRepository.save(category)
    await menuRepository.save({
        ...menu,categories:newCategory
    })
    return {
        message:"Sucess"
    }
} 

module.exports = {
    getMenu,
    updateCategoryToMenu
}