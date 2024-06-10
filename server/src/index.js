const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const routes = require('./routes');
const authTokenInterceptor = require('./middlewares/authTokenInterceptor');
const errorDisplay = "(Error en el index de la APP)";
require('dotenv').config();

/**
 * Función para iniciar el servidor Express.
 * Function to start the Express server.
 */
function startExpress() {
    try {
        const express = require('express');
        const cors = require('cors');
        const session = require('express-session');
        const fileUpload = require('express-fileupload');
        const app = express();
        const PORT = process.env.SERVER_PORT || 4001;
        const HOST = process.env.SERVER_HOST || 'localhost';
        const path = require('path');

        // Configuración de middleware
        // Middleware configuration
        app.use(fileUpload());
        app.use('/public', express.static(path.join(__dirname, '../public')));
        app.use(express.json(), express.urlencoded({ extended: true }), cors(), session({
            secret: 'tiendamysqlsession',
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 86400000 },
        }));

        // Uso de interceptores y rutas
        // Use of interceptors and routes
        app.use(authTokenInterceptor);
        app.use(routes);

        // Manejo de excepciones no capturadas
        // Handling uncaught exceptions
        process.on('uncaughtException', (error) => {
            console.error('Ha ocurrido un error inesperado:', error);
        });

        // Inicio del servidor
        // Server start
        app.listen(PORT, HOST, () => {
            console.log(`Servidor Express corriendo en http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error(`Error al iniciar Express ${errorDisplay}`, error);
    }
}


/**
 * Configuración de clustering para aprovechar todos los núcleos de la CPU.
 * Clustering configuration to take advantage of all CPU cores.
 */
if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Reinicio de trabajadores en caso de fallo
    // Worker restart in case of failure
    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
    });
} else {
    startExpress();
}
