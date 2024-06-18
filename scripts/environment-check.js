// VERIFICA SE O AMBIENTE É DE PRODUÇÃO E ADICIONA A TAG BASE NO HEAD DO HTML
const isProduction = (window.location.hostname === 'https://josielfaria.github.io');

if (isProduction) {
    const baseTag = document.createElement('base');
    baseTag.setAttribute('href', 'change-pads/');
    document.head.appendChild(baseTag);
}