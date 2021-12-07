const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({ 
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
            type: "date",
            nullable: false,
        },
    }
})