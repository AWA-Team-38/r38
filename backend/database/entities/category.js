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
            cascade: true,
            joinTable: true,
            joinColumn: {
                name: "food_item_id",
                referencedColumnName: "id",
            }
        },
    }

})
module.exports = Category