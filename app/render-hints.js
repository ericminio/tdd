const renderHints = (step) =>
    `<ul>
        ${procedures[step].reduce((acc, item) => acc += `<li>${item}</li>`, '')}
    </ul>`;

const hints = {
    test: renderHints('test'),
    code: renderHints('code'),
    refactor: renderHints('refactor')
};

const displayHints = (step, document, target) => {
    const element = document.getElementById(target);
    element.innerHTML = hints[step];
    element.style.border = `var(--color-${step}) solid`;
};
