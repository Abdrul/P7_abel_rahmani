const { Comments } = require('../config/db');
const { Posts } = require('../config/db');

// Logique terminaison GET ALL


exports.getAllComments = async (req, res) => {
    try {
        const commentsUser = await Comments.findAll({include: ['post']});
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
        const commentsUser = await Comments.findOne({include: [{model: Posts, as:'post'}], where:{id: req.params.id}});
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
        const commentsObject = req.file ? 
        {
            text: req.body.text,
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { text: req.body.text, user_id: req.body.user_id, post_id: req.body.post_id };

        const commentsUser = await Comments.create({
            ...commentsObject,
        });
        const message = `Votre posts à été crée`;
        res.status(201).json({ message, data: commentsUser });
    } catch(error) {
        const message = `Votre posts n'as pas pu être ajouté`;
        res.status(500).json({ message, data:error});
    };
};


// logiqque terminaison PUT


exports.updateComments = async (req, res) => {

    try {
        const id = req.params.id;
        const commentsFs = await Comments.findByPk(id);
        if(req.file && commentsFs.imageUrl) {
            const filename = commentsFs.imageUrl.split('/images')[1];
            console.log(filename);
            fs.unlink(`images/${filename}`, (err) => {
                if (err) res.status(500).json({ err });
            })
        }

        const commentsObject = req.file ? 
        {
            text: req.body.text,
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { text: req.body.text, user_id: req.body.user_id, post_id: req.body.post_id };

        const commentsUpdate = await Posts.update(commentsObject, { where: { id: id }});
        const message = `Le post à bien été modifié`;
        res.json({ message, data: commentsUpdate });

    } catch(error) {
        const message = `Le post n'as pas pu être modifié`;
        console.log(error)
        res.status(500).json({ message, data: error });
    };
};



//logique terminaison DELETE


exports.deleteComments = async (req, res) => {

    try {
        const id = req.params.id;
        const commentsDelete  = await Comments.findByPk(id);

        if(req.file && commentsDelete.imageUrl) {

            const filename = commentsDelete.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if (err) res.status(500).json({ err });
            });
            
        }
        Comments.destroy({ where: { id: commentsDelete.id }})
        const message = `Le posts avec l'identifiant n°${commentsDelete.id} à bien été supprimé`;
        res.json({ message, data: commentsDelete});

    } catch (error) {
        const message = `Le posts n'as pas pu être supprimé`;
        res.status(500).json({ message, data: error });
    };
}; 