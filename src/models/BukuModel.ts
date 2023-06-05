import { Sequelize, DataTypes } from 'sequelize';
import db from '../database';
import Penerbit from './PenerbitModel';

const Buku = db.define('buku', {
    id: DataTypes.STRING,
    kategori: DataTypes.STRING,
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    stok: DataTypes.INTEGER,
    id_penerbit: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    freezeTableName: true,
});

Penerbit.hasMany(Buku, {
    foreignKey: 'id_penerbit',
});

Buku.belongsTo(Penerbit, {
    foreignKey: 'id_penerbit',
});

export default Buku;

(async()=>{
    await db.sync();
})();
