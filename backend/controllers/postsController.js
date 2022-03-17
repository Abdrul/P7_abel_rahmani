const { Posts } = require('../config/db');

// Logique terminaison GET ALL

exports.getAllPosts = (req, res) => {
    Posts.findAll()
    .then(posts => {
        const message = `Tous les posts on été récupérée`;
        res.json({ message, data: posts });
    })
    .catch(error => {
        const message = `Les posts ne sont pas accessible, réessayez dans quelques instants`;
        res.status(500).json({ message, data: error});
    });
};


// Logique terminaison GET ONE 

exports.getOnePost = (req, res) => {
    Posts.findByPk(req.params.id)
    .then(post => {
        const message = `Un post à été trouvé`;
        res.json({ message, data: post });
    })
    .catch(error => {
        const message = `Le post n'as pas pu être récupéré`;
        res.status(500).json({ message, data: error });
    });
};

// Logique terminaison POST 

exports.createPosts = (req, res) => {
    Posts.create(req.body) 
    .then(posts => {
        const message = `Votre posts à été crée`;
        res.json({ message, data: posts });
    })
    .catch(error => {
        const message = `Votre posts n'as pas pu être ajouté`;
        res.status(500).json({ message, data:error});
    });
};

// logiqque terminaison PUT

exports.updatePosts = (req, res) => {
    const id = req.params.id;
    Posts.update(req.body, { where: { id: id }})
    .then(posts => {
        const message = `Le post à bien été modiifé`;
        res.json({ message, data: posts });
    })
    .catch(error => {
        const message = `Le post n'as pas pu être modifié`;
        res.status(500).json({ message, data: error });
    });
};

//logique terminaison DELETE

exports.deletePosts = (req, res) => {
    Posts.findByPk(req.params.id)
    .then((posts) => {
        const postsDeleted = posts;
        return Posts.destroy({ where: { id: posts.id }})
        .then(() => {
            const message = `Le posts avec l'identifiant n°${postsDeleted.id} à bien été supprimé`;
            res.json({ message, data: postsDeleted});
        });
    })
    .catch(error => {
        const message = `Le posts n'as pas pu être supprimé`;
        res.status(500).json({ message, data: error });
    });
};