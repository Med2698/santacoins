const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body); // Parse the incoming Telegram update
    const chatId = body.message.chat.id; // Get the user's chat ID
    const message = body.message.text;   // Get the user's message text
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN; // Fetch the Telegram bot token from environment variables

    // Respond to /start command
    let responseMessage = "🎅 Welcome to Santa Airdrop!";
    if (message === '/start') {
      responseMessage = '🎮 Play the game here: https://main--santacoins.netlify.app/';
    }

    // Send a message back to the user via Telegram Bot API
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: responseMessage,
      }),
    });

    // Respond with a success status
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };
  } catch (error) {
    // Error handling
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
