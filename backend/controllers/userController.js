// Récuperer tout les user 
// Recuperer un user
// Update un user
// Delete user

const { User } = require('../config/db');
const fs = require('fs');

exports.allUsers = async (req, res) => {
    try {
        const user = await User.findAll({
            attributes : { exclude: ['password'] }
        });
        const message = `Tous les users on été récupérée`;
        res.json({ message, data: user });
    } catch(error) {
        const message = `Les users ne sont pas accessible, réessayez dans quelques instants`;
        res.status(500).json({ message, data: error});
    };
};

exports.oneUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes : { exclude: ['password'] }
        });
        const message = `Un user à été trouvé`;
        res.json({ message, data: user });
    } catch(error) {
        const message = `Le user n'as pas pu être récupéré`;
        res.status(500).json({ message, data: error });
    };
};

exports.updateUser = async (req, res) => {
    // try {
    //     const id = req.params.id;
    //     const user = await User.update(req.body, { where: { id: id }});
    //     const message = `Le user à bien été modifié`;
    //     res.json({ message, data: user });

    // } catch(error) {
    //     const message = `Le user n'as pas pu être modifié`;
    //     res.status(500).json({ message, data: error });
    // };

    try {
        const id = req.params.id;
        const userFs  = await User.findByPk(id);
        if(req.file) {
            const filename = userFs.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if (err) res.status(500).json({ err });
            })
        };

        const userObject = req.file ? 
        {
            email: req.body.email,
            firstname: req.body.firstname,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};


        const userUpdate = await User.update(userObject, { where: { id: id }});
        const message = `Le post à bien été modifié`;
        res.json({ message, data: userUpdate });

} catch(error) {
    const message = `Le post n'as pas pu être modifié`;
    res.status(500).json({ message, data: error });
};
};


exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userDelete  = await User.findByPk(id);
        User.destroy({where: { id: userDelete.id }})
        const message = `Le user avec l'identifiant n°${userDelete.id} à bien été supprimé`;
        res.json({ message, data: User});

    } catch (error) {
        const message = `Le user n'as pas pu être supprimé`;
        res.status(500).json({ message, data: error });
    }
};


exports.followUser = async (req, res) => {

};

exports.unfollowUser = async (req, res) => {

};