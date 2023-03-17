function timeout(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 40);
}

function generateData() {
  return new Promise(function (resolve) {
    timeout(1000).then(function () {
      const data = Array.from({ length: 20 }, generateRandomNumber);
      resolve(data);
    });
  });
}

function convertToFeet(meters) {
  const feet = meters * 3.2808;
  return new Promise(function (resolve) {
    timeout(3500).then(function () {
      resolve(feet);
    });
  });
}

function processData(data) {
  return Promise.all(data.map(function (value) {
    return convertToFeet(value).then(function (result) {
      logResult(value, result);
    });
  }));
}

function logResult(meters, feet) {
  console.log(`Converted ${meters}m to ${feet}ft`);
}

async function main() {
  console.log("Start");
  const data = await generateData();
  await processData(data);
  console.log("Finish");
}

main();
