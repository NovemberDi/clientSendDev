import { ref, onMounted } from "vue";


export default function (onMesRTC) {
  let id = ref('ожидание..');
  let linkStatus = ref('ожидание');
  let inputValue = ref('');
  let dataChannel = ref();
  let webrctStatus =ref(); ///УБРАТЬ
 
  

  let ws = null;
  let firstPeer = false;

  let peerConnection;
  let incomeOffer ='';
  let incomeAnswer = '';

  
  //WebSocket-----------------
  let connect = () => {
    
    ws = new WebSocket('ws://192.168.0.105:3000'); //  'ws://192.168.0.105:3000'    'wss://wsserver.dimkayaa.repl.co'
    
    ws.onmessage =  (event) => {
        let message = JSON.parse(event.data);
        console.log("сообщение от сервера!");
          if (message.type == 'id') id.value = message.value;
          if (message.type == 'link') {
              linkStatus.value = message.value;
              if (firstPeer) createOffer()
          }
          if (message.type == 'newOffer') {
            
            incomeOffer=message.value;
            createAnswer(message.value)
          };
          if (message.type == 'newAnswer') { 
           incomeAnswer=message.value;
            // console.log(incomeAnswer) /////////////////// УБРАТЬ
            peerConnection.setRemoteDescription( JSON.parse(incomeAnswer));
          }
          if ( message.type == 'candidate'){
            console.log('Новый кандидат', message.value)
            handleCandidate(message.value);
          }
        
    };
  }
  let sendMessage = (type,value) => {
      let mesToClient = {
        type,
        value,
      };
      ws.send(JSON.stringify(mesToClient))
  }
  let  sendId = () => {
    sendMessage('id',inputValue.value); 
    inputValue.value = null;
    firstPeer = true   
  }


  //Create connect on WebRTC
  let createPeerConnection = async () => {
    peerConnection = new RTCPeerConnection({
              iceServers: [
              {
                urls: "stun:relay.metered.ca:80",
              },
              {
                urls: "turn:relay.metered.ca:80",
                username: "5253a2d860bc9520ee01c9bd",
                credential: "1Ky2rMcecoRMIYbT",
              },
              {
                urls: "turn:relay.metered.ca:443",
                username: "5253a2d860bc9520ee01c9bd",
                credential: "1Ky2rMcecoRMIYbT",
              },
              {
                urls: "turn:relay.metered.ca:443?transport=tcp",
                username: "5253a2d860bc9520ee01c9bd",
                credential: "1Ky2rMcecoRMIYbT",
              },
              ]
            });
        
            

        peerConnection.onicecandidate = e => {
          const message = {
            type: 'candidate',
            value: null,
          };         
          message.value = e.candidate;
          sendMessage(message.type,message.value);
          }
  }
  let handleCandidate = async (candidate) => {
    if (!peerConnection)  await createPeerConnection();
   
        await peerConnection.addIceCandidate(candidate);
        console.log('Кандидат добавлен')
        
  }

  let createOffer = async () => {
    await createPeerConnection();

    dataChannel.value = peerConnection.createDataChannel('test');
    dataChannel.value.onopen = () => linkStatus.value = 'Готов к передаче!' ;
    dataChannel.value.onclose = () => disconnect();
    dataChannel.value.onmessage = e => onMesRTC(e);

    let offer = await peerConnection.createOffer();
    console.log(offer);
    sendMessage('offer', JSON.stringify(offer));
    await peerConnection.setLocalDescription(offer);  
}
let createAnswer = async () => {
if (!peerConnection) await createPeerConnection();

    let offer =  JSON.parse(incomeOffer); 
    console.log(offer);
    peerConnection.setRemoteDescription(offer);

    peerConnection.ondatachannel = event => {
    dataChannel.value = event.channel;  
    dataChannel.value.onopen = () => linkStatus.value = 'Готов к передаче!' ;
    dataChannel.value.onclose = () => disconnect();
    dataChannel.value.onmessage = e => onMesRTC(e);

    };
    

    let answer = await peerConnection.createAnswer();
    sendMessage('answer', JSON.stringify(answer));
    await peerConnection.setLocalDescription(answer);

} 
function disconnect(){
peerConnection = null;
dataChannel.value =null;
incomeOffer ='';
incomeAnswer = '';
firstPeer = false;
linkStatus.value ='ожидание';
 


}


  onMounted(connect)
  return{
    sendMessage,
    sendId,
    id,
    linkStatus,
    inputValue,
    webrctStatus,
    dataChannel,
  }
}