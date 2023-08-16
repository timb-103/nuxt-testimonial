// import { defineEventHandler, createError } from "h3";
// import type { Tweet } from "../../../../types";
// import { useRenderTweet } from "../../utils/render";
// import { cachedEventHandler } from "#imports";
// import * as cheerio from "cheerio";

// export default cachedEventHandler(
//   async (event) => {
//     const id = event.context.params?.id;

//     if (!id) {
//       return createError({ statusMessage: "No id provided.", statusCode: 401 });
//     }

//     try {
//       // get the html body
//       // "https://twitter.com/Timb03/status/1690855751001206784",
//       const response = await $fetch(decodeURIComponent(id), {
//         method: "GET",
//         headers: {
//           "User-Agent": "tc-bot/1.0",
//         },
//       });

//       const formatted = formatResponse(response);

//       if (response) {
//         console.log("returning fomatted!");
//         return formatted;
//       }
//     } catch (error) {
//       console.log("Error getting tweet:", error);
//     }

//     return createError({
//       statusMessage: "Error getting Tweet.",
//       statusCode: 401,
//     });
//   },
//   {
//     swr: true,
//     maxAge: 1,
//   }
// );

// function getToken(id: string) {
//   return ((Number(id) / 1e15) * Math.PI)
//     .toString(6 ** 2)
//     .replace(/(0+|\.)/g, "");
// }

// function formatResponse(response) {
//   const data = {
//     userName: "",
//     screenName: "",
//     sections: [],
//     avatar: "",
//     media: "",
//     poster: "",
//     verified: false,
//   };

//   // parse the html
//   const $ = cheerio.load(response);

//   // get the users avatar
//   data.avatar = $("body")
//     .find("[data-testid=Tweet-User-Avatar]")
//     .find("img")
//     .eq(0)
//     .attr("src");

//   // find the user name & screen name
//   $("body")
//     .find("[data-testid=User-Name]")
//     .children()
//     .each((i, el) => {
//       const text = $(el).text();
//       if (i === 0) {
//         data.screenName = text;
//       } else if (i === 1) {
//         data.userName = text;
//       }
//     });

//   // get the text and add into sections array
//   $("body")
//     .find("[data-testid=tweetText]")
//     .children()
//     .each((i, el) => {
//       const text = $(el).text();
//       const name = $(el)["0"].name;

//       if (text[0] === "#") {
//         data.sections.push({ text, name: "hashtag" });
//       } else if (text[0] === "@") {
//         data.sections.push({ text, name: "tag" });
//       } else {
//         data.sections.push({ text, name });
//       }
//     });

//   // get the media if it exists
//   data.media = $("body")
//     .find("[data-testid=tweetPhoto]")
//     .find("img")
//     .eq(0)
//     .attr("src");

//   // get video poster if its a video
//   data.poster = $("body")
//     .find("video")
//     .eq(0)
//     .attr("poster");

//   // see if the user is verified
//   data.verified = $("body").find("[data-testid=icon-verified]").length > 0;

//   console.log(data);

//   return data;
// }
