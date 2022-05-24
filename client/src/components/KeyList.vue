<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <div>
      <KeyItem
          v-for="key of row_1_keys"
          v-bind:k="key"
          v-on:print-char="printChar"
      />
    </div>
    <div>
      <KeyItem
          v-for="key of row_2_keys"
          v-bind:k="key"
          v-on:print-char="printChar"
      />
    </div>
    <div>
      <button v-on:click="$emit('process-shift')" id="shift">&DoubleUpArrow;</button>
      <KeyItem
          v-for="key of row_3_keys"
          v-bind:k="key"
          v-on:print-char="printChar"
      />
      <button v-on:click="$emit('remove-char')" id="backspace">&times;</button>
    </div>
  </div>
</template>

<script>
import KeyItem from '@/components/KeyItem'
export default {
  props: ['row_1_keys', 'row_2_keys', 'row_3_keys'],
  methods: {
    printChar(title) {
      this.$emit('print-char', title)
    }
  },
  components: {
    KeyItem
  }
}
</script>

<style scoped>

#shift {
  height: 29px;
  width: 30px;
  margin: 5px 3px;

  background-color: #9933FF;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
}

#shift:active
{
  background-color: white;
}

#backspace {
  height: 30px;
  width: 30px;
  margin: 5px 3px;

  background-color: #FF3300;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
}

#backspace:active
{
  background-color: white;
}
</style>
