function logger(message, name, type) {
    let res = `[${new Date().toLocaleTimeString('es-CO', {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit', fractionalSecondDigits: 3})}] [${name}] [${type}] ${message} `;

    return res.toUpperCase();
}

module.exports = logger;
