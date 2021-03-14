const controller = new AbortController();

/*const fetchTimeout = (url: string, ms: number, { signal: , ...options } = {}) => {
    const controller = new AbortController();
    const promise = fetch(url, { signal: controller.signal, ...options });
    if (signal) signal.addEventListener('abort', () => controller.abort());
    const timeout = setTimeout(() => controller.abort(), ms);
    return promise.finally(() => clearTimeout(timeout));
};*/

export const getRequest = (url: string): Promise<any> => {
    return fetch(url).then(handleRequest);
};

export const postRequest = (url: string, body: string): Promise<any> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    };

    return fetch(url, requestOptions).then(handleRequest);
};

export const handleRequest = (response: Response): Promise<any> => {
    return response.json().catch((res) => {
        throw new Error('Request failed. ' + res);
    });
};
