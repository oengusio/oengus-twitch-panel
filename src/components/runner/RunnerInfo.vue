<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { RunnerInfo } from '@/types/OengusTypes';
import { oengusApi } from '@/apis/oengus';
import { followRunner, hasSharedId, triggerIdShareOverlay } from '@/external/twitch';

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
      // TODO: is this required?
      if (!hasSharedId()) {
        triggerIdShareOverlay();
        return;
      }

      if (!this.twitchUsername) {
        return;
      }

      followRunner(this.twitchUsername);
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
          <button @click="followOnTwitch" class="follow-btn">
            <span class="inner">
              Follow
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.follow-btn {
  position: relative;
  background-color: var(--twitch-purple);
  color: white;
  font-size: 1.3em;
  height: 3rem;
  border-radius: 0.4rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;

  margin: 0;
  padding: 0;

  .inner {
    display: flex;
    align-items: center;
    margin: 0;

    --button-padding-x: 1rem;

    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: calc(var(--button-padding-x) - 0.2rem);
    padding-right: var(--button-padding-x);
  }
}

.media-content {
  overflow: hidden;
}
</style>
