/**
 * Wraps asynchronous Express route/controller handlers to automatically
 * forward any rejected promises or thrown errors to the next middleware (error handler).
 *
 * @param {Function} fn - Asynchronous Express middleware/controller function
 * @returns {Function} Express middleware function (req, res, next)
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
