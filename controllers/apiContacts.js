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

export const updateContact = async (req, res) => {
    try {
        await Model.Biodata.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({message: `Data telah diupdate.`});
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
