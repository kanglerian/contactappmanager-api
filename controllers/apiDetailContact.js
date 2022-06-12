import Model from "../models/index.js";

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

export const addDetailContact = async (req, res) => {
    try {
        await Model.Contacts.create(req.body);
        res.json(`Data detail contact telah ditambahkan.`);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const deleteDetailContact = async (req, res) => {
    try {
        await Model.Contacts.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json(`Data detail kontak telah dihapus.`);
    } catch (error) {
        res.json({message: error.message});
    }
}