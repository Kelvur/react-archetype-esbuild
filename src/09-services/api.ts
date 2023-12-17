// Types
import { ServiceCallConfig } from './api.d';


const COMMON_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
};

const DEFAULT_FETCH_CONFIG = {
    headers: COMMON_HEADERS,
};

export const serviceCallInversionOfControl = (fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>) => <T>(url: string, config: ServiceCallConfig = { method: 'GET' }): Promise<T> => {
    let urlResult = url;
    // Replace all the "{urlParams}" in the URL
    // Example:
    // URL = /books/{country}/{zipcode} urlParams = {country: 'esp', zipcode: '11035', witcher: 'Geralt'}
    // Results in /books/esp/11035
    if (typeof config.urlParams === 'object'){
        const urlParams = config.urlParams;
        Object.keys(urlParams).forEach(
            (key: string) => urlResult = urlResult.replace(`{${key}}`, urlParams[key]),
        );
    }
    // Put all the params in the URL
    // Example:
    // URL = /books/search params = {q: 'author:"Agata"', page: 0, pageSize: 10}
    // Results in /books/search?q=author%3A%22Agata%22&page=0&pageSize=10
    let objUrl: URL;
    if (url.length === 0 || url.charAt(0) === '/'){
        objUrl = new URL(`${location.origin}${urlResult}`);
    } else {
        objUrl = new URL(urlResult);
    }
    if (typeof config.params === 'object'){
        const params = config.params;
        Object.keys(params).forEach(key => objUrl.searchParams.append(key, params[key].toString()));
    }
    return fetch(objUrl, {
        ...DEFAULT_FETCH_CONFIG,
        ...config,
        ...(config.body ? { body: JSON.stringify(config.body) } : {}),
    }).then((response: Response) => response.json());
};

export const serviceCall = serviceCallInversionOfControl(window.fetch);

export function get<T>(url: string, config: ServiceCallConfig): Promise<T>{
    return serviceCall<T>(url, { ...config, method: 'GET' });
}
export function post<T>(url: string, config: ServiceCallConfig): Promise<T>{
    return serviceCall<T>(url, { ...config, method: 'POST' });
}
export function patch<T>(url: string, config: ServiceCallConfig): Promise<T>{
    return serviceCall<T>(url, { ...config, method: 'PATCH' });
}
export function put<T>(url: string, config: ServiceCallConfig): Promise<T>{
    return serviceCall<T>(url, { ...config, method: 'PUT' });
}
export function remove<T>(url: string, config: ServiceCallConfig): Promise<T>{ // Delete, but delete it's a reserved keyword
    return serviceCall<T>(url, { ...config, method: 'DELETE' });
}
