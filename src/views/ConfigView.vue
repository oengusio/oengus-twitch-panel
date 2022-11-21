<script lang="ts">
import { defineComponent } from 'vue';
import { useConfigStore } from '@/stores/config';
import * as bulmaToast from 'bulma-toast';

export default defineComponent({
  name: 'config-view',
  setup() {
    const configStore = useConfigStore();

    return {
      configStore,
    };
  },
  computed: {
    //
  },
  methods: {
    toastTest(): void {
      // TODO: fork and fix
      bulmaToast.toast({
        duration: 2000,
        single: true,
        message: 'Config saved!',
        type: 'is-success',
        position: 'top-center',
        dismissible: true,
      });
    },
  },
});
</script>

<template>
  <div @click="toastTest">Hello world</div>
</template>

<style scoped lang="scss">
//
</style>
