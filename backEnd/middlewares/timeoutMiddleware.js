const sessionTimeoutMiddleware = (req, res, next) => {
    const sessionTimeout = 40 * 60 * 1000; 
    const now = Date.now();

    const lastActivity = req.cookies.last_activity 
        ? parseInt(req.cookies.last_activity) 
        : null;

    if (lastActivity && now - lastActivity > sessionTimeout) {
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        });
        res.clearCookie('last_activity', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        });

        return res.status(401).json({ redirect: '/login', message: "Session timed out. Please log in again." });
    }

    res.cookie('last_activity', now, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    next();
};

module.exports = {sessionTimeoutMiddleware};
