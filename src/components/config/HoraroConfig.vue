<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    marathonName: {
      type: String,
      required: true,
    },
    oengusDomains: {
      type: Array,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    eventSlug: {
      type: String,
      required: true,
    },
    scheduleSlug: {
      type: String,
      required: true,
    },
    hiddenDataKey: {
      type: String,
      required: true,
    },
  },
  emits: [
    'update:domain',
    'update:scheduleSlug',
    'update:eventSlug',
    'update:hiddenDataKey',
  ],
  watch: {
    dataDomain() {
      this.$emit('update:domain', this.dataDomain);
    },
    dataScheduleSlug() {
      this.$emit('update:scheduleSlug', this.dataScheduleSlug);
    },
    dataEventSlug() {
      this.$emit('update:eventSlug', this.dataEventSlug);
    },
    dataHiddenDataKey() {
      this.$emit('update:hiddenDataKey', this.dataHiddenDataKey);
    },
  },
  setup(props) {
    return {
      dataDomain: ref(props.domain),
      dataEventSlug: ref(props.eventSlug),
      dataScheduleSlug: ref(props.scheduleSlug),
      dataHiddenDataKey: ref(props.hiddenDataKey),
    };
  },
});
</script>

<template>
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
            :value="marathonName"
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
        <select v-model="dataDomain">
          <option v-for="domain in oengusDomains" :value="domain" :key="domain">
            {{ domain }}
          </option>
        </select>
      </div>
    </div>

    <p class="control">
      <a href="" class="button is-static">/</a>
    </p>

    <div class="control">
      <input
        type="text"
        class="input"
        placeholder="esa"
        v-model="dataEventSlug"
      />
    </div>

    <p class="control">
      <a href="" class="button is-static">/</a>
    </p>

    <div class="control">
      <input
        type="text"
        class="input"
        placeholder="2023-winter1"
        v-model="dataScheduleSlug"
      />
    </div>
  </div>

  <div class="field">
    <label class="label">Hidden data key:</label>
    <div class="control">
      <input class="input" type="text" v-model="dataHiddenDataKey" />
    </div>
    <p class="help">
      The Horaro system is build with ESA in mind and will look for the
      following specific hidden fields:
    </p>
  </div>
</template>
