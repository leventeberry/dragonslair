import express from 'express';
import { User } from '../../models/index.js';
import verifyJWT from '../../utils/auth.js';
const routes = express.Router();

// TODO: Create Update Profile Route
routes.patch('/update/:id', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updates = {};
        if (email) updates.email = email;
        if (password) updates.password = password;

        await user.update(updates);

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the user' });
        console.error(error);
    }
});

export default routes;