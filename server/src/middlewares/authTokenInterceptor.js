const tokenUtils = require('../utils/tokenUtils');
const errorDisplay = "(Error en authTokenInterceptor)";

/**
 * Middleware para interceptar y verificar el token de autenticación en las solicitudes HTTP.
 * Middleware to intercept and verify the authentication token in HTTP requests.
 * 
 * @param {Object} req - El objeto de solicitud HTTP. | The HTTP request object.
 * @param {Object} res - El objeto de respuesta HTTP. | The HTTP response object.
 * @param {Function} next - La función de callback para pasar al siguiente middleware. | The callback function to pass to the next middleware.
 */
const authTokenInterceptor = async (req, res, next) => {
    console.log(req.method, req.path);
    let authorization = req.headers['authorization'];
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        
        try{
            const decoded = await tokenUtils.verifyAuthToken(token);

            req.user = {userId: decoded.userId};
            next();
        }
        catch(error){
            console.error(`Error al verificar el token de autenticación ${errorDisplay}`, error);
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({
                    message: 'Token expired'
                });
            } else {
                res.status(403).json({
                    message: 'Invalid token'
                });
            }
            return;
        }
    } else {
        next();
    }
};

module.exports = authTokenInterceptor;
