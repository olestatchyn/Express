// import sequelize from '../data-access/postgreDB'; // Update the path to your sequelize instance file

// beforeAll(async () => {
//   await sequelize.sync(); // Sync the models and create tables
// });

// beforeEach(async () => {
//   // Clear data from all tables before each test
//   const models = Object.values(sequelize.models);
//   for (const model of models) {
//     await model.destroy({ where: {} });
//   }
// });

// afterAll(async () => {
//   await sequelize.close(); // Close the sequelize connection
// });

// beforeAll(async () => {
//   process.env.jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvbiIsImlhdCI6MTY5MDk5OTc2OSwiZXhwIjoxNjkxMDAzMzY5fQ.YYYyXSb1fKMth5BW3kZknPji5601ItpXN0nKNu37Nh8";
// });