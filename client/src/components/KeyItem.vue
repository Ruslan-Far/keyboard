<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <button v-on:click="$emit('print-char', k.title)">{{k.title}}</button>
</template>

<script>
export default {
  props: {
    k: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
button {
  height: 30px;
  width: 25px;
  margin: 7px 2px;

  background-color: #555555;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
}

button:active
{
  background-color: white;
}
</style>
