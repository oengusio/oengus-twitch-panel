<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { RunnerInfo } from '@/types/OengusTypes';
import { oengusApi } from '@/apis/oengus';

export default defineComponent({
  name: 'runner-info',
  props: {
    runner: {
      type: Object as PropType<RunnerInfo>,
      required: true,
    },
  },
  watch: {
    //
  },
  computed: {
    avatarUrl(): string {
      return oengusApi.getAvatarUrl(this.runner.username);
    },
    twitchUsername(): string | undefined {
      return this.runner.connections.find((c) => c.platform === 'TWITCH')
        ?.username;
    },
  },
  methods: {
    followOnTwitch() {
      //
    },
  },
});
</script>

<template>
  <div class="column" v-if="runner">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="avatarUrl" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ runner.username }}</p>
            <p class="subtitle is-6" v-if="twitchUsername">
              @{{ twitchUsername }}
            </p>
          </div>
        </div>

        <div class="content" v-if="twitchUsername">
          <button @click="followOnTwitch" class="follow-btn">Follow</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.follow-btn {
  background-color: var(--twitch-purple);
  color: white;
  font-size: 2em;
  border: none;
}
</style>
