const { createQueryBuilder } = require("typeorm")
const Category = require("../database/entities/category")
const Menu = require("../database/entities/menu")
const Restaurant = require("../database/entities/restaurant")
const getConnection = require("../utils/getConnection")

const getMenu = async (restaurantId) => {
    // We are gonna get the menu from the db //*
    const connection = await getConnection
    const repository = connection.getRepository(Restaurant)
    const results = await repository.createQueryBuilder("r").innerJoinAndSelect("r.menu", "rm").leftJoinAndSelect("rm.categories", "rc").leftJoinAndSelect("rc.fooditems", "rf").where("r.id = :id", { id: 1 }).getOneOrFail()
    /* const result = await repository.findOne({
         relations: ["menu"], where:{
             id:restaurantId
         }
     }) */
    return results
}
const updateCategoryToMenu = async (menuId, category) => {
    const connection = await getConnection
    const categoryRepository = connection.getRepository(Category)
    const menuRepository = connection.getRepository(Menu)
    const menu = await menuRepository.findOne({
        where:{
            id:menuId
        },
        relations: ["categories"]
    })
    const newCategory = await categoryRepository.save(category)
    await menuRepository.save({
        ...menu, categories: [...menu.categories, newCategory]
    })
    return {
        message: "Sucess"
    }
}

module.exports = {
    getMenu,
    updateCategoryToMenu
}