const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');
const errorDisplay = "(Error en el controlador de Server)";

// Obtener la cantidad de CPUs disponibles en el sistema
const numCPUs = os.cpus().length;

// Función para calcular el uso de la CPU
function getCpuInfo() {
  const cpus = os.cpus();
  let totalIdle = 0, totalTick = 0;

  cpus.forEach(cpu => {
      for (let type in cpu.times) {
          totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
  });

  return { idle: totalIdle, total: totalTick };
}

// Variables para almacenar las estadísticas anteriores de la CPU
let startMeasure = getCpuInfo();

function getUseServerCPU() {
    const endMeasure = getCpuInfo();

    const idleDifference = endMeasure.idle - startMeasure.idle;
    const totalDifference = endMeasure.total - startMeasure.total;

    const percentageCpu = 100 - ~~(100 * idleDifference / totalDifference);

    // Actualizar las estadísticas anteriores de la CPU
    startMeasure = endMeasure;

    return percentageCpu.toFixed(2);
}

/**
 * Función para obtener el uso de la RAM del servidor.
 * Function to get the server's RAM usage.
 * 
 * @returns {Promise} - Promesa que resuelve al obtener el uso de la RAM del servidor en porcentaje. | Promise that resolves when getting the server's RAM usage in percentage.
 * @throws {Error} - Error al intentar obtener el uso de la RAM del servidor. | Error when trying to get the server's RAM usage.
 */
const getUseServerRAM = async () => {
  try {
      const totalMem = os.totalmem();
      const freeMem = os.freemem();

      const usedMem = totalMem - freeMem;
      const totalUsage = (usedMem / totalMem) * 100;

      return totalUsage.toFixed(2);
  } catch (error) {
      console.log(`Error al intentar obtener el uso de la RAM del servidor ${errorDisplay}`, error);
  }
};

/**
 * Función para obtener el uso del disco del servidor.
 * Function to get the server's disk usage.
 * 
 * @returns {Promise} - Promesa que resuelve al obtener el uso del disco del servidor en porcentaje. | Promise that resolves when getting the server's disk usage in percentage.
 * @throws {Error} - Error al intentar obtener el uso del disco del servidor. | Error when trying to get the server's disk usage.
 */
const getDiskUsage = async () => {
  const diskInfo = fs.statSync('/');

  const totalSpace = diskInfo.blocks * diskInfo.blksize;
  const freeSpace = diskInfo.blocks * diskInfo.blksize - diskInfo.size;

  const freeSpacePercentage = (freeSpace / totalSpace) * 10;

  return freeSpacePercentage.toFixed(2);
}

/**
 * Función para obtener la información de uso del servidor.
 * Function to get the server usage information.
 * 
 * @returns {Promise} - Promesa que resuelve al obtener la información de uso del servidor. | Promise that resolves when getting the server usage information.
 * @throws {Error} - Error al intentar obtener la información del servidor. | Error when trying to get the server information.
 */
const getUseServerInfo = async () => {
  try {
      const cpuUsage = await getUseServerCPU();
      const ramUsage = await getUseServerRAM();
      const diskUsage = await getDiskUsage();

      return {
          cpu: cpuUsage,
          ram: ramUsage,
          disk: diskUsage,
      }
  } catch (error) {
      console.log(`Error al intentar obtener la información del servidor ${errorDisplay}`, error);
  }
};

module.exports = {
  getUseServerInfo,
  getUseServerCPU,
  getUseServerRAM,
  getDiskUsage,
  
}