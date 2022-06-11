import { Sequelize } from "sequelize";

const sequelize = new Sequelize('contactapp','root','',{
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

try {
    sequelize.authenticate();
    console.log(`Database terhubung.`);
} catch (error) {
    console.error(`Database tidak terhubung.`);
}

export default sequelize;