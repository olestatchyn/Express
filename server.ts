import express from 'express';
import sequelize from './data-access/postgreDB';
import bodyParser from 'body-parser';
import logError from './errors/errorLogger';
import errorHandler from './errors/errorHandler';
import usersRoutes from './routes/users';
import groupRoutes from './routes/groups';
import userGroupRoutes from './routes/userGroups';

const app = express();
const port = 5000;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/groups', groupRoutes);
app.use('/userGroups', userGroupRoutes);

app.use(errorHandler);
app.use(logError);

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