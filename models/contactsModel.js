import { Sequelize } from "sequelize";
import sequelize from '../config/database.js';

const { DataTypes } = Sequelize;

const Contacts = sequelize.define('detail_biodata',{
    id_biodata: {
        type: DataTypes.INTEGER
    },
    id_sosial_media: {
        type: DataTypes.INTEGER
    },
    url: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.BOOLEAN
    }
},{
    freezeTableName: true,
    timestamps: false
});

export default Contacts;