<template>
  <div>
    <SpecialItem
        v-for="key of row_special_keys"
        v-bind:k="key"
        v-on:print-char-process="printCharProcess"
    />
  </div>
</template>

<script>
import SpecialItem from "@/components/SpecialItem";
export default {
  props: ['row_special_keys'],
  methods: {
    printCharProcess(title) {
      this.$emit('print-char-process', title)
    }
  },
  components: {SpecialItem}
}
</script>
