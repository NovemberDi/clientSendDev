import localforage from "localforage";
import { ref } from "vue";


export default function () {
    let reciver = new Blob();
    let fileName = ref();
    let webrctMessage = ref();

    let iterator = 0;
    let fileSize = 0;
    let currentSize =0;

    let arrayQuery = [];

    localforage.clear();





    let onMesRTC =  (e) => {
      if (typeof(e.data) == 'string'){
        let req = JSON.parse(e.data);
        if (req.type == 'start'){
          fileSize = req.size;
          console.log(req.size)
        }else 
        fileName.value = JSON.parse(e.data).name; 
        
      } else{
        currentSize+=e.data.byteLength;
        console.log(currentSize)
        localforage.setItem(iterator+'part',e.data).
        then(()=>{
          iterator+=1;
          if ( currentSize==fileSize){
            localforage.iterate(function(value, key, iterationNumber) {
              arrayQuery.push(value);
          }).then(()=>{
            localforage.setItem('mainFile', new Blob(arrayQuery)).
              then(()=> localforage.getItem('mainFile').then((value)=>webrctMessage.value =  URL.createObjectURL(value))
              )
            
          })
          } 
        })

        
      }
    }   


    
  return {
    fileName,
    webrctMessage,
    onMesRTC
  }
}
    
  
// }
// localforage.setItem('finalBlob', new Blob()).then(()=>{
//   localforage.iterate(function(value, key, iterationNumber) {
     
     
//        localforage.setItem('finalBlob', new Blob([value])).
//        then(()=>{localforage.getItem('finalBlob').then((finalBlob)=>{ webrctMessage.value =  URL.createObjectURL(finalBlob)})})     
// })    
//  }) 
// }