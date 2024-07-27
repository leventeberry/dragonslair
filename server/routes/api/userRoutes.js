import express from 'express';
const routes = express.Router();

// TODO: Create Update Profile Route

routes.use('/update', async (req, res) => {
    res.json({message: "Update Profile"});
});

export default routes;