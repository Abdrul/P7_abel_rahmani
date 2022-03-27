// require('dotenv').config();
const { User } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { EmptyResultError } = require('sequelize/types');


exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            admin: req.body.admin
        })
        .then(() => res.status(201).json({ message: "utilisateur cree" }))
        .catch(error => {
            const message = `La tentativee à echoué`;
            return res.status(400).json({ message, data: error })
        });
    })
    .catch(error => {
        const message = `L'inscription à echoué cote serveur`;
        return res.status(500).json({ message, data : error });
    });
};


exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email }})
    .then(user => {
        if(!user) {
            const message = `L'email est incorrect`;
            return res.status(401).json({ message });
        };
        bcrypt.compare(req.body.password, user.password)
        .then(isPasswordValid => {
            if(!isPasswordValid) {
                const message = `Le mot de passe est incorrect`;
                return res.status(401).json({ message });
            }

            const token = jwt.sign(
                { userId: user.id },
                `${process.env.SECRET}`,
                {expiresIn: '24h'}
            );
        
            // const cookieOptions = {
            //     expires: new Date(
            //         Date.now() + process.env.SECRET * 24 * 60 * 60 * 1000
            //         ),
            //         httpOnly: true
            //     };
            //     res.cookie('jwt', token, cookieOptions);

            const message = `Vous avez été connecté avec succès`;
            return res.json({ message, data: user, token })
            });
    })
    .catch(error => {
        const message = `L'utilisateur n'as pas pu etre connecte`;
        return res.status(500).json({ message, data: error});
    });
};


// logout

exports.logout = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email }});
        const token = jwt.sign(
            { userId: user.id },
            `${process.env.SECRET}`,
            { expiresIn: 1 }
            );

        const message = `Disconnected`;
        res.json({ message, data: user})

    } catch(error) {
        const message = `disconnect doesnt work`;
        res.status(500).json({ message, data: error});
    };
    // res.clearCookie("jwt");
    // res.status(200).json("Deconnected");
};

// res.cookie ("name", "value", {option like maxAge})
// res.redirect('/')