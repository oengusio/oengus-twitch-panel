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
  setup(props) {
    // idk why this is needed, is stupid.
    return {
      consoleName: props.console,
    };
  },
});
</script>

<template>
  <span>
    <span>
      {{ consoleName }}
    </span>
    <sup v-if="isEmulated">[Emu]</sup>
  </span>
</template>
