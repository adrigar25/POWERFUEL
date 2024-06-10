const { getUseServerCPU, getUseServerRAM, getUseServerInfo } = require('./controller'); //getDiskUsage

const express = require('express');

const router = express.Router();

router.route('/info')
    /**
     * @route POST /info
     * Endpoint para obtener la información de uso del servidor.
     * Endpoint to get the server usage information.
     * 
     * @returns {Object} 200 - La información de uso del servidor. | The server usage information.
     * @returns {Error} 500 - Error al obtener la información del servidor. | Error when getting the server information.
     */
    .post(async (req, res) => {
        try {
            const result = await getUseServerInfo();
            res.json(result);
        } catch (error) {
            res.status(500).json({message: "Ha ocurrido un error al obtener la información del servidor"});
        }
    });

router.route('/cpu')
    /**
     * @route POST /cpu
     * Endpoint para obtener el uso de la CPU del servidor.
     * Endpoint to get the server's CPU usage.
     * 
     * @returns {Object} 200 - El uso de la CPU del servidor. | The server's CPU usage.
     * @returns {Error} 500 - Error al obtener el uso de la CPU del servidor. | Error when getting the server's CPU usage.
     */
    .post(async (req, res) => {
        try {
            const result = await getUseServerCPU();
            res.json(result);
        } catch (error) {
            res.status(500).json({message: "Ha ocurrido un error al obtener el uso de CPU"});
        }
    });

router.route('/ram')
    /**
     * @route POST /ram
     * Endpoint para obtener el uso de la RAM del servidor.
     * Endpoint to get the server's RAM usage.
     * 
     * @returns {Object} 200 - El uso de la RAM del servidor. | The server's RAM usage.
     * @returns {Error} 500 - Error al obtener el uso de la RAM del servidor. | Error when getting the server's RAM usage.
     */
    .post(async (req, res) => {
        try {
            const result = await getUseServerRAM();
            res.json(result);
        } catch (error) {
            res.status(500).json({message: "Ha ocurrido un error al obtener el uso de memoria"});
        }
    });

router.route('/disk')
    /**
     * @route POST /disk
     * Endpoint para obtener el uso del disco del servidor.
     * Endpoint to get the server's disk usage.
     * 
     * @returns {Object} 200 - El uso del disco del servidor. | The server's disk usage.
     * @returns {Error} 500 - Error al obtener el uso del disco del servidor. | Error when getting the server's disk usage.
     */
    .post(async (req, res) => {
        try {
            const result = await getDiskUsage();
            res.json(result);
        } catch (error) {
            res.status(500).json({message: "Ha ocurrido un error al obtener el uso del disco"});
        }
    });

module.exports = router;