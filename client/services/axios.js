import axios from 'axios';
import toastr from 'toastr';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api`,
    timeout: 30000,
});

/**
 * Función para interceptar las solicitudes y añadir el token de autorización en los encabezados.
 * Function to intercept requests and add the authorization token in the headers.
 * 
 * @param {Object} config - La configuración de la solicitud. | The request configuration.
 * 
 * @returns {Object} - La configuración de la solicitud con el token de autorización añadido en los encabezados, si el token existe. | The request configuration with the authorization token added in the headers, if the token exists.
 * @throws {Error} - Error al intentar interceptar la solicitud y añadir el token de autorización. | Error when trying to intercept the request and add the authorization token.
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * Función para interceptar las respuestas y manejar los errores de autorización.
 * Function to intercept responses and handle authorization errors.
 * 
 * @param {Object} response - La respuesta de la solicitud. | The request's response.
 * 
 * @returns {Object} - La respuesta de la solicitud si no hay errores de autorización. | The request's response if there are no authorization errors.
 * @throws {Error} - Error al intentar interceptar la respuesta y manejar los errores de autorización. | Error when trying to intercept the response and handle authorization errors.
 */
api.interceptors.response.use(response => {
    return response;
}, async error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403) && localStorage.getItem('auth_token')) {
        toastr.error(error);
        localStorage.removeItem('auth_token');
        window.location.reload();
    }
    return Promise.reject(error);
});

/**
 * Función para interceptar las respuestas y manejar los mensajes de éxito y error.
 * Function to intercept responses and handle success and error messages.
 * 
 * @param {Object} response - La respuesta de la solicitud. | The request's response.
 * 
 * @returns {Object} - La respuesta de la solicitud si contiene un mensaje de éxito. | The request's response if it contains a success message.
 * @throws {Error} - Error al intentar interceptar la respuesta y manejar los mensajes de error. | Error when trying to intercept the response and handle error messages.
 */
api.interceptors.response.use((response) => {
    if (response && response.data && response.data.message)
        toastr.success(response.data.message);
    
    return response;

}, (error) => {
    if(error && error.response && error.response.data && error.response.data.message)
        toastr.error(error.response.data.message);
    return Promise.reject(error);
});

/**
 * Función para añadir el token de autorización a los encabezados de la solicitud.
 * Function to add the authorization token to the request headers.
 * 
 * @param {Object} req - La solicitud original. | The original request.
 * @param {string} token - El token de autorización. | The authorization token.
 * 
 * @returns {Object} - La solicitud con el token de autorización añadido en los encabezados. | The request with the authorization token added in the headers.
 */
function addToken(req, token) {
    return { ...req, headers: { ...req.headers, Authorization: `Bearer ${token}` } };
  }

export default api;
