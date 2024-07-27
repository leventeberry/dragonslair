import express from 'express';
import { User } from '../../models/index.js';
import verifyJWT from '../../utils/auth.js';
const routes = express.Router();

// TODO: Create Update Profile Route
routes.patch('/update/:id', async (req, res) => {
    try {
        const { id, email, password } = req.body;
        const user = await User.findByPk(id);
        if (email) {
            await user.update({email: email});
        }
        if (password) {
            await user.update({password: password});
        }
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});

export default routes;