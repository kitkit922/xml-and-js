console.log('before')
setTimeout(() => {
    console.log(`here`);
    }, 2000);
console.log('after')


new Promise((ms) => {
    setTimeout(() => {
        resolve();
        }, ms);
});



