const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const PORT = 8000;
const app = express();

axios("https://www.theguardian.com/international")
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".fc-item__title").each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");

      const article = {
        title,
        url,
      };
      articles.push(article);
    });

    console.log(articles);
  })
  .catch(err => console.log(err));

app.listen(PORT, () => console.log("Server started on port", PORT));
