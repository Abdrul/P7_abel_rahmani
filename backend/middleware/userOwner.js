const { User } = require('../config/db'); 

module.exports = async (req, res, next) => {
    const id = req.params.id;
    const postsUsersCheck  = await User.findByPk(id);
    
    if(!postsUsersCheck) {
        const message = `No such posts`;
        return res.status(404).json({ message });
    };

    if(req.params.userId !== postsUsersCheck.user_id) {

        const message = `Vous n'avez pas l'authorisation pour cette action`;
        return res.status(403).json({ message, data: postsUsersCheck});

    }
    next();
};