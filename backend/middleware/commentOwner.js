const { Comments } = require('../config/db'); 

module.exports = async (req, res, next) => {
    const id = req.params.id;
    const commentsUserCheck  = await Comments.findByPk(id);
    
    if(!commentsUserCheck) {
        const message = `Vous, n'êtes pas autorisée`;
        return res.status(404).json({ message });
    };

    if(req.params.userId !== commentsUserCheck.user_id) {

        const message = `Vous n'avez pas l'authorisation pour cette action`;
        return res.status(403).json({ message, data: commentsUserCheck});
    }
    next();
};