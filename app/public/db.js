// let db;

// const request = indexedDB.open("checklist", 1);

// request.onupgradeneeded = function (event) {
//   const db = event.target.result;
//   db.createObjectStore("pending", { autoIncrement: true });
// };

// request.onsuccess = function (event) {
//   db = event.target.result;
//   if (navigator.onLine) {
//   }
// };

// request.onerror = function (event) {
//   console.log("Woops! " + event.target.errorCode);
// };

// function saveRecord(record) {
//   const item = db.transaction(["pending"], "readwrite");
//   const store = item.objectStore("pending");
//   store.add(record);
// }
