// Types
import { ServiceCallMethod, ServiceCallConfig } from './api.d';


const COMMON_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
};

const DEFAULT_FETCH_CONFIG = {
    headers: COMMON_HEADERS,
};

export const serviceCallInversionOfControl = (fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>) => <Type>(url: string, config: ServiceCallConfig = { method: ServiceCallMethod.Get }): Promise<Type> => {
    let urlResult = url;
    // Replace all the "{urlParams}" in the URL
    // Example:
    // URL = /books/{country}/{zipcode} urlParams = {country: 'esp', zipcode: '11035', witcher: 'Geralt'}
    // Results in /books/esp/11035
    if (typeof config.urlParams === 'object'){
        const urlParams: Record<string, string> = config.urlParams;
        urlResult = Object.keys(urlParams).reduce(
            (prev: string, key: string) => prev.replace(`{${key}}`, urlParams[key]),
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
        const params: Record<string, string> = config.params;
        Object.keys(params).forEach(key => objUrl.searchParams.append(key, params[key]));
    }
    return fetch(objUrl, {
        ...DEFAULT_FETCH_CONFIG,
        ...config,
        ...(config.body ? { body: JSON.stringify(config.body) } : {}),
    }).then((response: Response) => response.json());
};

export const serviceCall = serviceCallInversionOfControl(window.fetch);

export function get<Type>(url: string, config: ServiceCallConfig): Promise<Type>{
    return serviceCall(url, { ...config, method: ServiceCallMethod.Get });
}
export function post<Type>(url: string, config: ServiceCallConfig): Promise<Type>{
    return serviceCall(url, { ...config, method: ServiceCallMethod.Post });
}
export function patch<Type>(url: string, config: ServiceCallConfig): Promise<Type>{
    return serviceCall(url, { ...config, method: ServiceCallMethod.Patch });
}
export function put<Type>(url: string, config: ServiceCallConfig): Promise<Type>{
    return serviceCall(url, { ...config, method: ServiceCallMethod.Put });
}
export function remove<Type>(url: string, config: ServiceCallConfig): Promise<Type>{ // Delete, but delete is a reserved keyword
    return serviceCall(url, { ...config, method: ServiceCallMethod.Delete });
}

export { ServiceCallMethod };
