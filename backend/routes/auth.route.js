import express from 'express';
import passport from 'passport';
import protectRoute from '../middleware/protectRoute.js';
import { signup, login, logout, getMe, setPassword } from '../controllers/auth.controller.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/set-password', protectRoute, setPassword);
router.get('/getMe', protectRoute, getMe);

router.get('/google', passport.authenticate('google', { scope: ['profile','email'], prompt: 'select_account' }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: true }),
  (req, res) => res.redirect(`${process.env.CLIENT_URL}/home`)
);

export default router;
