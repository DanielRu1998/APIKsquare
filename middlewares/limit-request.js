const rateLimit = require('express-rate-limit');

const limitRateRequest = rateLimit({
        max: 5,
        windowMs: 1 * 60 * 1000 // 1 minute blocked
});

module.exports = {
    limitRateRequest
};
