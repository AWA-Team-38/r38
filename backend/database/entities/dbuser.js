const { Entity, BaseEntity, PrimaryGeneratedColumn, Column, EntitySchema } = require("typeorm");
const DBUser = new EntitySchema({
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
            unique: true,
        },
        password: {
            type: "varchar",
            nullable: false,
        },
        isadmin: {
            type:"bool",
            nullable: false,
        }
    },
    relations: {
        orders: {
            target: "Order",
            type: "one-to-many",
            cascade: true,
            joinTable: true,
            joinColumn: {
                name: "order_id",
                referencedColumnName: "id",
            }
        },
    }
})

module.exports = DBUser