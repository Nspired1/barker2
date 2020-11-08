const validText = inputVar => {
    return typeof inputVar === 'string' && inputVar.trim().length > 0;
}

module.exports = validText;