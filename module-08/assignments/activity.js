function inc(a) {
    return new Promise((resolve, reject) => {
    if (true) {
        resolve(a + 1);
      } else {
        reject("Not found");
      }
  })};

const sum = function (a, b) {
    return new Promise((resolve, reject) => {
    if (true) {
        resolve(a + b);
      } else {
        reject("Not found");
      }
  })};

const max = (a, b) => 
    new Promise((resolve, reject) => {
    if (a > b) {
        resolve(a);
      } else {
        reject(b);
      }
  });

const avg = (a, b) => 
  new Promise((resolve, reject) => {
  if (true) {
      sum(a, b)
      .then((result) => {
        resolve(result / 2);
      })
    } else {
      reject("Not found");
    }
});

const obj = {
    name: "Marcus Aurelius",
    split(sep = " ") {
      return Promise.resolve(this.name.split(sep));
    },
  };

class Person {
    constructor(name) {
      this.name = name;
    }
  
    static of(name) {
      return Promise.resolve(new Person(name));
    }
  
    split(sep = " ") {
      return Promise.resolve(this.name.split(sep));
    }
  }

inc(5).then((result) => {console.log("inc(5) =", result);}) ; // function.then (a function), (result) is result of the inc(5)
sum(1,3).then((result) => {console.log("sum(1, 3) =", result);});
max(8,6).then((result) => {console.log("max(8, 6) =", result);});
avg(8,6).then((result) => {console.log("avg(8, 6) =", result);});
obj.split().then((result) => {console.log("person.split() =", result);});
Person.of("Marcus Aurelius").then((result) => {return result.split();})
  .then((splitName) => {console.log("person.split() =", splitName);})

  
// console.log("inc(5) =", inc(5));
// console.log("sum(1, 3) =", sum(1, 3));
// console.log("max(8, 6) =", max(8, 6));
// console.log("avg(8, 6) =", avg(8, 6));
// console.log("obj.split() =", obj.split());
// console.log("person.split() =", person.split());