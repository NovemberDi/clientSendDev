<template>
    <div class="main">
        <div class="event" v-show="downloadEvent"></div>
        <div onselectstart="return false" onmousedown="return false"
        class="stik stik__one"
        :class="{
            active__one: selectMode,
            disactive__one: !selectMode
        }"
        @click="selectMode = true"

        >Передать</div>
        <div onselectstart="return false" onmousedown="return false" 
        class="stik stik__two  "
        :class="{
            active__two: !selectMode,
            disactive__two: selectMode
            }"
        @click="{selectMode = false ; downloadEvent = false}"
            >Получить
            
        </div>
        <div class="shadow_box"></div>
        <div class="main__content">
            <send-view 
                :class="{
                   mute: !dataChannel
                }"
                :percentOfSend="percentOfSend"
                v-show="selectMode"
                @onClickSend="sendFile($event, this.dataChannel)"
            ></send-view>
            <receive-view 
                v-show="!selectMode"
                @click=" downloadEvent = false"
                :webrctMessage="webrctMessage"
                :fileName="fileName"
                :percentOfReceive="percentOfReceive"
            ></receive-view>
        </div>
        <div class="connection__id">
            <connection-view
            :id="id"
            :linkStatus="linkStatus"
            
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

    import useSendF  from '@/hooks/useSendFile'
    import useReceiveFile from '@/hooks/useReceiveFile'
    import useConnect from '@/hooks/useConnect'

    
    
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
            }
        },
        setup(){
          const {percentOfSend, sendFile} = useSendF();
          const{fileName, webrctMessage, percentOfReceive, downloadEvent, onMesRTC} = useReceiveFile();
          const {sendId,id, inputValue, linkStatus, webrctStatus, dataChannel} = useConnect(onMesRTC);
         
           return {sendFile,percentOfSend, 
                  fileName, webrctMessage, percentOfReceive, downloadEvent,
                  id, sendId, inputValue, linkStatus,webrctStatus, dataChannel
                }
        },
        methods:{

        },
        mounted(){  
        },
        watch(){

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
.mute{
    opacity: 0.3;
    pointer-events: none;
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
.event{
    position: absolute;
    top: 10px;
    left: 330px;  
    content: '';
    height: 10px;
    width: 10px;
    background: rgb(255, 183, 0);
    box-shadow: 0px 0px 7px 3px rgb(255, 183, 0);    
    border-radius: 50%;
    z-index: 5;
    -webkit-animation: pulsing 1s infinite;
    animation: pulsing 1s infinite;
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
@media screen and (max-width: 800px) {
    .main{
        grid-template: 50px 2fr 1fr / 1fr 1fr ;
        height:80vh;
        width: 350px;
    }
    .stik__one{
        grid-area: 1 / 1 / 1 / 1;  
    }
    .stik__two{    
        grid-area: 1 / 2 / 1 /3;
    }
    .main__content{
        grid-area: 3 / 1 / 3 / 3;;
    }
    .connection__id{
        grid-area: 2 / 1 / 2 / 3;
    }
    .shadow_box{
        grid-area: none;
    }
}
@keyframes pulsing {
  0% {
    scale: 0.7;
    /* box-shadow: 0px 0px 7px 1px rgb(255, 136, 0);     */
  }
  50% {
    scale: 1;
    /* box-shadow: 0px 0px 7px 3px rgb(255, 136, 0);     */
  }
  100% {
    scale: 0.7;
    /* box-shadow: 0px 0px 7px 1px rgb(255, 136, 0);     */
  }
}
</style>