import Model from "../models/index.js";

export const getAllContacts = async (req, res) => {
    try {
        const biodata = await Model.Biodata.findAll();
        res.json(biodata);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getContact = async (req, res) => {
    try {
        const biodata = await Model.Biodata.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(biodata);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const addContact = async (req, res) => {
    try {
        await Model.Biodata.create(req.body);
        res.json({message: `Data ${req.body.nama_lengkap} telah tersimpan.`});
    } catch (error) {
        res.json({message: error.message});
    }
}

export const deleteContact = async (req, res) => {
    try {
        await Model.Biodata.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json({message: `Data dengan ID ${req.body.id} telah dihapus.`});
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getAllPlatforms = async (req, res) => {
    try {
        const platform = await Model.Sosmed.findAll();
        res.json(platform);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getPlatform = async (req, res) => {
    try {
        const cuan = await Model.Sosmed.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(cuan);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const addPlatform = async (req, res) => {
    try {
        await Model.Sosmed.create(req.body);
        res.json({message: `Data ${req.body.nama} telah tersimpan.`});
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getDetailContact = async (req, res) => {
    try {
        const contacts = await Model.Contacts.findAll({
            where: {
                id_biodata: req.params.id
            },
            include: [
                {model: Model.Biodata},
                {model: Model.Sosmed}
            ],
        });
        res.json(contacts);
    } catch (error) {
        res.json({message: error.message});
    }
}