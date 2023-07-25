import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users';
import sequelize from './data-access/postgreDB'

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/users', usersRoutes);

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})();


app.listen(port, () => {
    console.log(`App listening on port: http://localhost:${port}/`);
});

app.get('/', (req, res) => {
    res.send("WORKING!");
});

