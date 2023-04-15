import localforage from "localforage";
import { ref } from "vue";


export default function () {
    let reciver = new Blob();

    let fileName = ref();
    let webrctMessage = ref();

    let db
const connection = indexedDB.open('myDatabase', 1)



connection.onupgradeneeded = function(event) {
  db = event.target.result
  db.createObjectStore('myFile', {autoIncrement: true})
}

connection.onsuccess = function(event) {
  db = event.target.result
  removeNote('dbFile')
}

connection.onerror = function(event) {
  console.log(`Ошибка при открытии базы данных: ${event.target.errorCode}`)
}
async function removeNote(key) {
  const request = await db
  .transaction(["myFile"], "readwrite")
  .objectStore("myFile")
  .delete(key);
request.onsuccess = (event) => {
  // It's gone!
};
}
async function getNote(key) {
  const request = await db
  .transaction(["myFile"], "readwrite")
  .objectStore("myFile")
  .get(key);
request.onsuccess = (event) => {
  // let result = new Blob([event.target.result])
  // webrctMessage.value =  URL.createObjectURL(result);

  // webrctMessage.value =  URL.createObjectURL(event.target.result);
  // console.log(event.target.result)
  // let res = event.target.result;
  reciver = event.target.result;
  
};
}
async function addNote(db, myBlob) {
  const tx = db.transaction(['myFile'], 'readwrite')
  const store = tx.objectStore('myFile')
  const note = myBlob


  tx.oncomplete = () => {
    console.log('Заметка сохранена')
    // getNote('dbFile')
  }
  tx.onerror = (event) => {
    console.log(`Ошибка при записи заметки: ${event.target.errorCode}`)
  }
  await removeNote('dbFile')
  await store.put(note, 'dbFile')
}
  







    let onMesRTC =  (e) => {
      if (typeof(e.data) == 'string'){
        getNote('dbFile')
        console.log(reciver) 
         

       
        // webrctMessage.value =  URL.createObjectURL(result);  
        fileName.value = JSON.parse(e.data).name;
      } else{
       
        addNote(db, reciver? new Blob([reciver,e.data]):new Blob([e.data]))
        // reciver = reciver? new Blob([reciver,e.data]):new Blob([e.data]);
        
      }
    }   


    
  return {
    fileName,
    webrctMessage,
    onMesRTC
  }
  
    
  
}
