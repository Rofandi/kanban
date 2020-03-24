require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "Kanban",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "dialect": "postgres",
    "url": process.env.DATABASE_URL
  }
}
