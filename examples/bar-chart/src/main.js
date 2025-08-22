import { createBarChart } from './barchart.js';

const container = document.getElementById('app');
const chart = createBarChart(container);

const form = document.getElementById('ui');
function readValues(form) {
    return ['n1','n2','n3','n4','n5'].map(name => parseFloat(form.elements[name].value));
}


chart.update(readValues(form));

form.addEventListener('submit', (e) => {
    e.preventDefault();
    chart.update(readValues(form));
});