/**
 * Archivo de variables y contanstes de entorno.
 *
 */

export const environment = {
  production: false
};

// ====== Local Storage
export const LS_TOKEN = 'userToken';

// ====== Constantes de entoro de Usuario
export const URL_API_SIGIN    = 'http://localhost:3000/usuario/sigin';
export const URL_API_GET_USER = 'http://localhost:3000/usuario';
// tslint:disable-next-line: max-line-length
export const PATTERN_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


