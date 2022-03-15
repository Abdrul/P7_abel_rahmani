const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'LEMOTDEPASSE', (error, decodedToken) => {
        if(error) {
            const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource`;
            return res.status(401).json({ message, data: error});
        }
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            const message = `L'identifiant de l'utilisateur est invalide`;
            res.status(401).json({ message });
        } else {
            next();
        };
    });

}