// Promise是一個用於觸發非同步事件的物件
// 其接受一個函數，函數參數為傳遞事件成功訊息的｢resolve｣和傳遞失敗訊息的「reject」
// 該函數內部通常會有一個需要長時間執行的工作。Promise設計為當該工作成功後呼叫resolve並傳入data; 若工作失敗則呼叫reject並傳入error message
// 另外注意，resolve和reject只能擇一呼叫，並且也不行重複呼叫
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("things got wrong!");
    }, 5000);
    resolve("things got succeed!");
});

console.log("before");

// 這邊透過被創建的Promise實例promise來訪問內部輛個重要的api: .then()和.catch()
// .then()接受一個函數作為參數，並且會將resolve()的data傳入到該函數裡
// .catch()也接受一個函數作為參數，但.catch()則是會將reject()的error message傳入到該函數中
// .then()和.catch()都只會在resolve()或reject()被呼叫後執行，而resolve()和reject()則只會在Promise裡面那要執行很久的工作完成後才會被呼叫
// 藉此，即能實現將非同步的程式如同同步一般來使用的效果
// 另外，.then()和.catch()的行為跟eventListener一樣，是用於「綁定」未來某個時間點要實行的函數
// 因次這兩個函數放在程式碼的愈上面愈好
promise.then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});

console.log("after");
