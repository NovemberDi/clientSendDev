<template>
<div class="send__wrap">
    <div class="send_mess">
        <label class="input-file">
            <span class="input-file-btn">Выберите файл</span>
            <span class="input-file-text" type="text">{{ nameFile }}</span>
            <input class="input" type="file" @change="onChangeInput">            
 	    </label>
        <div class="send">
            <button class="send-btn"  @click="sendFile"> Отправить</button>   
        </div>
    </div>
    <div class="progress" :style="`background: linear-gradient(90deg, rgb(0, 136, 255) ${percentOfSend}%, rgb(215, 215, 215) ${percentOfSend}%)`">
         
    </div>
    <div class="percent">
        {{percentOfSend}}%
    </div>
</div>
</template>

<script>
    export default {
        name: 'SendView',
        data(){
            return{
                inputValue: null,
                nameFile: null
            }
        },
        props: {
            percentOfSend: ''
            
            },
        methods:{
            sendFile(){
                if (this.inputValue) this.$emit('onClickSend', this.inputValue); 
            },
            onChangeInput(event){
                this.inputValue = event;
                this.nameFile = this.inputValue?this.inputValue.target.files[0].name:null
             
            },    
        }
    }   
</script>

<style scoped>
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
.input-file {
	display: flex;
}
.input-file-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 30px;
    width: 200px;
    font-size: 14px;
    padding-left: 6px;
	box-sizing: border-box;
    overflow: hidden;
    white-space:nowrap;



	
	border-radius:  0px 4px 0px 0;
	border: 1px solid #ddd;
    background: rgb(232, 238, 247);
}
.input-file-btn {
	display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 120px;
    font-size: 14px;

	cursor: pointer;
	outline: none;
    border: none;
	text-decoration: none;

	color: rgb(217, 231, 246);
	background-color: rgb(5, 90, 178);
    border-radius: 4px 0 0 0px;
    
    transition: background-color 0.2s;	
}
.input {
display: none;    
}
.input-file:hover .input-file-btn {
	background-color: rgb(69, 134, 190);
}
.input-file:active .input-file-btn {
	background-color: rgb(28, 105, 172);
}
 
/* .input-file input[type=file]:disabled + .input-file-btn {
	background-color: #eee;
} */

.send-btn {
	display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 320px;
    font-size: 14px;
    margin-top: 0px;

	cursor: pointer;
	outline: none;
    border: none;
	text-decoration: none;

	color: rgb(217, 231, 246);
	background-color: rgb(5, 178, 77);
    border-radius:  0 0 4px 4px;
    
    transition: background-color 0.2s;
}
.send{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>