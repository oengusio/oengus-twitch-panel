<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useConfigStore } from '@/stores/config';
import * as bulmaToast from 'bulma-toast';
import { oengusApi } from '@/apis/oengus';

export default defineComponent({
  name: 'config-view',
  setup() {
    const configStore = useConfigStore();
    const oengusDomains = ['oengus.io', 'sandbox.oengus.io'];

    if (document.location.host === 'localhost:5173') {
      oengusDomains.push('oengus.dev');
    }

    const marathonName = ref<string>(
      configStore.marathonConfig.marathonName || 'None'
    );
    const marathonId = ref<string>(
      configStore.marathonConfig.marathonId || 'None'
    );
    const domain = ref<string>(configStore.marathonConfig.domain || 'None');

    return {
      configStore,
      oengusDomains,
      marathonName,
      marathonId,
      domain,
    };
  },
  mounted() {
    window.gtag('event', 'PageLoaded', {
      event_category: 'Page',
      event_label: 'config',
    });
  },
  computed: {
    //
  },
  methods: {
    clearExt() {
      //
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
        if (this.marathonId) {
          this.marathonName = await oengusApi.getMarathonName(this.marathonId);
        } else {
          this.marathonName = 'None';
        }

        this.configStore.updateConfig({
          marathonId: this.marathonId,
          marathonName: this.marathonName,
          domain: this.domain,
        });

        window.gtag('event', 'ConfigSaved', {
          event_category: 'config',
          event_label: this.marathonId,
        });

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
          duration: -1,
          single: true,
          message: `No marathon with id "${this.marathonId}" found.`,
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
      <form action="#">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label" for="marathon_name">Selected Marathon: </label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input is-static"
                  type="text"
                  v-model="marathonName"
                  readonly
                />
              </p>
            </div>
          </div>
        </div>

        <div class="field has-addons">
          <p class="control">
            <a href="" class="button is-static">https://</a>
          </p>

          <div class="control">
            <div class="select">
              <select v-model="domain">
                <option
                  v-for="domain in oengusDomains"
                  :value="domain"
                  :key="domain"
                >
                  {{ domain }}
                </option>
              </select>
            </div>
          </div>

          <p class="control">
            <a href="" class="button is-static">/marathon/</a>
          </p>

          <div class="control">
            <input
              type="text"
              class="input"
              placeholder="myMarathon"
              v-model="marathonId"
            />
          </div>
        </div>

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
