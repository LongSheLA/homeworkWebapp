<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://github.com/vuejs/vue-cli/tree/dev/docs" target="_blank">vue-cli documentation</a>.
    </p>
    <h3 v-show="show">我是登录页面</h3>
    <h3 v-show="$store.getters.not_show">我是登录页面2</h3>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'Login',
  computed:{
    ...mapState({
      show: state => state.hello.show
    })
  },
  data(){
      return {
          title:"登录"
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
