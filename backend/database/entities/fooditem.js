const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({ 
    name: "FoodItem",
    tableName: "fooditem",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        price:{
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
    }

})