class HintsRenderer {
    constructor({ eventBus, procedures, placeholder}) {
        this.hints = placeholder;
        this.rendered = this.memoize(procedures);
        eventBus.register(this, 'step');
    }
    update(step) {
        this.hints.innerHTML = this.rendered[step];
    }

    memoize(procedures) {
        return { 
            'test': this.render(procedures('test')), 
            'code': this.render(procedures('code')), 
            'refactor': this.render(procedures('refactor')) 
        };
    }
    render(procedure) {
        return `
            <ul>
                ${procedure.reduce((acc, item) => acc += `<li>${item}</li>`, '')}
            </ul>
        `;
    }
};
