# Pochi
Application initially made to periodically notify on Discord channels about job opportunity being advertised on certain Instagram profiles.


## Features

* 🟦 Typescript
* 🔥 Slash Commands 
* 🪜 Ranking
* ✉️ Message commands
* 🕛 Cooldowns
* 🏴 Permissões detalhadas
* 💪 Event & Command handlers
* 🍃 MongoDB Support
* 🍃 [DEACTIVATED] Instagram API Consumption 
* 🍃 Tickets


## Usage example

!["Embed Instagram"](https://i.imgur.com/LbSx5m0.png)


## Installation, Build and Run
1) Clone the repository then create a file named `.env` and fill it out accordingly

1) Install typescript, To install TypeScript, you can run the following command in your terminal, This will install the latest version of TypeScript globally on your computer. (You can skip this if you already have typescript installed)
  ```ts
  npm install -g typescript
  ```
3) Compile your TypeScript code to JavaScript by running the following command:
```js
tsc
```
4) Once the build is complete it will generated a folder named `build` that contains compiled version of your ts code to js. You can run the following command in your terminal to run the project:
```js
npm start
```


## Configuration

To run this project you will need to put the following environment variables in .env file.

`DISCORD_TOKEN`

`DISCORD_CLIENT_ID`

`DISCORD_JOB_CHANNEL`

`DISCORD_CLIENT_ID`

`INSTAGRAM_SESSION_ID`


## References

 - [drawrowfly](https://github.com/drawrowfly/instagram-scraper)
 - [discord.js guide](https://github.com/drawrowfly/instagram-scraper](https://discordjs.guide/)https://discordjs.guide/)
