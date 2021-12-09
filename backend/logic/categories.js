const { createQueryBuilder } = require("typeorm")
const Category = require("../database/entities/category")
const FoodItem = require("../database/entities/fooditem")
const Restaurant = require("../database/entities/restaurant")
const getConnection = require("../utils/getConnection")

const updateProductToCategory = async (categoryId,product) => {
    const connection = await getConnection
    const foodItemRepository = connection.getRepository(FoodItem)
    const categoryRepository = connection.getRepository(Category)
    const category = await categoryRepository.findOne({
        id:categoryId
    })
    const newFoodItem = await foodItemRepository.save(product)
    await categoryRepository.save({
        ...category,fooditems:newFoodItem
    })
    return {
        message:"Sucess"
    }
} 

module.exports = {
    updateProductToCategory
}