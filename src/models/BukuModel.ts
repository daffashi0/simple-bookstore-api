import { Sequelize, DataTypes } from 'sequelize';
import db from '../database';
import Employee from './PenerbitModel';
import ShiftTime from './ShiftTimeModel';

const Attendance = db.define('attendance', {
    employee_id: DataTypes.STRING,
    shifttime_id: DataTypes.INTEGER,
    attendance_date: DataTypes.DATE,
    clock_in: DataTypes.TIME,
    clock_out: DataTypes.TIME,
    is_late: DataTypes.TINYINT,
    lat: DataTypes.DECIMAL,
    long: DataTypes.DECIMAL,
}, {
    freezeTableName: true,
});

Attendance.belongsTo(Employee, {
    foreignKey: 'employee_id',
});

Employee.hasMany(Attendance, {
    foreignKey: 'employee_id',
});

ShiftTime.hasMany(Attendance, {
    foreignKey: 'shifttime_id',
});

Attendance.belongsTo(ShiftTime, {
    foreignKey: 'shifttime_id',
});

export default Attendance;

(async()=>{
    await db.sync();
})();
