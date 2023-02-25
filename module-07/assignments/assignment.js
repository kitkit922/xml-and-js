
// Tsz Kit Cheung N01555831
// Module 7 Assignment

const data = [
    { born: 1870, died: 1924 },
    { born: 1893, died: 1976 },
    { born: 1869, died: 1948 },
    { born: 1901, died: 1989 },
];

console.log("Calculate Age");
const age = data.map((item) =>item.died - item.born);
console.log(age);
console.log("-------------------------------");

console.log("Filter Age");
const filtered = age.filter((item) =>item > 75);
console.log(filtered);
console.log("-------------------------------");

console.log("Reduce Age");
const oldest = filtered.reduce((previous,item) =>{
    if (item > previous){
    return (item)
    }
    else{
        return (previous)
    }
})
console.log(oldest);
console.log("-------------------------------");

console.log("By Chaining");
const result = data.map((item) =>item.died - item.born)
                .filter((item) =>item > 75)
                .reduce((previous,item) =>{
                    if (item > previous){
                    return (item)
                    }
                    else{
                        return (previous)
                    }
                });
console.log(result);
console.log("-------------------------------");