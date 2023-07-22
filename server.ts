import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users';

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(`App listening on port: http://localhost:${port}/`)
});

app.get('/', (req, res) => {
    res.send("WORKING!");
})
