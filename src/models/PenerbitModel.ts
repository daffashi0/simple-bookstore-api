import { Sequelize, DataTypes } from 'sequelize';
import db from '../database';

const Penerbit = db.define('penerbit', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    kota: DataTypes.STRING,
    telpon: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    freezeTableName: true,
});

export default Penerbit;

(async()=>{
    await db.sync();
})();
