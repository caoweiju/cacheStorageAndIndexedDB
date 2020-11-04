// 我们的客户数据看起来像这样。
const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

let dbInst;
if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}

// 打开我们的数据库
const openIndexedDbRequest = window.indexedDB.open("MyTestDatabase");

openIndexedDbRequest.onerror = function(event) {
    // Do something with request.errorCode!
    alert(`Database open error:${event.target.errorCode}--Why didn't you allow my web app to use IndexedDB?!`);
};
openIndexedDbRequest.onsuccess = function(event) {
    // Do something with request.result!
    dbInst = event.target.result;
};

// 该事件仅在较新的浏览器中实现了
openIndexedDbRequest.onupgradeneeded = function(event) {
    // 保存 IDBDataBase 接口
    var db = event.target.result;
  
    // 建立一个对象仓库来存储我们客户的相关信息，我们选择 ssn 作为键路径（key path）
    // 因为 ssn 可以保证是不重复的
    var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

    // 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引
    objectStore.createIndex("name", "name", { unique: false });

    // 使用邮箱建立索引，我们向确保客户的邮箱不会重复，所以我们使用 unique 索引
    objectStore.createIndex("email", "email", { unique: true });

    // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
    objectStore.transaction.oncomplete = function(event) {
        // 将数据保存到新创建的对象仓库
        var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
        customerData.forEach(function(customer) {
        customerObjectStore.add(customer);
        });
    };
};


// handle all error
dbInst.onerror = function(event) {
    // Generic error handler for all errors targeted at this database's
    // requests!
    alert("Database error: " + event.target.errorCode);
};

