const { EntitySchema } = require("typeorm");
const Order = new EntitySchema({ 
    name: "Order",
    tableName: "orders",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        status: {
            type: "varchar",
            nullable: false,
        },
        estimation: {
            type: "varchar",
            nullable: false,
        },
    },
    relations:{
    restaurant: {
        target: "Restaurant",
        type: "many-to-one",
        cascade: true,
        joinTable: true,
        joinColumn: {
            name: "restaurant_id",
            referencedColumnName: "id"
        }
    }}
    
})

module.exports = Order