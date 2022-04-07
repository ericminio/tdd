var times = { test: 0, code: 0, refactor: 0, step: 0 };
var counting = 'test';

const nowCounting = (step) => {
    counting = step;
    times.step = 0;
};

const updateTimes = (times, counting) => {
    times[counting]++;
    times.step ++;
};
