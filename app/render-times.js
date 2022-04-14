const renderTimes = (times, document) => {
    let total = (times.test + times.code + times.refactor);
    let percentages = { 
        test:times.test > 0 ? times.test / total : 0, 
        code:times.code > 0 ? times.code / total : 0, 
        refactor:times.refactor > 0 ? times.refactor / total: 0 
    };
    renderPie(percentages, document);
    renderPercentageTable(percentages, document);
    renderTotalTime(times, document);
    renderStepTime(times, document);
};

const renderPie = (percentages, document) => {
    var root = document.querySelector(':root');
    root.style.setProperty('--val-test', 360 * percentages.test);
    root.style.setProperty('--val-code', 360 * percentages.code);
};

const renderPercentageTable = (percentages, document) => {
    document.getElementById('percentage-test').innerHTML = `${(100 * percentages.test).toFixed(0)}`;
    document.getElementById('percentage-code').innerHTML = `${(100 * percentages.code).toFixed(0)}`;
    document.getElementById('percentage-refactor').innerHTML = `${(100 * percentages.refactor).toFixed(0)}`;
};

const renderTotalTime = (times, document) => {
    document.getElementById('total-time').innerHTML = formatTime(times.test + times.code + times.refactor);
};

const renderStepTime = (times, document) => {
    document.getElementById('step-time').innerHTML = formatTime(times.step);
};
