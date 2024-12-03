const TelegramBot = require("node-telegram-bot-api");
// Replace with your own bot token
const TOKEN = process.env.BOT;
// Create a bot instance with polling
const bot = new TelegramBot(TOKEN, { polling: true });

// Handle incoming messages
bot.on("message", (msg) => {
  // Get the text message from the user
  const userMessage = msg.text;
  
  if (userMessage) {
    // Check if the message contains an Instagram link
    if (userMessage.includes("instagram.com")) {
      // Delete the message
      bot
        .deleteMessage(msg.chat.id, msg.message_id)
        .then(() => {
          // Send a warning to the user
          bot.sendMessage(
            msg.chat.id,
            "Instagramdan link tashlash taqiqlangan!"
          );
        })
        .catch((err) => {
          console.error("Error deleting message:", err);
        });
    }
  } else {
    console.log("Received an update without a message or text.");
  }
});

console.log("Bot is running...");
