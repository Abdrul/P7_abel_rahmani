const { Posts } = require('../config/db');
const fs = require('fs');
const { Comments } = require('../config/db');



// Logique terminaison GET ALL


exports.getAllPosts = async (req, res) => {
    try {
        const postsUser = await Posts.findAll({order: [['createdAt', 'DESC']], include: ["comments", "likes", "user"]});
        const message = `Tous les posts on été récupérée`;
        res.json({ message, data: postsUser});
    } catch(error) {
        const message = `Les posts ne sont pas accessible, réessayez dans quelques instants`;
        res.status(500).json({ message, data: error});
    };
};

// exports.getAllPostsToModerate = async (req, res) => {
//     try {
//         const postsUser = await Posts.findAll({order: [['createdAt', 'DESC']], where: {canDisplay: false}});
//         const message = `Tous les posts on été récupérée`;
//         res.json({ message, data: postsUser});
//     } catch(error) {
//         const message = `Les posts ne sont pas accessible, réessayez dans quelques instants`;
//         res.status(500).json({ message, data: error});
//     };
// };


// Logique terminaison GET ONE 


exports.getOnePost = async (req, res) => {
    try {
        const postsUser = await Posts.findOne({where: {id: req.params.id} , include: ["comments"]});
        // const commsCount = await Comments.count({where : {post_id: postsUser.id}});
        // postsUser.commsCount = commsCount;
        const message = `Un post à été trouvé`;
        res.json({ message, data: postsUser });
    } catch(error) {
        const message = `Le post n'as pas pu être récupéré`;
        res.status(500).json({ message, data: error });
    };
};

// Logique terminaison POST 


exports.createPosts = async (req, res) => {
    try {
        req.body.user_id = req.params.userId;
        const postsObject = req.file ? 
        {
            text: req.body.text,
            user_id: req.body.user_id,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { text: req.body.text, user_id: req.body.user_id };

        const postsUser = await Posts.create(
            postsObject,
            // canDisplay: false,
            )
        const postsUserIncludeCommentsUser = await Posts.findOne({where: {id: postsUser.id} , include: ["comments", "user"]});
        const message = `Votre posts à été crée`;
        res.status(201).json({ message, data: postsUserIncludeCommentsUser });
    } catch(error) {
        const message = `Votre posts n'as pas pu être ajouté`;
        res.status(500).json({ message, data:error});
        console.log(error);
    };
};


// logiqque terminaison PUT


exports.updatePosts = async (req, res) => {

    try {
            const id = req.params.id;
            const postsFs = await Posts.findByPk(id);
            if(req.file && postsFs.imageUrl) {
                const filename = postsFs.imageUrl.split('/images')[1];
                console.log(filename);
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) res.status(500).json({ err });
                })
            }

            const postsObject = req.file ? 
            {
                text: req.body.text,
                user_id: req.body.user_id,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { text: req.body.text, user_id: req.body.user_id };

            const postsUpdate = await Posts.update(postsObject, { where: { id: id }});
            const message = `Le post à bien été modifié`;
            res.json({ message, data: postsUpdate });

    } catch(error) {
        const message = `Le post n'as pas pu être modifié`;
        res.status(500).json({ message, data: error });
    };
};

// exports.moderatePosts = async (req,res) => {

//     try {
//         const id = req.params.id;
//         const postsObject = 
//         { canDisplay: req.body.canDisplay};

//         const postsUpdate = await Posts.update(postsObject, { where: { id: id }});
//         const message = `Le post peut être affiché`;
//         res.json({ message, data: postsUpdate });

//     } catch(error) {
//         const message = `Le post ne peut pas être affiché`;
//         res.status(500).json({ message, data: error });
//     };

// }



//logique terminaison DELETE


exports.deletePosts = async (req, res) => {
    try {
            const id = req.params.id;
            const postsDelete  = await Posts.findByPk(id);

            if(req.file && postsDelete.imageUrl) {

                const filename = postsDelete.imageUrl.split('/images')[1];
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) res.status(500).json({ err });
                });
                
            }
            Posts.destroy({ where: { id: postsDelete.id }})
            const message = `Le posts avec l'identifiant n°${postsDelete.id} à bien été supprimé`;
            res.json({ message, data: postsDelete});

    } catch (error) {
        const message = `Le posts n'as pas pu être supprimé`;
        res.status(500).json({ message, data: error });
    };
}; 

exports.moderateDeletePosts = async (req, res) => {
    try {
            const id = req.params.id;
            const postsDelete  = await Posts.findByPk(id);

            if(req.file && postsDelete.imageUrl) {

                const filename = postsDelete.imageUrl.split('/images')[1];
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) res.status(500).json({ err });
                });
                
            }
            Posts.destroy({ where: { id: postsDelete.id }})
            const message = `Le posts avec l'identifiant n°${postsDelete.id} à bien été supprimé`;
            res.json({ message, data: postsDelete});

    } catch (error) {
        const message = `Le posts n'as pas pu être supprimé`;
        res.status(500).json({ message, data: error });
    };
}; 