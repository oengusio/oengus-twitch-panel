<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';

export default defineComponent({
  props: {
    marathonName: {
      type: String,
      required: true,
    },
    oengusDomains: {
      type: Array as PropType<string[]>,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    marathonId: {
      type: String,
      required: true,
    },
  },
  emits: ['update:domain', 'update:marathonId'],
  watch: {
    dataDomain() {
      this.$emit('update:domain', this.dataDomain);
    },
    dataMarathonId() {
      this.$emit('update:marathonId', this.dataMarathonId);
    },
  },
  setup(props) {
    return {
      dataDomain: ref(props.domain),
      dataMarathonId: ref(props.marathonId),
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
      <a href="" class="button is-static">/marathon/</a>
    </p>

    <div class="control">
      <input
        type="text"
        class="input"
        placeholder="myMarathon"
        v-model="dataMarathonId"
      />
    </div>
  </div>
</template>
