<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import HomeFooter from '@/components/HomeFooter.vue';

export default defineComponent({
  components: {
    RouterView,
    HomeFooter,
  },
  setup() {
    return {
      //
    };
  },
});
</script>

<template>
  <header>
    <!-- something here? -->
  </header>

  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>

  <HomeFooter />
</template>

<style scoped lang="scss">
//
</style>
