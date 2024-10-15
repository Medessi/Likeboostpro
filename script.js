let likeCount = 0;
    let boostCount = 0;
    let isLiked = false;
    const likeCountElement = document.getElementById('like-count');
    const boostCountElement = document.getElementById('boost-count');
    const boostAmountInput = document.getElementById('boost-amount');
    const boostButton = document.getElementById('boost-button');
    const likeButton = document.querySelector('.like-button');
    const nextBoostInfoElement = document.getElementById('next-boost-info');
    const boostProgressBar = document.getElementById('boost-progress-bar');

    function toggleLike() {
      if (isLiked) {
        likeCount--;
      } else {
        likeCount++;
      }
      isLiked = !isLiked;
      likeButton.classList.toggle('active');
      updateLikeCount();
    }

    function boost() {
      const boostAmount = parseInt(boostAmountInput.value);
      if (boostAmount > 0) {
        likeCount += boostAmount;
        boostCount++;
        updateLikeCount();
        updateBoostCount();
        animateBoost(boostAmount);
      }
    }

    function updateLikeCount() {
      likeCountElement.textContent = `${likeCount} J'aime${likeCount !== 1 ? 's' : ''}`;
    }

    function updateBoostCount() {
      boostCountElement.textContent = `${boostCount} Boost${boostCount !== 1 ? 's' : ''}`;
    }

    function animateBoost(amount) {
      boostButton.disabled = true;
      let added = 0;
      const interval = setInterval(() => {
        if (added < amount) {
          added++;
          likeCountElement.textContent = `${likeCount - amount + added} J'aime${(likeCount - amount + added) !== 1 ? 's' : ''}`;
        } else {
          clearInterval(interval);
          boostButton.disabled = false;
        }
      }, 20);
    }

    function autoBoost() {
      likeCount += 90;
      updateLikeCount();
      boostCount++;
      updateBoostCount();
    }

    function updateNextBoostTimer() {
      let seconds = 300;
      const timer = setInterval(() => {
        seconds--;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        nextBoostInfoElement.textContent = `Prochain boost dans : ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        boostProgressBar.style.width = `${(300 - seconds) / 3}%`;
        
        if (seconds <= 0) {
          clearInterval(timer);
          autoBoost();
          updateNextBoostTimer();
        }
      }, 1000);
    }

    // Start auto-boost timer
    updateNextBoostTimer();

    // Simulating app-like behavior
    document.addEventListener('touchstart', function(){}, true);

    // Prevent zoom on double tap
    document.addEventListener('dblclick', function(event) {
      event.preventDefault();
    }, { passive: false });

    function boost() {
      showPopup();
    }

    function showPopup() {
      const popupOverlay = document.getElementById('popupOverlay');
      popupOverlay.classList.add('active');
    }

    function hidePopup() {
      const popupOverlay = document.getElementById('popupOverlay');
      popupOverlay.classList.remove('active');
    }

    function redirectToLogin() {
      window.location.href = 'https://gigaconnex.onrender.com';
    }

    // Fermer le popup si l'utilisateur clique en dehors
    document.getElementById('popupOverlay').addEventListener('click', function(event) {
      if (event.target === this) {
        hidePopup();
      }
    });