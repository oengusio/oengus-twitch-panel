<script lang="ts">
import { defineComponent } from 'vue';
import { useConfigStore } from '@/stores/config';

export default defineComponent({
  setup() {
    const configStore = useConfigStore();

    return {
      configStore,
    };
  },
  computed: {
    showFooter() {
      const routeName = this.$route.name;

      if (!routeName) {
        return false;
      }

      return ['home', 'line-details'].includes(routeName as string);
    },
  },
});
</script>

<template>
  <footer v-if="showFooter">
    <p v-if="configStore.loaded && configStore.marathonConfig.marathonId">
      <a
        :href="`https://${configStore.marathonConfig.domain}/marathon/${configStore.marathonConfig.marathonId}/schedule`"
        target="_blank"
      >
        View the full schedule on
        <img class="brandLogo" src="@/assets/logo.svg" alt="Oengus.io" />
      </a>
    </p>
    <p v-else>
      <a
        :href="`https://${configStore.marathonConfig.domain}/`"
        target="_blank"
      >
        Powered by
        <img class="brandLogo" src="@/assets/logo.svg" alt="Oengus.io" />
      </a>
    </p>
  </footer>
</template>

<style scoped lang="scss">
img.brandLogo {
  height: 1.3em;
  position: relative;
  bottom: -3px;
}
</style>
