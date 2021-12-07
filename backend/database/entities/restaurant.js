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
    }
})