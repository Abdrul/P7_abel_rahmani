// Récuperer tout les user 
// Recuperer un user
// Update un user
// Delete user

const { User } = require('../config/db');

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

};


exports.deleteUser = async (req, res) => {

};


exports.followUser = async (req, res) => {

};

exports.unfollowUser = async (req, res) => {

};