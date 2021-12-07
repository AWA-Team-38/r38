const { Entity, BaseEntity, PrimaryGeneratedColumn, Column, EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "DBUser",
    tableName: "dbusers",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        username: {
            type: "varchar",
            nullable: false,
        },
        password: {
            type: "varchar",
            nullable: false,
        },
    }
})