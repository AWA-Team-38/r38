const { EntitySchema } = require("typeorm");
const Category = new EntitySchema({
    name: "Category",
    tableName: "categories",
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
    },
    relations: {
        fooditems: {
            target: "FoodItem",
            type: "one-to-many",
            inverseSide:"category",
            cascade: true,
            joinTable: true,
            joinColumn: {
                name: "food_item_id",
                referencedColumnName: "id",
            }
        },
        menu: {
            target: "Menu",
            type: "many-to-one",
            inverseSide:"categories",
            joinTable: true,
            joinColumn: {
                name: "menu_id",
                referencedColumnName: "id"
            }
        }
    }   

})
module.exports = Category