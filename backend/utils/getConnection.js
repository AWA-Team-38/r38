const { createConnection } = require("typeorm")


const getConnection = createConnection({
    type: "postgres",
    host: "ec2-176-34-168-83.eu-west-1.compute.amazonaws.com",
    port: 5432,
    username: "wkdfjwriksrtyl",
    password: "162acae2aa4e438511b3407601ef98dfd4b321470afb2706a62f043c73f0f00b",
    database: "dal0k00sjsagb5",
    entities: ["database/entities/*.js"],
    synchronize: true,
    ssl: {rejectUnauthorized: false}
});



module.exports = getConnection;