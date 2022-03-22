const { text } = require('express');
const { Posts } = require('../config/db');
const { Users } = require('../config/db');
const { Op } = require('sequelize');
const fs = require('fs');
// Logique terminaison GET ALL


exports.getAllPosts = async (req, res) => {
    try {
        const postsUser = await Posts.findAll();
        const message = `Tous les posts on été récupérée`;
        res.json({ message, data: postsUser });
    } catch(error) {
        const message = `Les posts ne sont pas accessible, réessayez dans quelques instants`;
        res.status(500).json({ message, data: error});
    };
};





// Logique terminaison GET ONE 


exports.getOnePost = async (req, res) => {
    try {
        const postsUser = await Posts.findByPk(req.params.id);
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
        const postsBody = req.body
        // let postsBody = {
        //     text: req.body.text,
        //     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        //     user_id: req.body.user_id
        // }
        const postsUser = await Posts.create({
            ...postsBody,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        const message = `Votre posts à été crée`;
        res.json({ message, data: postsUser });
    } catch(error) {
        const message = `Votre posts n'as pas pu être ajouté`;
        res.status(500).json({ message, data:error});
    };
};


// logiqque terminaison PUT


exports.updatePosts = async (req, res) => {
    try {
        if(req.file) {
            const postsUser = await Posts.findByPk(req.params.id);
            const filename = postsUser.imageUrl.split('images')[1];
            console.log(filename);
            fs.unlink(`images/${filename}`, (err) => {
                if (err) res.status(500).json({ err });
            })
        }

        const postsUsersCheck  = await Posts.findByPk(req.params.id)
        if(req.params.userId !== postsUsersCheck.user_id) {
            console.log("tu n'as pas le droit");
        } else {
            console.log("tu as le droit");
            const postsObject = req.file ? 
            {
                text: req.body.text,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { text: req.body.text };
            // const idUser = req.params.userId;
            const id = req.params.id;
            const postsUser = await Posts.update(postsObject, { where: { id: id/*, user_id: idUser*/ }});
            const message = `Le post à bien été modifié`;
            res.json({ message, data: postsUser });
        }
    } catch(error) {
        const message = `Le post n'as pas pu être modifié`;
        res.status(500).json({ message, data: error });
    };
    // where: { [Op.and]: [ { id: id}, {user_id: idUser} ] } }
};



//logique terminaison DELETE


exports.deletePosts = async (req, res) => {
    try {
        const postsUser = await Posts.findByPk(req.params.id);
            const filename = postsUser.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if (err) res.status(500).json({ err });
            })
            
            const postsUserDelete = Posts.destroy({where: { id: postsUser.id }})
            const message = `Le posts avec l'identifiant n°${postsUser.id} à bien été supprimé`;
            res.json({ message, data: postsUserDelete});
    } catch (error) {
        const message = `Le posts n'as pas pu être supprimé`;
        res.status(500).json({ message, data: error });
    }
}; 