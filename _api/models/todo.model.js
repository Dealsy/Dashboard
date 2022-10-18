module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define('todo', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    input: {
      type: Sequelize.STRING,
    },
    priority: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
  })

  return Todo
}
