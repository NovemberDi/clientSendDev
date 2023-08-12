import { ref } from "vue";

export default function () {
      let percentOfSend = ref('0');
    
      let inputFile = null;  

      
      let sendFile = (event, dataChannel, ) =>{
          inputFile = event.target.files[0];
          console.log(inputFile.name, inputFile.size, inputFile.type);
          

          let size = inputFile.size;
          let chunkSize = 262144;
          let start = 0;
          let fileReader = new FileReader();

          let slicer = ()=>{
            let part = inputFile.slice(start,start+chunkSize);
              start+=chunkSize;
              percentOfSend.value = Math.floor((start/size>1?1:start/size)*100)+'';
              
              fileReader.readAsArrayBuffer(part);
          }

          fileReader.onload =  async () =>{
              if (dataChannel) {
                  dataChannel.send(fileReader.result);     
                   
                  if (dataChannel.bufferedAmount > dataChannel.bufferedAmountLowThreshold) {
                      dataChannel.onbufferedamountlow = () => {
                        dataChannel.onbufferedamountlow = null;
                        if (start<size) slicer()
                        else {
                          dataChannel.send(JSON.stringify({type: 'end', name: inputFile.name}))
                          inputFile = null;
                         
                        };
                      } 
                    } else {

                  if (start<size) slicer()
                    else {
                    dataChannel.send(JSON.stringify({type: 'end', name: inputFile.name}))
                      
                      alert('Отправлено!')
                    };
                    }  
              }
          };
          fileReader.onerror = function() {
              console.log(fileReader.error);
            };
          dataChannel.send(JSON.stringify({type: 'start', size: inputFile.size}))
          slicer();
    }
    return{
      percentOfSend, sendFile
    }
  }    