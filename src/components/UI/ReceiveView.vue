<template>
    <div>
        <div class="message">
            <div>Ваш файл: </div>
            <div class="href">
                <a  :href=  "`${webrctMessage}`" :download="`${fileName}`" >{{ fileName }} </a>
            </div>
            <div class="progress" 
                :style="`background: linear-gradient(90deg, rgb(0, 136, 255) ${percentOfReceive}%, rgb(215, 215, 215) ${percentOfReceive}%)`">
            </div>
            <div class="percent">
                {{percentOfReceive}}%
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ReceiveView',
        props: {
            fileName: '',
            webrctMessage: '',
            percentOfReceive: '',
            },
    }
</script>

<style scoped>
.message{
    width: 320px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    text-align: center;
}
.href{
    word-wrap: break-word;
    max-height: 55px;
    overflow-y: hidden;
}
.progress{
    width: 320px;
    height: 6px;
   
    border-radius: 3px;
    margin-top: 24px;
    
}
.percent{
    margin-top: 18px;
    text-align: center;
}
</style>