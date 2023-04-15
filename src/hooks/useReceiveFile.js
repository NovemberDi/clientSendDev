"use strict"
import { ref } from "vue";

export default function () {
    
    let percentOfReceive = ref('0');
    let fileName = ref();
    let webrctMessage = ref();
    let downloadEvent = ref(false);
    let fileSize = 0;
    let reciver = new Blob();
  

    let onMesRTC = (e) => {
      if (typeof(e.data) == 'string'){
        let req = JSON.parse(e.data);
        if (req.type == 'start'){
              fileSize = req.size;
              fileName.value = null;
              webrctMessage.value = null;
              reciver = new Blob();
            }else{
              webrctMessage.value =  URL.createObjectURL(reciver);  
              fileName.value = req.name;
              downloadEvent.value = true
            }
      } else{
       

        reciver = reciver? new Blob([reciver,e.data]):new Blob([e.data]);
        percentOfReceive.value = Math.floor((reciver.size/fileSize>1?1:reciver.size/fileSize)*100)+'';
       
        
      }
    }   


    
  return {
    fileName,
    webrctMessage,
    percentOfReceive,
    downloadEvent,
    onMesRTC
  }
  
    
  
}
