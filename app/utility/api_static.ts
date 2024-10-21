export const API = Object.freeze({
});

export const Get_WS = function() {
    return import.meta.env.VITE_WSS_DOMAIN;
}

export const Get_HTTP = function() {
    return import.meta.env.VITE_API_DOMAIN;
}

export const CombineAPI = function(url: string) {
    return Get_HTTP() + url;
}