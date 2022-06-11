import Contacts from "./contactsModel.js";
import Biodata from "./biodataModel.js";
import Sosmed from "./sosmedModel.js"
const Model = {};

Model.Contacts = Contacts;
Model.Biodata = Biodata;
Model.Sosmed = Sosmed;

Biodata.hasMany(Contacts, {foreignKey: 'id_biodata'});
Contacts.belongsTo(Biodata, {foreignKey: 'id_biodata'});

Sosmed.hasMany(Contacts, {foreignKey: 'id_sosial_media'});
Contacts.belongsTo(Sosmed, {foreignKey: 'id_sosial_media'});

export default Model;