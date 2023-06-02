<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useConfigStore } from '@/stores/config';
import * as bulmaToast from 'bulma-toast';
import { oengusApi } from '@/apis/oengus';
import { storeToRefs } from 'pinia';
import OengusConfig from '@/components/config/OengusConfig.vue';
import HoraroConfig from '@/components/config/HoraroConfig.vue';
import { horaroApi } from '@/apis/horaro';

export default defineComponent({
  name: 'config-view',
  components: { HoraroConfig, OengusConfig },
  setup() {
    const configStore = useConfigStore();
    const { marathonConfig } = storeToRefs(configStore);
    const oengusDomains = ['oengus.io', 'sandbox.oengus.io', 'horaro.org'];

    if (document.location.host === 'localhost:5173') {
      oengusDomains.push('oengus.dev');
    }

    const horaroEventSlug = ref('');
    const horaroScheduleSlug = ref('');

    return {
      configStore,
      oengusDomains,
      cfg: marathonConfig,
      horaroEventSlug,
      horaroScheduleSlug,
    };
  },
  mounted() {
    /*window.gtag('event', 'PageLoaded', {
      event_category: 'Page',
      event_label: 'config',
    });*/
  },
  computed: {
    //
  },
  watch: {
    'cfg.domain'(domain: string) {
      this.cfg.type = domain === 'horaro.org' ? 'HORARO' : 'OENGUS';

      if (this.cfg.type === 'HORARO') {
        this.cfg.hiddenDataKey = '';
        this.cfg.marathonId = '';
      } else {
        this.cfg.marathonId = '';
      }
    },
  },
  methods: {
    clearExt() {
      this.cfg.marathonId = '';
      this.save();
    },
    async loadOengusData(marathonId: string): Promise<void> {
      this.cfg.marathonName = await oengusApi.getMarathonName(marathonId);
    },
    async loadHoraroData(): Promise<void> {
      const { id, name } = await horaroApi.loadBasicScheduleInfo(
        this.horaroEventSlug,
        this.horaroScheduleSlug
      );

      this.cfg.marathonId = id;
      this.cfg.marathonName = name;
    },
    async save(): Promise<void> {
      bulmaToast.toast({
        duration: 4000,
        single: true,
        message: 'Saving....',
        type: 'is-warning',
        position: 'top-center',
        dismissible: true,
      });

      try {
        const marathonId = this.cfg.marathonId || this.horaroScheduleSlug;

        if (marathonId) {
          if (this.cfg.type === 'OENGUS') {
            await this.loadOengusData(marathonId);
          } else {
            await this.loadHoraroData();
          }
        } else {
          this.cfg.marathonName = 'None';
        }

        console.log(this.cfg.marathonName);

        this.configStore.saveToTwitch();

        /*window.gtag('event', 'ConfigSaved', {
          event_category: 'config',
          event_label: this.marathonId,
        });*/

        // TODO: fork and fix
        bulmaToast.toast({
          duration: 2000,
          single: true,
          message: 'Config saved!',
          type: 'is-success',
          position: 'top-center',
          dismissible: true,
        });
      } catch (e) {
        bulmaToast.toast({
          duration: 10000,
          single: true,
          message: `No marathon with id "${this.cfg.marathonId}" found.`,
          type: 'is-warning',
          position: 'top-center',
          dismissible: true,
        });
      }
    },
  },
});
</script>

<template>
  <section class="section">
    <h2 class="title">Oengus Extension Configuration</h2>

    <div class="container">
      {{ cfg.domain }}
      <form action="#">
        <OengusConfig
          v-if="cfg.type === 'OENGUS'"
          v-model:marathon-id="cfg.marathonId"
          v-model:domain="cfg.domain"
          :oengus-domains="oengusDomains"
          :marathon-name="cfg.marathonName"
        />
        <HoraroConfig
          v-else
          :marathon-name="cfg.marathonName"
          :oengus-domains="oengusDomains"
          v-model:domain="cfg.domain"
          v-model:event-slug="horaroEventSlug"
          v-model:schedule-slug="horaroScheduleSlug"
          v-model:hidden-data-key="cfg.hiddenDataKey"
        />

        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-success"
              type="button"
              @click.prevent="save"
            >
              Save
            </button>
          </div>
          <div class="control">
            <button
              class="button is-danger"
              type="button"
              @click.prevent="clearExt"
            >
              Disable extension
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
//
</style>
