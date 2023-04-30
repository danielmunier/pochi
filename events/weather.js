const { Client, Events, EmbedBuilder } = require("discord.js");
const axios = require("axios");
require("dotenv").config;

module.exports = {
  name: Events.ClientReady,
  once: false,
  execute(client) {
    const channel = client.channels.cache.get(process.env.WEATHER_CHANNEL);

    let weatherMessage = null;
    let isMessageSended = false

    
    async function getWeatherData() {
      try {
        const response =
          await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Rio%20de%20Janeiro&appid=${process.env.WEATHER_API_KEY}
              `);

        const weatherData = response.data;
     

        const embed = new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle(`Clima no Rio de Janeiro`)
          .setThumbnail(
            `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
          )
          .addFields(
            {
              name: "Condição atual",
              value: `${weatherData.weather[0].description}`,
              inline: true,
            },
            {
              name: "Temperatura atual",
              value: `${(weatherData.main.temp - 273).toFixed(2)}°C`,
              inline: true,
            },
            {
              name: "Sensação térmica",
              value: `${(weatherData.main.feels_like - 273).toFixed(2)}°C`,
              inline: true,
            },
            {
              name: "Máxima",
              value: `${(weatherData.main.temp_max - 273).toFixed(2)}°C`,
              inline: true,
            },
            {
              name: "Mínima",
              value: `${(weatherData.main.temp_min - 273).toFixed(2)}°C`,
              inline: true,
            },
            {
              name: "Pressão",
              value: `${weatherData.main.pressure} hPa`,
              inline: true,
            },
            {
              name: "Umidade",
              value: `${weatherData.main.humidity}%`,
              inline: true,
            },
            {
              name: "Velocidade do vento",
              value: `${weatherData.wind.speed} m/s`,
              inline: true,
            }
          );
        console.log("Temperatura consultada com sucesso!");

         // Envio ou edição da mensagem

        if (!isMessageSended) {
          console.log("Mensagem não encontrada, enviando nova mensagem...");
          let message = channel.send({ embeds: [embed] });
          message.then(message => {
            weatherMessage = message;
            
          })
          isMessageSended = true
        } else {
          console.log("Mensagem encontrada, editando mensagem...");
          weatherMessage.edit({ embeds: [embed] });
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Executa a cada 15 minutos
    setInterval(getWeatherData, 900000)
  },
};
