export const API = Object.freeze({
    'Generate_SVG': '/api/v1/image/background_generate_svg'
});

export const Get_HTTP = function() {
    return import.meta.env.VITE_API_DOMAIN;
}

export const GetDomain = function(url: string) {
    return import.meta.env.VITE_API_DOMAIN + url;
}

export const GetWSS = function() {
    return import.meta.env.VITE_WSS_DOMAIN;
}
