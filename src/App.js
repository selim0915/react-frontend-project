import './App.css';
import keylog from '../asset/png/keylog.png';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
        <img src="${keylog}" />
    `
})

console.log(process.env.NODE_ENV);
// eslint-disable-next-line no-undef
console.log(TWO);
// eslint-disable-next-line no-undef
console.log(api.domain)