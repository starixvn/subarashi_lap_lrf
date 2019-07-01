const currentScript = document.getElementById('publicScript');
const src = currentScript ? currentScript.src : window.location.origin;
const url = new URL(src);
__webpack_public_path__ = (url.origin + '/' + __webpack_public_path__);