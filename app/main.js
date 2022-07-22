var eventBus = new EventBus();
new HintsRenderer({eventBus, procedures, placeholder: document.querySelector('#hints')});

document.querySelector('#test').addEventListener('click', () => {        
    eventBus.notify('step', 'test');
});
document.querySelector('#code').addEventListener('click', () => {        
    eventBus.notify('step', 'code');
});
document.querySelector('#refactor').addEventListener('click', () => {        
    eventBus.notify('step', 'refactor');
});

document.querySelector('#test').click();