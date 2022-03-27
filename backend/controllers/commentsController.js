const { Comments } = require('../config/db');

// Logique terminaison GET ALL


exports.getAllComments = async (req, res) => {
    try {
        const commentsUser = await Comments.findAll();
        const message = `Tous les commentaires on été récupérée`;
        res.json({ message, data: commentsUser });
    } catch(error) {
        const message = `Les commentaires ne sont pas accessible, réessayez dans quelques instants`;
        res.status(500).json({ message, data: error});
    };
};


// Logique terminaison GET ONE 


exports.getOneComment = async (req, res) => {
    try {
        const commentsUser = await Comments.findByPk(req.params.id);
        const message = `Un commentaire à été trouvé`;
        res.json({ message, data: commentsUser });
    } catch(error) {
        const message = `Le commentaire n'as pas pu être récupéré`;
        res.status(500).json({ message, data: error });
    };
};

// Logique terminaison POST 


exports.createComments = async (req, res) => {
    try {
        req.body.user_id = req.params.userId; 
        // req.body.post_id = req.params.id;

        const commentsBody = req.body
        const commentsUser = await Comments.create({
            ...commentsBody,
        });
        const message = `Votre commentaire à été crée`;
        res.status(201).json({ message, data: commentsUser });
    } catch(error) {
        const message = `Votre commentaire n'as pas pu être ajouté`;
        res.status(500).json({ message, data:error});
    };
};


// logiqque terminaison PUT


exports.updateComments = async (req, res) => {
    try {
        const id = req.params.id;
        const commentsUser = await Comments.update(req.body, { where: { id: id }});
        const message = `Le commentaire à bien été modifié`;
        res.json({ message, data: commentsUser });

    } catch(error) {
        const message = `Le commentaire n'as pas pu être modifié`;
        res.status(500).json({ message, data: error });
    };
};



//logique terminaison DELETE


exports.deleteComments = async (req, res) => {
    try {
        const id = req.params.id;
        const commentDelete  = await Posts.findByPk(id);
        Comments.destroy({where: { id: commentDelete.id }})
        const message = `Le commentaire avec l'identifiant n°${commentDelete.id} à bien été supprimé`;
        res.json({ message, data: Comments});

    } catch (error) {
        const message = `Le posts n'as pas pu être supprimé`;
        res.status(500).json({ message, data: error });
    }
}; 