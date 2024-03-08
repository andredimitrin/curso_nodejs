const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: "localhost",
    dialect:'mysql'
});


try {
    sequelize.authenticate();
    console.log('Conectado com sucesso o Sequelize!');
    
} catch (error) {
    console.log('Não foi possivel conectar: ', error);
}

module.exports = sequelize