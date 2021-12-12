const { EntitySchema } = require("typeorm");
const FoodItem = new EntitySchema({
    name: "FoodItem",
    tableName: "fooditem",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        price: {
            type: "int",
            nullable: false,
        },
        name: {
            type: "varchar",
            nullable: false,
        },
        description: {
            type: "varchar",
            nullable: true,
        },
        image: {
            type: "varchar",
            nullable: true,
        },
    },
    relations: {
        category: {
            target: "Category",
            type: "many-to-one",
            inverseSide: "fooditems",
            joinTable: true,
            joinColumn: {
                name: "category_id",
                referencedColumnName: "id",
            }
        },
        orders: {
            target: "Order",
            type: "many-to-many",
            cascade: true,
            joinTable: {
                name: "orders_fooditems",
                joinColumn: {
                    name: "fooditem_id",
                },
                inverseJoinColumn: {
                    name: "order_id",
                }
            },
            inverseSide: "Order"
        }
    }


})

module.exports = FoodItem