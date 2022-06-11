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
        const biodata = await Model.Biodata.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(biodata);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getAllPlatform = async (req, res) => {
    try {
        const platform = await Model.Sosmed.findAll();
        res.json(platform);
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