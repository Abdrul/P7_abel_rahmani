const { User } = require('../config/db'); 

module.exports = async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if(user && user.admin) {
        next()
    } else {
        const message = `Vous n'êtes pas autorisée`
        res.status(403).json({message})
    };
};