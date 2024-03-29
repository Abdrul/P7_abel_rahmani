const { Posts } = require('../config/db'); 

module.exports = async (req, res, next) => {
    const id = req.params.id;
    const postsUsersCheck  = await Posts.findByPk(id);
    
    if(!postsUsersCheck) {
        const message = `Vous, n'êtes pas autorisée`;
        return res.status(404).json({ message });
    };

    if(req.params.userId !== postsUsersCheck.user_id) {

        const message = `Vous n'avez pas l'authorisation pour cette action`;
        return res.status(403).json({ message, data: postsUsersCheck});

    }
    next();
};