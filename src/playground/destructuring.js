//
//  物件解構語法
//

// const person = {
//     name: "John",
//     age: 26,
//     wife: {
//         wName: "子瑜",
//         // wAge: 19
//     }
// };

// const {name} = person;
// const {wName: wifeName, wAge: wifeAge = 15} = person.wife;


// console.log(`My name is ${name}, and my wife is ${wifeName}, she is ${wifeAge}`);

// const book = {
//     title: "Harry Potter",
//     author: "J.K",
//     publisher: {
//         // name: "聯合"
//     }
// };

// const {name: publisherName = "未知"} = book.publisher;

// console.log(publisherName);


//
//  陣列解構語法
//

const items = ["拿鐵", "100", "105", "110"];

const [coffee, , price] = items;

const print = console.log;

print(`一杯中杯${coffee}要價${price}`);