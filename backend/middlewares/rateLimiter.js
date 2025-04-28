// /middlewares/rateLimiter.js

const rateLimiters = new Map();

// SOS Button Rate Limiter Middleware
const sosRateLimiter = (req, res, next) => {
    const studentId = req.student._id.toString();

    const currentTime = Date.now();
    const limitWindow = 5 * 60 * 1000; // 5 minutes
    const maxMessages = 3; // Max 3 SOS allowed in window

    if (!rateLimiters.has(studentId)) {
        rateLimiters.set(studentId, []);
    }

    const timestamps = rateLimiters.get(studentId).filter(ts => currentTime - ts < limitWindow);

    if (timestamps.length >= maxMessages) {
        return res.status(429).json({ message: 'Rate limit exceeded. Only 3 SOS messages allowed in 5 minutes.' });
    }

    timestamps.push(currentTime);
    rateLimiters.set(studentId, timestamps);

    next();
};

module.exports = { sosRateLimiter };
