import {Client} from 'pg';

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5000,
    password: "12345",
    database: "homework"
})

export default client; 