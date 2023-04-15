<template>
    <div class="id__wrap">
        <div class="id">
            Мой ID: {{ id }}
        </div>
        <div> <p> Состояние: {{ linkStatus }}</p></div>
        <div class="qr"></div>
        <div class="send_id">
            <input class="input-id" type="text"  :value="modelValue" placeholder="Введите ID партнёра"
            @input="updateInput"
            @keyup.enter="sendId"
            >
            <button class="send-btn" @click="sendId"> Вступить</button>
        </div>
        

    </div>
</template>

<script>
    export default {
        name: 'ConnectionView',
       props: {
                id: {type: String},
                linkStatus: {type: String},
                
                modelValue : [String, Number],   
            },
        methods:{
            sendId(){
                this.$emit('sendId');
            },
            updateInput(event){
                this.$emit('update:modelValue', event.target.value)
            }
        }   
        
    }
</script>

<style scoped>
.qr{
    background-image: url(@/assets/qr.svg);
    background-size:contain ;
    background-repeat: no-repeat;
    width: 150px;
    height: 150px;
    margin: auto;   
}
.id__wrap{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 24px 0 24px 0;
    border-left: 1px #dfdfdf solid;
}
.id{
    font-size: 18px;
    font-weight: 600;
}
.send_id{
    display: flex;
    
}
.input-id {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 30px;
    width: 200px;
    font-size: 14px;
    padding-left: 6px;
	box-sizing: border-box;
    overflow: hidden;
    white-space:nowrap;

	border-radius: 4px 0 0 4px;
	border: 1px solid #ddd;
    background: rgb(232, 238, 247);
}
.input-id:focus{
    outline: none;
    
}
.send-btn {
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
    border-radius:  0 4px 4px 0 ;
    
    transition: background-color 0.2s;	
}

</style>