<template>
  <div class="sg-logo">
    <a href="https://i.senguo.cc">
        <img :src="sg_logo" alt="">
    </a>
  </div>
</template>

<script>
import sg_logo from 'static/images/sg_bm.png'
export default {
  data () {
    return {
      sg_logo
    }
  },
}
</script>

<style>
.sg-logo{
    text-align:center;
    align-items:center;
}
.sg-logo img{
    display:inline-block;
    height:40px;
    width:90px;
    margin:20px 0;
}
</style>
