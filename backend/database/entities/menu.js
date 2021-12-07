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
    }

})