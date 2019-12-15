import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'postgres',
    'nicedev',
    'nice',
    {
        host: 'localhost',
        port: 5332,
        dialect: 'postgres',
        pool:{
            max:5,
            min:0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)