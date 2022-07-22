var eventBus = new EventBus();
new HintsRenderer({eventBus, procedures, placeholder: document.getElementById('hints')});

document.getElementById('test').addEventListener('click', () => {        
    eventBus.notify('step', 'test');
});
document.getElementById('code').addEventListener('click', () => {        
    eventBus.notify('step', 'code');
});
document.getElementById('refactor').addEventListener('click', () => {        
    eventBus.notify('step', 'refactor');
});

document.getElementById('test').click();