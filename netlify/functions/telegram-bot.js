exports.handler = async function (event) {
  const fetch = (await import('node-fetch')).default; // Dynamically import node-fetch

  try {
    const body = JSON.parse(event.body); // Parse incoming Telegram update
    const chatId = body.message?.chat.id || body.callback_query?.message.chat.id; // Get chat ID
    const message = body.message?.text; // Get user's message
    const callbackData = body.callback_query?.data; // For inline button callbacks
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

    // Handle /start command
    if (message === '/start') {
      // Send a GIF with inline button
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendAnimation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          animation: 'https://example.com/your-animation-url.gif', // Replace with your GIF URL
          caption: '🎅 Welcome to Santa Airdrop!\n\nFarm Santa Coins, trade, and connect!\nMade by the Santa Team 🎁',
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Launch Santa Game', url: 'https://main--santacoins.netlify.app/' }
              ]
            ]
          }
        }),
      });
    }

    // Handle callback button press
    if (callbackData === 'launch_game') {
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: '🎮 Play the game here: https://main--santacoins.netlify.app/',
        }),
      });
    }

    // Return success
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message processed successfully!' }),
    };
  } catch (error) {
    // Log any errors and return failure
    console.error('Error handling request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
