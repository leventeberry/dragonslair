import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
const routes = express.Router();

routes.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (username && email && password) {
            const user = await User.create({username: username, email: email, password: password});
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(403).json({message: "Please complete all fields before submitting"});
        }
    } catch (error) {
        res.status(500).json({message: error});
    }
});


routes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.status(401).json({ message: "Username or Password Incorrect!" });
        }

        const isPasswordValid = await user.checkPassword(password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        } else {
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }

    } catch (error) {
        res.status(500).json({ message: error });
        throw error;
    }

});


export default routes;

