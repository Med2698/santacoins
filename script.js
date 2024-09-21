document.addEventListener("DOMContentLoaded", () => {
  const snowContainer = document.getElementById('snow-container');
  const counterElement = document.getElementById('counter');
  const timerElement = document.getElementById('timer');
  const resultContainer = document.getElementById('result-container');
  const continueButton = document.getElementById('continue-button');

  let counter = 0;
  let timeLeft = 60; // Set timer to 60 seconds

  // Create a candy element (instead of snowflake)
  function createSnowflake() {
    const candy = document.createElement('div');
    candy.classList.add('snowflake');
    candy.innerText = '🍬'; // Replace snowflake with candy emoji
    candy.style.left = `${Math.random() * 100}vw`;
    candy.style.animationDuration = `${3 + Math.random() * 5}s`;
    snowContainer.appendChild(candy);

    // Remove candy after animation ends
    candy.addEventListener('animationend', () => {
      candy.remove();
    });

    // On click/touch, remove candy and increment counter
    candy.addEventListener('click', () => {
      candy.remove();
      counter++;
      counterElement.textContent = `🍬 ${counter}`;
    });
  }

  // Create candies every 500ms
  let snowflakeInterval = setInterval(createSnowflake, 500);

  // Timer logic
  function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      let seconds = timeLeft < 10 ? `0${timeLeft}` : timeLeft; // Format seconds as two digits
      timerElement.textContent = `00:${seconds}`;
    } else {
      clearInterval(snowflakeInterval); // Stop generating new candies when timer runs out
      timerElement.textContent = 'Time’s Up!';

      // Stop and remove candies
      document.querySelectorAll('.snowflake').forEach(snowflake => {
        snowflake.remove();
      });

      // Show the score and continue button
      resultContainer.style.display = 'block';
      resultContainer.innerHTML = `<h2>You collected ${counter} 🍬</h2>`;
      continueButton.style.display = 'block'; // Show the continue button
    }
  }

  // Start the countdown timer
  let timerInterval = setInterval(updateTimer, 1000);

  // Continue button click logic
  continueButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect to home page
  });
});
