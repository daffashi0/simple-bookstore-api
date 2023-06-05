import { Sequelize, DataTypes } from 'sequelize';
import db from '../database';
import Shift from './ShiftModel';

const Employee = db.define('employees', {
    name: DataTypes.STRING,
    department: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    shift_id: DataTypes.INTEGER,
}, {
    freezeTableName: true,
});

Employee.belongsTo(Shift, {
    foreignKey: 'shift_id',
});

Shift.hasMany(Employee, {
    foreignKey: 'shift_id',
});

export default Employee;

(async()=>{
    await db.sync();
})();
