const formatTime = (value) => {
    if (value < 60) {
        return `${value}s`;
    }
    let minutes = Math.floor(value / 60);
    let seconds = value - minutes * 60;
    return `${minutes}mn ${seconds}s`;
};
