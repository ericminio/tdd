class HintsRenderer {
    constructor({ eventBus, document, procedures}) {
        this.hints = document.getElementById('hints');
        this.rendered = { 
            'test': this.render(procedures('test')), 
            'code': this.render(procedures('code')), 
            'refactor': this.render(procedures('refactor')) 
        };
        eventBus.register(this, 'step');
    }
    update(step) {
        this.hints.innerHTML = this.rendered[step];
    }

    render(procedure) {
        return `
            <ul>
                ${procedure.reduce((acc, item) => acc += `<li>${item}</li>`, '')}
            </ul>
        `;
    }
};
