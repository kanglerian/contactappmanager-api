import { Sequelize } from "sequelize";
import db from '../config/database.js'

const { DataTypes } = Sequelize;

const Sosmed = db.define('sosial_media',{
    nama: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});

export default Sosmed;