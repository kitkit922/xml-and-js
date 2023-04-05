

function func() {
    return new Promise((resolve, reject) => {
      if (arguments.length === 0) {
        reject(new Error('No arguments provided'));
      } else {
        resolve(Array.from(arguments));
      }
    });
}

(async () => {
try {
    console.log(await func(1, 2, 3)); 
    console.log(await func('value', 15, {})); 
    console.log(await func()); 
} catch (error) {
    console.error(error.message);
}
})();
  


