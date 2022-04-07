var times = { test: 0, code: 0, refactor: 0 };
var counting = 'test';

const nowCounting = (step) => {
    counting = step;
};

const updateTimes = (times, counting) => {
    times[counting]++;
};
