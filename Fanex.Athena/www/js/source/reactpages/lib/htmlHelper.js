export const encode = (text) => {
    var p = document.createElement("p");
    p.textContent = text;

    return p.innerHTML;
}