const { Likes } = require('../config/db');


exports.like = async (req, res) => {

    try {
        req.body.user_id = req.params.userId;
        const like = await Likes.findOne({ where: {user_id: req.body.user_id, post_id: req.body.post_id}});
        if(like) {
            const message = `Vous avez déjà like le post`;
            res.status(422).json({ message });
        } else {
            const createdLike = await Likes.create({
                post_id: req.body.post_id,
                user_id: req.body.user_id
            });
            const message = `Votre like à été ajouté`;
            res.status(201).json({ message, data: createdLike });
        }

    } catch (error) {   
        const message = `Votre like n'as pas pu être ajouté`;
        res.status(500).json({ message, data:error});
    }

};

exports.unlike = async (req, res) => {
    try {
        req.body.user_id = req.params.userId;
        const like = await Likes.findOne({ where: {user_id: req.body.user_id, post_id: req.body.post_id}});

        if(like) {
            Likes.destroy({ where: { user_id: req.body.user_id, post_id: req.body.post_id}})
            const message = `Le like avec l'identifiant n°${like.id} à bien été supprimé`;
            res.json({ message, data: like});
        } else {
            const message = `Vous n'avez pas de like pour ce post`;
            res.status(422).json({ message });
        }



    } catch (error) {   
        const message = `Votre like n'as pas pu être ajouté`;
        res.status(500).json({ message, data:error});
    }
};