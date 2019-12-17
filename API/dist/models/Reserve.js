import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
const Reserve = sequelize.define('reserves', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  date: {
    type: Sequelize.DATE
  },
  userid: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});
export default Reserve;