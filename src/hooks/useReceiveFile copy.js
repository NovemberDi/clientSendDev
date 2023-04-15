import { ref } from "vue";

export default function () {
    let reciver = new Blob();

    let fileName = ref();
    let webrctMessage = ref();
    let request = window.indexedDB.open("MyTestDatabase", 1);

  
    let onMesRTC = (e) => {
      if (typeof(e.data) == 'string'){
       webrctMessage.value =  URL.createObjectURL(reciver);  
        fileName.value = JSON.parse(e.data).name;
      } else{
       
       
        reciver = reciver? new Blob([reciver,e.data]):new Blob([e.data]);
        if (!webrctMessage.value) webrctMessage.value =  URL.createObjectURL(reciver);
        fileName.value = 'kbyr.png'
      }
    }   


    
  return {
    fileName,
    webrctMessage,
    onMesRTC
  }
  
    
  
}
