
export interface ServiceCallConfig {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS',
    urlParams?: Record<string, string>,
    params?: Record<string, string | number | Array<string | number>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    signal?: AbortSignal,
}
