// varuable to hold db connection 
let db;
// establishing a coonection to IndexedDb database with version of 1
const request = indexedDB.open('pizza_hunt', 1);
//event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a refernce to the database
    const db = event.target.result;
    // an object to store table called 'new-pizza', with auto increment primary key of sorts 
    db.createObjectStore('new_pizza', {autoIncrement: true})
}
//upon success
request.onsuccess = function(event) {
// when db is successfully created 
//with its object store
// (from onupgradedneeded event above)
// or simply established a connection, 
//save reference to db in global variable
db = event.target.result;
  // check if app is online, 
  //if yes run uploadPizza() function to send all local db data to api
if(navigator.online){
    uploadPizza()
}
};
request.onerror = function(event) {
    console,log(event.target.errorCode)
}
//a function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
// open a new transaction with the database with read and write permissions
const transaction = db.transaction(['new_pizza'], 'readwrite');
 // access the object store for `new_pizza`
 const pizzaObjectStore = transaction.objectStore('new_pizza');
// add record to your store with add method
pizzaObjectStore.add(record);
}
function uploadPizza() {
// open a transaction on your db
const transaction = db.transaction(['new_pizza'], "readwrite")

//access object store
const pizzaObjectStore = transaction.objectStore('new_pizza');
  // get all records from store and set to a variable
  const getAll = pizzaObjectStore.getAll();
  // upon a successful .getAll() execution,
  getAll.onsuccess = function() {
      if(getAll.result.length > 0 ) {
          fetch('/api/pizzas', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(serverRes => {
              if(serverRes.message) {
                  throw new Error(serverRes);
              }
              // open one more transaction 
              const transaction = db.transaction(['new_pizza'], 'readwrite')
              // access the new_pizza object store
              const pizzaObjectStore = transaction.objectStore('new_pizza');
              // clear all items in your store
              pizzaObjectStore.clear();
              alert('All saved pizza has been submitted!');
          })
          .catch(err => {
              console.log(err);
          })
      }
  }


}
// listen to the internet connection 
window.addEventListener('online', uploadPizza)
