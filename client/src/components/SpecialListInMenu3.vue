<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <div>
      <SpecialItem
          v-for="key in row_1_special_keys_in_menu_3"
          v-bind:k="key"
          v-on:print-char-process="printCharProcess"
      />
    </div>


    <div>
      <SpecialItem
          v-for="key in row_2_special_keys_in_menu_3"
          v-bind:k="key"
          v-on:print-char-process="printCharProcess"
      />
    </div>


    <div>
      <button v-on:click="$emit('count-number')" id="menu3">{{menu3Text}}</button>
      <SpecialItem
          v-for="key in row_3_special_keys_in_menu_3"
          v-bind:k="key"
          v-on:print-char-process="printCharProcess"
      />
      <button v-on:click="$emit('remove-char')" id="backspace">&times;</button>
    </div>
  </div>
</template>

<script>
import SpecialItem from "@/components/SpecialItem";
export default {
  components: {SpecialItem},
  props: ['row_1_special_keys_in_menu_3', 'row_2_special_keys_in_menu_3', 'row_3_special_keys_in_menu_3', 'menu3Text'],
  methods: {
    printCharProcess(title)
    {
      this.$emit('print-char-process', title);
    }
  }
}
</script>

<style scoped>
#menu3 {
  height: 30px;
  width: 40px;
  margin: 5px 3px;

  background-color: #3366CC;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
}

#menu3:active
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
