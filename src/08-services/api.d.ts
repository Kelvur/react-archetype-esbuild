
export enum ServiceCallMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
    Options = 'OPTIONS',
}

export interface ServiceCallConfig {
    method: ServiceCallMethod,
    urlParams?: Record<string, string>,
    params?: Record<string, string | number | Array<string | number>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    signal?: AbortSignal,
}
