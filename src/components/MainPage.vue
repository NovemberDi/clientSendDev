<template>
  <div class="page">
      <div class="header">
          <div class="top">
              <div class="name"><p>Передайфайл</p></div>
              <div class="logo"> <p>Лого</p></div>
          </div>
          <div class="bottom">
              <h2>Сервис удобного обмена файлами</h2>
          </div>
          
      </div> 
      <main-block> </main-block>  
      <div class="footer"></div>
  </div>
   


</template>

<script>
import MainBlock from '@/components/MainBlock.vue'

export default {
name: 'MainPage',
components:{
MainBlock
},
props: {

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page{
background: rgb(217, 231, 246);
position: relative;
}
.header{
width: 100%; 
height: 36vh; /*700px */
background: rgb(2,0,36);
background: linear-gradient(170deg, rgb(9, 56, 121) 14%, rgb(0, 136, 255) 100%);
}
.top{
padding-top: 40px;
display: flex;
justify-content: space-between;
align-items: center;
}
.name{

font-size: 30px;

margin-left: 30px;
line-height: 0;
font-family: 'Oswald', sans-serif;
font-weight:bold;
letter-spacing:15px;
text-transform: uppercase;

color:rgb(244, 242, 242);
}
.logo{
margin-right:30px ;
display: none;
}
.bottom{
padding-top: 16px;
margin-left: 30px;
color: rgba(244, 242, 242, 0.7); 

font-family: 'Oswald', sans-serif;

}
.bottom h2{
font-size: 18px;
font-weight: 200;
letter-spacing: 3.15px;
margin-bottom: 20px;
}
.bottom p{
font-size: 12px;
font-weight: 200;
letter-spacing: 1px;
}

@media screen and (max-width: 800px) {
.header{
 text-align: center;
}
.top{
  justify-content: center;
  padding-top: 26px;
}
.name{
font-size: 24px;
text-align: center;
margin-left: 12px;
}
.bottom>h2{
font-size: 15px;
padding-top: 0px;
}
.bottom{
margin: 0;
}
.logo{
display: none;

}
}
/* ---- */
/* rgb(237, 99, 99)
rgb(73, 205, 190);
rgb(245, 224, 184)
160, 169, 158); */

</style>
