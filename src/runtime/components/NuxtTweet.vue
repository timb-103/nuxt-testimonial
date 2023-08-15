<template>
  <div v-if="data?.tweet?.text" @click="open" target="_blank" class="tweet">
    <!-- Header -->
    <div class="tweet-header">
      <!-- Image -->
      <div class="tweet-header-image">
        <img :src="data.tweet.user.profile_image_url_https" />
      </div>

      <!-- Name -->
      <div class="tweet-header-name">
        <p class="tweet-header-name-top">
          <span>{{ data.tweet.user.name }}</span>

          <!-- Verified Logo -->
          <svg
            v-if="data.tweet.user.is_blue_verified"
            viewBox="0 0 22 22"
            aria-label="Verified account"
            role="img"
            class="tweet-header-name-top-badge"
          >
            <g>
              <path
                d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
              ></path>
            </g>
          </svg>
        </p>

        <!-- Screen Name-->
        <p class="tweet-header-name-bottom">
          @{{ data.tweet.user.screen_name }}
        </p>
      </div>

      <!-- Logo -->
      <div class="tweet-header-logo">
        <!-- X -->
        <svg viewBox="0 0 24 24" aria-hidden="true" class="tweet-header-logo-x">
          <g>
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            ></path>
          </g>
        </svg>
      </div>
    </div>

    <!-- Body -->
    <div class="tweet-body">
      <p class="tweet-body-text" v-if="data.sections">
        <span v-for="(item, index) in data.sections" :key="index + 'section'">
          <!-- Plain Text -->
          <span v-if="!item.entityIndice">
            {{ decodeHTMLEntities(item.text) }}
          </span>

          <!-- URL -->
          <a
            @click.stop
            v-else-if="item.entityIndice?.urls"
            :href="item.entityIndice.urls.expanded_url"
          >
            {{ item.entityIndice.urls.display_url }}
          </a>

          <!-- Hashtag -->
          <a
            @click.stop
            v-else-if="item.entityIndice?.hashtags"
            :href="`https://twitter.com/hashtag/${item.entityIndice.hashtags.text}`"
            target="_blank"
          >
            #{{ item.entityIndice.hashtags.text }}
          </a>

          <!-- User Mention -->
          <a
            @click.stop
            v-else-if="item.entityIndice?.userMentions"
            :href="`https://twitter.com/${item.entityIndice.userMentions.screen_name}`"
            target="_blank"
          >
            @{{ item.entityIndice.userMentions.screen_name }}
          </a>

          <!-- Media (image) -->
          <img
            v-else-if="props.showMedia && item.entityIndice?.media"
            loading="lazy"
            class="tweet-body-image"
            :src="item.entityIndice.media.expanded_url"
            :style="{
              width: `${Number(
                data.tweet.mediaDetails?.[0]?.sizes?.large?.w
              )}px`,
              'aspect-ratio':
                Number(data.tweet.mediaDetails?.[0]?.sizes?.large?.w) /
                Number(data.tweet.mediaDetails?.[0]?.sizes?.large?.h),
            }"
          />
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useFetch } from "#imports";
import { Tweet, Section } from "../../types";

const props = defineProps({
  id: { type: String, required: true },
  showMedia: { type: Boolean, required: false, default: () => true },
});

function decodeHTMLEntities(text: string): string {
  const entities: { [key: string]: string } = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
  };

  return text.replace(
    /&(amp|lt|gt|quot|#039);/g,
    (match: string) => entities[match]
  );
}

function open() {
  window.open(
    `https://twitter.com/${data.value?.tweet.user.screen_name}/status/${props.id}`,
    "_blank"
  );
}

interface Response {
  sections: Section[];
  tweet: Tweet;
}

const { data } = await useFetch<Response>(`/api/tweets/${props.id}`);
</script>

<style scoped>
.tweet {
  border: 1px solid #cfd9de;
  padding: 12px 16px;
  border-radius: 12px;
  display: block;
  text-decoration: none;
  max-width: 548px;
  color: #000;
}
.tweet:hover {
  background: #fafafa;
  cursor: pointer;
}

/** Header */
.tweet-header {
  display: flex;
  padding-bottom: 12px;
}
.tweet-header-image > img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
}
.tweet-header-name {
  margin-left: 4px;
  margin-right: 4px;
}
.tweet-header-name-top {
  font-weight: 700;
  font-size: 14px;
  margin: 0;
  display: flex;
  gap: 2px;
  align-items: center;
}
.tweet-header-name-top-badge {
  fill: #1d9bf0;
  width: 17.5px;
  height: 17.5px;
}
.tweet-header-name-bottom {
  font-size: 14px;
  margin: 0;
  color: #536471;
}
.tweet-header-logo {
  margin-left: auto;
}
.tweet-header-logo-x {
  height: 23px;
  width: 23px;
}

/** Body */
.tweet-body {
}
.tweet-body-text {
  white-space: pre-line;
  font-size: 19px;
  line-height: 23px;
  margin: 0;
}
.tweet-body-image {
  max-width: 100%;
  display: block;
  border-radius: 10px;
  border: 1px solid #cfd9de;
  margin-top: 11px;
  width: 100%;
  height: auto;
}
.tweet-body:deep(a) {
  color: #006fd6;
  text-decoration: none;
}
.tweet-body:deep(a:hover) {
  text-decoration: underline;
}
</style>
