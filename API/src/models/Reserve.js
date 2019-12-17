import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Reserve = sequelize.define('reserves', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    start : {
        type: Sequelize.DATE
    },
    title: {
        type: Sequelize.TEXT
    },
    hour: {
        type: Sequelize.TEXT
    },
    userid: {
        type: Sequelize.INTEGER
    }
},{
    timestamps: false
});

export default Reserve;