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