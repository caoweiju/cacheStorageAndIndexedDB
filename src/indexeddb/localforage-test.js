// 初始化数据库
localforage.config({
    driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name        : 'indexeddb-test-demo',
    version     : 1.0,
    storeName   : 'test-demo', // Should be alphanumeric, with underscores.
    description : 'waimai enlight resource cache in indexeddb'
});


function test(name) {
    this.name = name;
}

test.prototype.start = function() {
    this.startTime = new Date().getTime();
}

test.prototype.end = function() {
    this.endTime = new Date().getTime();
    console.log(`${this.name}  used time: ${this.endTime - this.startTime}ms`);
}


var localstorageSetTest = new test('localstorageSetTest');
localstorageSetTest.start();
// for (let index = 0; index < 100; index++) {
//     window.localStorage.setItem(`localstorageSetTest${index}`, index);
// }
window.localStorage.setItem('localstorageSetTest', 'localstorageSetTest');
localstorageSetTest.end();

// var localstorageGetTest = new test('localstorageGetTest');
// localstorageGetTest.start();
// window.localStorage.getItem('localstorageSetTest');
// localstorageGetTest.end();

var indexeddbSetTest = new test('indexeddbSetTest');
indexeddbSetTest.start();
localforage.setItem('indexeddbSetTest', {a:1,b:2}).then(() => {
    indexeddbSetTest.end();
})

// var indexeddbGetTest = new test('indexeddbSetTest');
// indexeddbGetTest.start();
// localforage.setItem('indexeddbSetTest').then((err, value) => {
//     if(!err) indexeddbGetTest.end();
//     console.log(value);
// })
