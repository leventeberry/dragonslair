import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
const routes = express.Router();

// TODO: Signup Route

routes.use('/register', (req, res) => {
    const { username, password } = req.body;
});


// TODO: Login Route

routes.use('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.status(500).json({ message: "Username or Password Incorrect!" });
        }

        const isPasswordValid = await User.checkPassword(password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: error })
        throw error;
    }

});


export default routes;

