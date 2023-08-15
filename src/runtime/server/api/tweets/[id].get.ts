import { defineEventHandler, createError } from "h3";
import type { Tweet } from "../../../../types";
import { useRenderTweet } from "../../utils/render";
import { cachedEventHandler } from "#imports";

export default cachedEventHandler(
  async (event) => {
    const id = event.context.params?.id;
    console.log("getting!");

    if (!id) {
      return createError({ statusMessage: "No id provided.", statusCode: 401 });
    }

    try {
      // @ts-ignore
      const response: Tweet = await $fetch(
        "https://cdn.syndication.twimg.com/tweet-result",
        {
          responseType: "json",
          params: {
            id,
            lang: "en",
            token: getToken(id),
            features: [
              "tfw_timeline_list:",
              "tfw_follower_count_sunset:true",
              "tfw_tweet_edit_backend:on",
              "tfw_refsrc_session:on",
              "tfw_show_business_verified_badge:on",
              "tfw_duplicate_scribes_to_settings:on",
              "tfw_show_blue_verified_badge:on",
              "tfw_legacy_timeline_sunset:true",
              "tfw_show_gov_verified_badge:on",
              "tfw_show_business_affiliate_badge:on",
              "tfw_tweet_edit_frontend:on",
            ].join(";"),
          },
        }
      );

      console.log(response);

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
