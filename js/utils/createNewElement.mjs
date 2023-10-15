/**
 * Creates a new HTML element with specified type and properties.
 *
 * @param {string} type - The type of the HTML element to create (e.g., 'div', 'span', 'a').
 * @param {Object} [props={}] - An optional object containing properties and attributes to set on the element.
 * @returns {HTMLElement} - The newly created HTML element.
 */
export function createNewElement(type, props = {}) {
    const elem = document.createElement(type);

    for (let key in props) {
        if (props.hasOwnProperty(key)) {
            // Special handling for certain attribute types
            if (key === 'style') {
                Object.assign(elem.style, props[key]);
            } else if (key.startsWith('on')) {
                // Assuming it's an event listener
                elem.addEventListener(key.substring(2).toLowerCase(), props[key]);
            } else if (key === 'textContent' || key === 'innerHTML') {
                elem[key] = props[key];
            } else {
                elem.setAttribute(key, props[key]);
            }
        }
    }

    return elem;
}
