import Model from "../models/index.js";

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

export const deletePlatform = async (req, res) => {
    try {
        await Model.Sosmed.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json({message: `Data dengan ID ${req.body.id} telah dihapus.`});
    } catch (error) {
        res.json({message: error.message});
    }
}