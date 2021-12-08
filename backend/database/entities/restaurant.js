const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({ 
    name: "Restaurant",
    tableName: "restaurants",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        address: {
            type: "varchar",
            nullable: false,
        },
        openinghours: {
            type: "varchar",
            nullable: false,
        },
        image: {
            type: "varchar",
            nullable: true,
        },
        restauranttype: {
            type: "varchar",
            nullable: false,
        },
        pricetypes: {
            type: "varchar",
            nullable: false,
        },
    },
    relations: {
        menus: {
            target: "Menu",
            type: "one-to-one",
            cascade: true,
            joinTable: true,
            joinColumn: {
                name: "menu_id",
                referencedColumnName: "id",
            }
        },
        orders: {
            target: "Order",
            type: "one-to-many",
            cascade: true,
            joinTable: true,
            joinColumn: {
                name: "order_id",
                referencedColumnName: "id",
            }
        }
    }
})