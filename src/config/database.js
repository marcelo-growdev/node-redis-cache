require('dotenv').config();

module.exports = {
  dialect: process.env.DB_DIALECT,
  storage: 'src/database/database.sqlite',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
