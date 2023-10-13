const { EmbedBuilder } = require("discord.js");
const instaTouch = require("instatouch");
require("dotenv").config();

function timestamp_compare(timestamps) {
  let maisRecente = null;
  let maiorTimestamp = 0;

  for (const objeto of timestamps) {
    const timestamp = objeto.taken_at_timestamp;
    if (timestamp > maiorTimestamp) {
      maiorTimestamp = timestamp;
      maisRecente = objeto;
    }
  }
  return maisRecente;
}

async function get_latest_post(profile_user) {
  try {
    const options = {
      count: 5,
      mediaType: "all",
      session: process.env.SESSION_ID,
      bulk: false,
    };

    const UserOptions = {
      count: 1,
      mediaType: "all",
      session: process.env.SESSION_ID,
      bulk: false,
    };

    const post = await instaTouch.user(profile_user, options);
    const user = await instaTouch.getUserMeta(profile_user, UserOptions);
    const latest_post = post.collector;
    
    const recent_post = timestamp_compare(latest_post);
    const post_link = `https://instagram.com/p/${recent_post.shortcode}`;
    const data = {
      user: {
        username: profile_user,
        iconURL: user.graphql.user.profile_pic_url_hd,
      },
      post: {
        shortcode: recent_post.shortcode,
        description: recent_post.description,
        thumbnail_src: recent_post.thumbnail_src,
        post_link: post_link,
      },
    };
    return data;
  } catch (error) {
    console.log("Erro ao consultar ultimo post: " + error);
  }
}


module.exports = { get_latest_post };
