import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
    try {
        const token = await req.cookies.token || req.headers.authorization?.split(' ')[1];
        console.log("chl raha1");

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized User - No token' });
        }
        console.log("chl raha1");
        const isBlackListed = await redisClient.get(token);
        if (isBlackListed) {
            res.clearCookie('token'); // safer than setting empty string
            return res.status(401).json({ error: 'Token has been blacklisted' });
        }
        console.log("chl raha3");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("chl raha4");

        req.user = decoded;
        console.log("chl raha5");

        next();

    } catch (error) {
        console.error('JWT verification failed:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Malformed token' });
        }

        return res.status(401).json({ error: 'Unauthorized user' });
    }
};
