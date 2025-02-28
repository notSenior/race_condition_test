const {Umzug, SequelizeStorage} = require('umzug')
const sequelize = require('./src/config/database');

const umzug = new Umzug({
  migrations: {glob: 'src/migrations/*.js'},
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({sequelize}),
  logger: console,
})


umzug.up().then(_=>{
  console.log("Migration complete.")
  process.exit(1)
});