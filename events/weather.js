const { Client, Events, MessageEmbed } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  name: Events.ClientReady,
  once: false,
  execute(client) {
    const channel = client.channels.cache.get(process.env.WEATHER_CHANNEL);
    let weatherMessage = null;
    let isMessageSent = false;

    async function getWeatherData() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Rio%20de%20Janeiro&appid=${process.env.WEATHER_API_KEY}`
        );

        const weatherData = response.data;

        const embed = createWeatherEmbed(weatherData);

        if (!isMessageSent) {
          console.log("Mensagem não encontrada, enviando nova mensagem...");
          channel.send({ embeds: [embed] }).then((message) => {
            weatherMessage = message;
          });
          isMessageSent = true;
        } else {
          console.log("Mensagem encontrada, editando mensagem...");
          weatherMessage.edit({ embeds: [embed] });
        }

        console.log("Temperatura consultada com sucesso!");
      } catch (error) {
        console.error(error);
      }
    }

    function createWeatherEmbed(weatherData) {
      const { main, weather, wind } = weatherData;
      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Clima no Rio de Janeiro")
        .setThumbnail(
          `http://openweathermap.org/img/w/${weather[0].icon}.png`
        )
        .addFields(
          { name: "Condição atual", value: weather[0].description, inline: true },
          {
            name: "Temperatura atual",
            value: `${(main.temp - 273).toFixed(2)}°C`,
            inline: true,
          },
          {
            name: "Sensação térmica",
            value: `${(main.feels_like - 273).toFixed(2)}°C`,
            inline: true,
          },
          {
            name: "Máxima",
            value: `${(main.temp_max - 273).toFixed(2)}°C`,
            inline: true,
          },
          {
            name: "Mínima",
            value: `${(main.temp_min - 273).toFixed(2)}°C`,
            inline: true,
          },
          { name: "Pressão", value: `${main.pressure} hPa`, inline: true },
          { name: "Umidade", value: `${main.humidity}%`, inline: true },
          { name: "Velocidade do vento", value: `${wind.speed} m/s`, inline: true }
        );
      return embed;
    }

    // Executa a cada 15 minutos
    setInterval(getWeatherData, 15 * 60 * 1000);
  },
};
