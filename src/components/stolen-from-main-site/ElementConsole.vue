<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    console: {
      type: String,
      required: true,
    },
    isEmulated: Boolean,
  },
});
</script>

<template>
  <span>
    <span>
      {{ console }}
    </span>
    <sup v-if="isEmulated">[Emu]</sup>
  </span>
</template>
