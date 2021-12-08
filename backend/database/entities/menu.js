const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Menu",
    tableName: "menus",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            nullable: false,
        },
        description: {
            type: "varchar",
            nullable: true,
        },
    },
    relations: {
        fooditems: {
            target: "FoodItem",
            type: "one-to-many",
            cascade: true,
            joinTable: true,
            joinColumn: {
                name: "food_item_id",
                referencedColumnName: "id",
            }
        },
    }

})