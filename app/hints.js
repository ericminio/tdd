var rendering = (procedure) => `
    <ul>
        ${procedure.reduce((acc, item) => acc += `<li>${item}</li>`, '')}
    </ul>
    `
var render = { 
    'test': rendering(procedures('test')), 
    'code': rendering(procedures('code')), 
    'refactor': rendering(procedures('refactor')) 
};

var displayHints = (step) => {
    hints.innerHTML = render[step];
}