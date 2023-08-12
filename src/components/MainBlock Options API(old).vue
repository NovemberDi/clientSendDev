<template>
    <div class="main">
        <div onselectstart="return false" onmousedown="return false"
        class="stik stik__one"
        :class="{
            active__one: selectMode,
            disactive__one: !selectMode
        }"
        @click="selectMode = !selectMode"

        >Передать</div>
        <div onselectstart="return false" onmousedown="return false" 
        class="stik stik__two  "
        :class="{
            active__two: !selectMode,
            disactive__two: selectMode
        }"
        @click="selectMode = !selectMode"
        >Получить</div>
        <div class="shadow_box"></div>
        <div class="main__content">
            <send-view 
                v-show="selectMode"
                @onChangeInput="onChangeInput"
            ></send-view>
            <receive-view 
                v-show="!selectMode"
                :webrctMessage="webrctMessage"
                :fileName="fileName"
            ></receive-view>
        </div>
        <div class="connection__id">
            <connection-view
            :id="id"
            :linkStatus="linkStatus"
            :webrctStatus="webrctStatus"
            @sendId="sendId"
            v-model="inputValue"
            ></connection-view>
            
        </div>
        
    </div>
</template>

<script>
    import SendView from '@/components/UI/SendView.vue' 
    import ReceiveView from '@/components/UI/ReceiveView.vue'
    import ConnectionView from '@/components/UI/ConnectionView.vue' 
    export default {
        name: 'MainBlock',
        components:{
            SendView,
            ReceiveView,
            ConnectionView
        },
        data(){
            return {
                selectMode: true,
                firstPeer: false,

                peerConnection: null,
                ws: null,
                id: 'test',
                linkStatus:'Нет подключений',
                inputValue: '',
                
                inputFile:'',
                arrayBuffer:[],
                reciveArray:[],
                fileName:'',
                
                incomeOffer: null,//?
                incomeAnswer: null,//?
                webrctMessage: null,
                webrctStatus: '-',
                dataChannel: null,
            }
        },
        methods:{
    onChangeInput(event){
      console.log(this.dataChannel.bufferedAmountLowThreshold)
      this.arrayBuffer = [];
      this.inputFile = null;

      this.inputFile = event.target.files[0];
      console.log(this.inputFile.name, this.inputFile.size, this.inputFile.type);
      let size = this.inputFile.size;
      let chunkSize = 262144;
      let start = 0;
      let fileReader = new FileReader();

      let slicer = ()=>{
        // if (this.dataChannel.bufferedAmount >= this.dataChannel.bufferedAmountLowThreshold){
        let part = this.inputFile.slice(start,start+chunkSize);
          start+=chunkSize;  
          fileReader.readAsArrayBuffer(part);
        //}
      }

       fileReader.onload =  () =>{
           
          this.dataChannel.send(fileReader.result);

          if (this.dataChannel.bufferedAmount >this.dataChannel.bufferedAmountLowThreshold) {
              this.dataChannel.onbufferedamountlow = () => {
                this.dataChannel.onbufferedamountlow = null;
                if (start<size) slicer()
                else {
                  this.dataChannel.send(JSON.stringify({type: 'end', name: this.inputFile.name}))
                  this.inputFile = null;
                  alert('Отправлено!')
                };
              } 
            } else {

          if (start<size) slicer()
            else {
              this.dataChannel.send(JSON.stringify({type: 'end', name: this.inputFile.name}))
              this.inputFile = null;
              alert('Отправлено!')
            };
            }  
       };
      fileReader.onerror = function() {
          console.log(fileReader.error);
        };
      slicer();
    },

     sendOnWEBRCT(){      
      console.log(this.dataChannel.bufferedAmount);
      console.log(this.dataChannel.bufferedAmountLowThreshold);

    },
      sendMessage(type,value){
      let mesToClient = {
          type,
          value,
      };
      this.ws.send(JSON.stringify(mesToClient))
    },
    sendId(){
      this.sendMessage('id',this.inputValue); 
      this.firstPeer = true   
    },
    
    connect(){
      this.ws = new WebSocket('ws://192.168.0.105:3000');
      // this.ws = new WebSocket('wss://wsserver.dimkayaa.repl.co');
        this.ws.onmessage =  (event) => {
          let message = JSON.parse(event.data);
          console.log("сообщение от сервера!");
            if (message.type == 'id') this.id = message.value;
            if (message.type == 'link') {
                this.linkStatus = message.value;
                if (this.firstPeer) this.createOffer()
            }
            if (message.type == 'newOffer') {
              if(true){//////
              this.incomeOffer=message.value;
              this.createAnswer(message.value);}
            };
            if (message.type == 'newAnswer') {
              // if(!this.incomeAnswer){
              if(true){
              this.incomeAnswer=message.value;
              console.log(this.incomeAnswer)
              this.peerConnection.setRemoteDescription( JSON.parse(this.incomeAnswer));
            }
            }
            if ( message.type == 'candidate'){
              console.log('Новый кандидат', message.value)
              this.handleCandidate(  message.value);
            }
          
      };
    },
    onMesRTC(e){if (typeof(e.data) == 'string'){
              const received = new Blob(this.reciveArray);   
              this.webrctMessage =  URL.createObjectURL(received);
              this.fileName = JSON.parse(e.data).name;
              // alert('Принято!');
              this.reciveArray = []
            } else{
              this.reciveArray.push(e.data);}
    },
    async createPeerConnection(){
      this.peerConnection = new RTCPeerConnection({
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
                   
          this.peerConnection.onicecandidate = e => {
            const message = {
              type: 'candidate',
              value: null,
            };
            // if (e.candidate) {message.value = e.candidate;}
            // this.sendMessage(message.type,message.value);
            
            message.value = e.candidate;
            this.sendMessage(message.type,message.value);
            }
    },
    async handleCandidate(candidate){
      if (!this.peerConnection)  await this.createPeerConnection();
      // if (!candidate.candidate) {
      //     await this.peerConnection.addIceCandidate(null);
      //   } else {
          await this.peerConnection.addIceCandidate(candidate);
          console.log('Rfylblfnm lj,fdkty')
          
       // }
    },
    async createOffer(){
          await this.createPeerConnection();

          this.dataChannel = this.peerConnection.createDataChannel('test');
          this.dataChannel.onopen = () => this.webrctStatus = '+' ;
          this.dataChannel.onmessage = e => this.onMesRTC(e);

          let offer = await this.peerConnection.createOffer();
          console.log(offer);
          this.sendMessage('offer', JSON.stringify(offer));
          await this.peerConnection.setLocalDescription(offer);  
    },
    async createAnswer(){
      if (!this.peerConnection) await this.createPeerConnection();

          let offer =  JSON.parse(this.incomeOffer); 
          console.log(offer);
          this.peerConnection.setRemoteDescription(offer);

          this.peerConnection.ondatachannel = event => {
          this.dataChannel = event.channel;  
          this.dataChannel.onopen = () => this.webrctStatus = '+' ;
          this.dataChannel.onmessage = e => this.onMesRTC(e);
          };
          

          let answer = await this.peerConnection.createAnswer();
          this.sendMessage('answer', JSON.stringify(answer));
          await this.peerConnection.setLocalDescription(answer);

    } 
  },
  mounted(){
    this.connect();
    
    
  }
}
</script>

<style scoped>

.main{
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    align-self: center;
    height:350px;
    width: 700px;
    background: rgb(220, 220, 220);
    box-shadow: 0px 3px 17px 0px rgba(34, 60, 80, 0.2);

    display: grid;
    grid-template: 50px 1fr / 1fr 1fr 1fr 1fr ;
}
.active__one{
    background: #fff;
}
.disactive__one{
    background: rgb(237, 237, 237);
    box-shadow: -8px -6px 10px 2px rgba(34, 60, 80, 0.3) inset;
    opacity: 0.6;
}
.active__two{
    background: #fff;
}
.disactive__two{
    background: rgb(237, 237, 237);
    box-shadow: 8px -6px 10px 2px rgba(34, 60, 80, 0.3) inset;
    opacity: 0.6;
}
.stik{
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 24px;
    font-family: 'Oswald', sans-serif;
    padding-left: 40px; 
    color: rgb(75, 72, 70);
    cursor: pointer;
}
.stik__one{
    grid-area: 1 / 1 / 1 / 2;  
}
.stik__two{    
    grid-area: 1 / 2 / 1 / 3;
}

.main__content{
    background: #fff;
    grid-area: 2 / 1 / 2 / 3;

    display: flex;
    justify-content: center;
    align-items: center;
}
.connection__id{
    display: flex;
    background: #fff;
    grid-area: 2 / 3 / 2 / 5;
}
.shadow_box{
    box-shadow: 8px -6px 10px 2px rgba(34, 60, 80, 0.2) inset;
    grid-area: 1 / 3 / 1 / 5;
}

</style>