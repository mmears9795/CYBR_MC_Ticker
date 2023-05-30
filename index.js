import Web3 from 'web3';
import fetch from 'node-fetch';
import { Client, Intents, Guild, BitField } from 'discord.js';
import dotenv from 'dotenv';

const botToken = process.env.DISCORD_BOT_TOKEN;

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.on("ready", () => {
    console.log("The bot is ready");

    bot.user.setActivity("CYBR Market Cap", {type: 'WATCHING'});

	    const burnAmountInterval = setInterval (async function () {

		let totalMC = await getMC();

		console.log("Total MC: $" + totalMC);
		            
		let guilds = bot.guilds.cache.map(guild => guild.id);
		           
		guilds.forEach((id) => {
		    let guild = bot.guilds.cache.get(id);
		    guild.me.setNickname("$" + totalMC);
		});
    }, 30000);

});

async function getMC() {
  try {	
  const url = "https://thecyberenterprise.com/api/get_info.php";
  const response = await fetch(url, {
      method: 'GET',
      headers: {
          'accept': 'application/json',
      },
  }).then((response) => {
    return response.json();
  });
  const data = await response;
  return (data.dilutedMarketCap);
  } catch(error) {
      console.log(error);
      getMC();
  }
}

bot.login(process.env.DISCORD_BOT_TOKEN);
