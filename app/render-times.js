const renderTimes = (times, document) => {
    times.ptest = times.test / (times.test + times.code + times.refactor);
    times.pcode = times.code / (times.test + times.code + times.refactor);
    times.prefactor = times.refactor / (times.test + times.code + times.refactor);
    renderPie(times, document);
    renderPercentageTable(times, document);
    renderTotalTime(times, document);
};

const renderPie = (times, document) => {
    var root = document.querySelector(':root');
    root.style.setProperty('--val-test', 360 * times.ptest);
    root.style.setProperty('--val-code', 360 * times.pcode);
    root.style.setProperty('--val-refactor', 360 * times.prefactor);
};

const renderPercentageTable = (times, document) => {
    document.getElementById('percentage-test').innerHTML = `${(100 * times.ptest).toFixed(0)}`;
    document.getElementById('percentage-code').innerHTML = `${(100 * times.pcode).toFixed(0)}`;
    document.getElementById('percentage-refactor').innerHTML = `${(100 * times.prefactor).toFixed(0)}`;
};

const renderTotalTime = (times, document) => {
    document.getElementById('total').innerHTML = formatTime(times.test + times.code + times.refactor);
};
