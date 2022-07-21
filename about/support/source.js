const expose = (options) => {
    return (new Function(`${options.code} \n return { ${options.sut} };`))();
};

module.exports = { expose };