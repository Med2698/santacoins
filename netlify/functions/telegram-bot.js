const fetch = require('node-fetch'); // Use require for CommonJS environments

exports.handler = async function (event, context) {
  let body;
  try {
    body = JSON.parse(event.body); // Attempt to parse the body
  } catch (error) {
    // Handle the case where there is no or invalid body
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid or missing JSON input' }),
    };
  }

  const chatId = body.message?.chat?.id; // Get the user's chat ID (use optional chaining)
  const message = body.message?.text;   // Get the user's message text
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN; // Fetch the Telegram bot token from environment variables

  // If either chatId or message is missing, return an error
  if (!chatId || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid Telegram message data' }),
    };
  }

  // Respond to /start command
  let responseMessage = "🎅 Welcome to Santa Airdrop!";
  if (message === '/start') {
    responseMessage = '🎮 Play the game here: https://main--santacoins.netlify.app/';
  }

  // Send a message back to the user via Telegram Bot API
  try {
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
    // Handle fetch errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message to Telegram' }),
    };
  }
};
