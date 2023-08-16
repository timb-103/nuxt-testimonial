import type { Tweet, MediaEntity, Section, EntityIndice } from "../../../types";
import { defineEventHandler, createError } from "h3";
import { cachedEventHandler } from "#imports";

export default cachedEventHandler(
  async (event) => {
    const id = event.context.params?.id;

    if (!id) {
      return createError({ statusMessage: "No id provided.", statusCode: 401 });
    }

    try {
      // @ts-ignore
      const response: Tweet = await $fetch(
        "https://cdn.syndication.twimg.com/tweet-result",
        {
          params: {
            id,
            lang: "en",
            token: getToken(id),
            features: [
              "tfw_timeline_list:",
              "tfw_follower_count_sunset:true",
              "tfw_tweet_edit_backend:on",
              "tfw_refsrc_session:on",
              "tfw_fosnr_soft_interventions_enabled:on",
              "tfw_show_birdwatch_pivots_enabled:on",
              "tfw_show_business_verified_badge:on",
              "tfw_duplicate_scribes_to_settings:on",
              "tfw_use_profile_image_shape_enabled:on",
              "tfw_show_blue_verified_badge:on",
              "tfw_legacy_timeline_sunset:true",
              "tfw_show_gov_verified_badge:on",
              "tfw_show_business_affiliate_badge:on",
              "tfw_tweet_edit_frontend:on",
            ].join(";"),
          },
        }
      );

      if (response) {
        return {
          sections: useRenderTweet(response),
          tweet: response,
        };
      }
    } catch (error) {
      console.log("Error getting tweet:", error);
    }

    return createError({
      statusMessage: "Error getting Tweet.",
      statusCode: 401,
    });
  },
  {
    swr: true,
    maxAge: 60 * 60,
  }
);

function getToken(id: string) {
  return ((Number(id) / 1e15) * Math.PI)
    .toString(6 ** 2)
    .replace(/(0+|\.)/g, "");
}

function useRenderTweet(tweet: Tweet): Section[] {
  const sections: Section[] = [];
  const entityIndices = formatEntityIndices(tweet);
  const text = Array.from(tweet.text);
  let currentPosition = 0;

  for (let i = 0; i < entityIndices.length; i += 1) {
    const item = entityIndices[i];
    const [start, end] = item.indices;

    if (start >= 0 && end <= text.length && start <= end) {
      // Capture the text before the current index
      if (currentPosition < start) {
        sections.push({
          text: text.slice(currentPosition, start).join(""),
          entityIndice: null,
        });
      }

      // Capture the section defined by the index
      sections.push({
        text: text.slice(start, end).join(""),
        entityIndice: item,
      });

      currentPosition = end;
    }
  }

  // Capture the text after the last index
  if (currentPosition < tweet.text.length) {
    sections.push({
      text: text.slice(currentPosition).join(""),
      entityIndice: null,
    });
  }

  return sections;
}

function formatEntityIndices(tweet: Tweet) {
  const { hashtags, urls, user_mentions, symbols, media } = tweet.entities;
  const entityIndices: EntityIndice[] = [];

  // hashtags
  if (hashtags) {
    entityIndices.push(
      ...hashtags.map((v) => ({
        type: "hashtag",
        hashtags: v,
        indices: v.indices,
      }))
    );
  }

  // urls
  if (urls) {
    entityIndices.push(
      ...urls.map((v) => ({ type: "urls", urls: v, indices: v.indices }))
    );
  }

  // userMentions
  if (user_mentions) {
    entityIndices.push(
      ...user_mentions.map((v) => ({
        type: "user_mentions",
        userMentions: v,
        indices: v.indices,
      }))
    );
  }

  // symbols
  if (symbols) {
    entityIndices.push(
      ...symbols.map((v) => ({
        type: "symbols",
        symbols: v,
        indices: v.indices,
      }))
    );
  }

  // media
  if (media) {
    entityIndices.push(
      ...media.map((v) => ({
        type: "media",
        media: {
          ...v,
          expanded_url: replaceMediaURL(tweet, v),
        },
        indices: v.indices,
      }))
    );
  }

  // sort in order
  entityIndices.sort((a, b) => a.indices[0] - b.indices[0]);

  return entityIndices;
}

function replaceMediaURL(tweet: Tweet, media: MediaEntity) {
  // get its index by expanded_url key
  const index = tweet.mediaDetails.findIndex(
    (v) => v.expanded_url === media.expanded_url
  );

  // replace expanded_url with media_url_https
  if (index >= 0) {
    return tweet.mediaDetails[index].media_url_https;
  }

  return media.expanded_url;
}
