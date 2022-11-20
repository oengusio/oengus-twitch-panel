<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { useConfigStore } from '@/stores/config';

export default defineComponent({
  components: {
    RouterView,
  },
  setup() {
    const configStore = useConfigStore();

    return {
      configStore,
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

  <footer>
    <!-- TODO: Change wording depending on schedule status -->
    <p v-if="configStore.loaded">
      <a :href="`https://oengus.io/marathon/${configStore.marathonConfig.marathonId}/schedule`" target="_blank">
        View the full schedule on
        <img class="brandLogo" src="@/assets/logo.svg" alt="Oengus.io" />
      </a>
    </p>
    <p v-else>
      <a href="https://oengus.io/" target="_blank">
        Powered by
        <img class="brandLogo" src="@/assets/logo.svg" alt="Oengus.io" />
      </a>
    </p>
  </footer>
</template>

<style scoped>
img.brandLogo {
  height: 1.3em;
  position: relative;
  bottom: -3px;
}

.run-info > span:not(:last-of-type)::after {
  content: ' - ';
}

.runner-info > span:not(:last-of-type)::after {
  content: ', ';
}
</style>
