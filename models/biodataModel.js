import { Sequelize } from "sequelize";
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Biodata = db.define('biodata',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama_lengkap: {
        type: DataTypes.STRING
    },
    nohp: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});

export default Biodata;