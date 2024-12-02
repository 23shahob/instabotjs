require('dotenv').config(); // Load .env file

const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Bot is alive");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Get the token securely from the .env file
const token = process.env.BOT;

const bot = new TelegramBot(token, { polling: true });

// Bot checks for instagram.com anywhere in the text
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;
    const msg_id = msg.message_id;

    // Check if the message includes 'instagram.com'
    if (userInput && userInput.includes("instagram.com")) {
        // If the message contains 'instagram.com', delete it
        try {
            await bot.deleteMessage(chatId, msg_id);
            console.log("Instagram link deleted.");
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    } else {
        // If no Instagram link, reply with the user's message
        await bot.sendMessage(chatId, userInput, {
            reply_to_message_id: msg_id,
        });
    }
});

module.exports = app;
