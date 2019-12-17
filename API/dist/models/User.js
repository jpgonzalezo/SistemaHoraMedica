import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Reserve from './Reserve';
const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fullname: {
    type: Sequelize.TEXT
  },
  email: {
    type: Sequelize.TEXT
  }
}, {
  timestamps: false
});
User.hasMany(Reserve, {
  foreingKey: 'userid',
  sourceKey: 'id'
});
Reserve.belongsTo(User, {
  foreingKey: 'userid',
  sourceKey: 'id'
});
export default User;