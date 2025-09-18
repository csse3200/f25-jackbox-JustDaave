    const API_URL = "https://jackbox-backend.onrender.com";


// Load submissions
function loadSubmissions() {
  fetch(`${API_URL}/submissions`)
    .then(res => res.json())
    .then(submissions => {
      const ul = document.getElementById("submissions");
      ul.innerHTML = "";
      submissions.forEach(sub => {
        const li = document.createElement("li");
        li.textContent = `${sub.team}: ${sub.answer}`;
        ul.appendChild(li);
      });
    })
}

function loadScores() {
  fetch(`${API_URL}/scores`)
    .then(res => res.json())
    .then(scores => {
      const ul = document.getElementById("scores");
      ul.innerHTML = "";
      scores.forEach(score => {
        const li = document.createElement("li");
        li.textContent = `${score.team}: ${score.points}`;
        ul.appendChild(li);
      });
    })
}

    // Handle form submission
    document.getElementById("answerForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const team = document.getElementById("team").value;
      const answer = document.getElementById("answer").value;
    

        const res = fetch(`https://jackbox-backend.onrender.com/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ team, answer })
        });
    
        document.getElementById("answer").value = "";
    
        // Reload submissions list
        loadSubmissions();
        
    });


    /*

    DON'T MODIFY ANYTHING BELOW THIS

    */
       const roundTime = 120; // seconds per round

    // Load prompt
    function loadPrompt() {
      fetch(API_URL + "/prompt")
        .then(response => response.json())
        .then(data => {
          document.getElementById("prompt").textContent = data.prompt;
          startTimer();
        })
        .catch(err => console.error("Error loading prompt:", err));
    }

    // Auto-refresh every 5s
    setInterval(function() {
      loadSubmissions();
      loadScores();
    }, 5000);

    // Countdown timer
    function startTimer() {
      let timeLeft = roundTime;
      const timerEl = document.getElementById("timer");
      timerEl.textContent = `Time left: ${timeLeft}s`;

      const interval = setInterval(function() {
        timeLeft--;
        if (timeLeft >= 0) {
          timerEl.textContent = `Time left: ${timeLeft}s`;
        } else {
          timerEl.textContent = "Time's up!";
          document.getElementById("answerForm").querySelector("button").disabled = true;
          clearInterval(interval);
        }
      }, 1000);
    }

    // Initialize
    loadPrompt();
    loadSubmissions();
    loadScores();