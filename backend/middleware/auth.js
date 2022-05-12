require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../config/db'); 

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);

    if (!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
        return res.status(401).json({ message });
    }

    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.SECRET}`, (error, decodedToken) => {
        if(error) {
            const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource`;
            return res.status(401).json({ message, data: error});
        }
        const userId = decodedToken.userId;
        // console.log(userId);
        if(req.body.userId && req.body.userId !== userId) {
            const message = `L'identifiant de l'utilisateur est invalide`;
            res.status(401).json({ message });
        } else {
            req.params.userId = userId;
            next();
        };
    });

};


