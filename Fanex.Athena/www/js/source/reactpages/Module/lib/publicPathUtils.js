export const setupWebpackPublicPath = (srcFallback = window.location.origin) => {
    const currentScript = document.getElementById('publicScript');
    const src = currentScript ? currentScript.src : srcFallback;
    const url = new URL(src);
    __webpack_public_path__ = (url.origin + '/' + __webpack_public_path__);
}