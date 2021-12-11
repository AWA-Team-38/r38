const { EntitySchema } = require("typeorm");
const Menu = new EntitySchema({
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
        categories: {
            target: "Category",
            type: "one-to-many",
            inverseSide: "menu",
            cascade: true,
            joinTable: true,
            joinColumn: {
                name: "category_id",
                referencedColumnName: "id",
            }
        },
    }

})
module.exports = Menu