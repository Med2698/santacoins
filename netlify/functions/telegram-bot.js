const fetch = (await import('node-fetch')).default;

exports.handler = async function (event) {
  const body = JSON.parse(event.body); // Parse incoming Telegram update
  const chatId = body.message?.chat.id || body.callback_query?.message.chat.id; // Get chat ID
  const message = body.message?.text; // Get user's message
  const callbackData = body.callback_query?.data; // For inline button callbacks
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

  // If user sends "/start" or first interacts with the bot
  if (message === '/start') {
    // Send welcome message with GIF and inline button
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendAnimation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        animation: 'https://tenor.com/view/g5-games-sherlock-hidden-cases-christmas-merry-christmas-santa-gif-3232930354577746823',  // URL of your GIF
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

  // Respond to any other commands or handle button callbacks
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
};
