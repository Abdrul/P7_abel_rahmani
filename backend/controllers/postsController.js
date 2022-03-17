const { Posts } = require('../config/db');

// Logique terminaison GET ALL


exports.getAllPosts = async (req, res) => {
    try {
        const postsUser = await Posts.findAll();
        const message = `Tous les posts on été récupérée`;
        res.json({ message, data: postsUser });
    } catch(error) {
        const message = `Les posts ne sont pas accessible, réessayez dans quelques instants`;
        res.status(500).json({ message, data: error});
    }
}





// Logique terminaison GET ONE 


exports.getOnePost = async (req, res) => {
    try {
        const postsUser = await Posts.findByPk(req.params.id);
        const message = `Un post à été trouvé`;
        res.json({ message, data: postsUser });
    } catch(error) {
        const message = `Le post n'as pas pu être récupéré`;
        res.status(500).json({ message, data: error });
    }
}

// Logique terminaison POST 


exports.createPosts = async (req, res) => {
    try {
        const postsUser = await Posts.create(req.body);
        const message = `Votre posts à été crée`;
        res.json({ message, data: postsUser });
    } catch(error) {
        const message = `Votre posts n'as pas pu être ajouté`;
        res.status(500).json({ message, data:error});
    }
}


// logiqque terminaison PUT


exports.updatePosts = async (req, res) => {
    try {
        const id = req.params.id
        const postsUser = await Posts.update(req.body, { where: { id: id }});
        const message = `Le post à bien été modiifé`;
        res.json({ message, data: postsUser });
    } catch(error) {
        const message = `Le post n'as pas pu être modifié`;
        res.status(500).json({ message, data: error });
    }
}



//logique terminaison DELETE


exports.deletePosts = async (req, res) => {
    try {
        const postsUser = await Posts.findByPk(req.params.id);
        const postsDeleted = postsUser;
        return Posts.destroy({ where: { id: postsUser.id }})
        .then(() => {
            const message = `Le posts avec l'identifiant n°${postsDeleted.id} à bien été supprimé`;
            res.json({ message, data: postsDeleted});
        });
    } catch(error) {
        const message = `Le posts n'as pas pu être supprimé`;
        res.status(500).json({ message, data: error });
    }
}