function checkPassword() {
  const correctPassword = "ILoveYou";
  const entered = document.getElementById("password").value;

  if (entered === correctPassword) {
    document.getElementById("password-screen").style.display = "none";
    document.getElementById("content").style.display = "block";
    launchHearts();
  } else {
    document.getElementById("error-msg").style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const forgiveBtn = document.getElementById("forgive-btn");
  forgiveBtn.addEventListener("click", () => {
    const response = document.getElementById("response-msg");
    response.innerText = "Aww, thank you! 💕";
    launchHearts();
    openModal();
  });

  const passwordInput = document.getElementById("password");
  passwordInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkPassword();
    }
  });

  setupDragAndDrop(); // Updated to include mobile support
});

function launchHearts() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.innerText = "❤️";
    heart.style.position = "fixed";
    heart.style.fontSize = "24px";
    heart.style.top = Math.random() * window.innerHeight + "px";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.opacity = 1;
    heart.style.zIndex = 9999;
    heart.style.transition = "transform 2s ease-out, opacity 2s";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translateY(-100px) scale(1.5) rotate(${Math.random() * 360}deg)`;
      heart.style.opacity = 0;
    }, 100);

    setTimeout(() => {
      heart.remove();
    }, 2000);
  }
}

function openModal() {
  const envelope = document.getElementById("envelope-container");
  const modal = document.getElementById("letter-modal");
  const letterParagraph = document.getElementById("typed-letter");
  const messageBox = document.getElementById("response-message");
  const options = document.getElementById("forgive-options");

  letterParagraph.innerText = "";
  messageBox.innerHTML = "";
  messageBox.classList.add("hidden");
  options.classList.add("hidden");
  modal.classList.add("hidden");
  envelope.classList.remove("hidden");

  const envelopeEl = envelope.querySelector(".envelope");

  setTimeout(() => {
    envelopeEl.classList.add("open");

    setTimeout(() => {
      envelope.classList.add("hidden");
      modal.classList.remove("hidden");
      startTyping(letterParagraph);
    }, 1500);
  }, 500);
}

function startTyping(el) {
  const message = `I’m deeply sorry for the way I made you feel.  
You mean the world to me🌍  
Naa poga poga summa dhaan vilayaaditu irundhen unkooda. 
Una hurt pandradhu en intention eh ila🥲
Unaku naa samachu tharen, pudhusu pudhusa laam seiya theriyaadhu irundhaalum kathukitu atleast senju tharen!!
Please forgive me🥺   
\n— With all my love 💖`;

  let index = 0;
  const options = document.getElementById("forgive-options");

  function typeNext() {
    if (index < message.length) {
      el.innerText += message[index];
      index++;
      setTimeout(typeNext, 40);
    } else {
      options.classList.remove("hidden");
    }
  }

  typeNext();
}

function handleForgive(choice) {
  const messageBox = document.getElementById("response-message");
  const options = document.getElementById("forgive-options");

  options.classList.add("hidden");

  if (choice === "yes") {
    messageBox.innerHTML = "💗 Thank you Babe! I promise una hurt panaama iruka paakuren";
    setTimeout(() => {
      closeModal();
      document.getElementById("puzzle-section").classList.remove("hidden");
      scrollToSection("puzzle-section");
    }, 2000);
  } else {
    messageBox.innerHTML = "😢 I understand... I’ll wait and try again. <br> Consider panlaam la";
  }

  messageBox.classList.remove("hidden");
}

function closeModal() {
  const messageBox = document.getElementById("response-message");
  const options = document.getElementById("forgive-options");

  document.getElementById("letter-modal").classList.add("hidden");
  messageBox.classList.add("hidden");
  messageBox.innerHTML = "";
  options.classList.add("hidden");
}

function startPuzzle() {
  const puzzle = document.getElementById("puzzle-container");
  puzzle.classList.remove("hidden");
}

// ✅ Drag & Drop Puzzle Logic (with touch support)
function setupDragAndDrop() {
  const pieces = document.querySelectorAll(".puzzle-piece");
  const zones = document.querySelectorAll(".drop-zone");

  pieces.forEach(piece => {
    // Desktop drag
    piece.setAttribute("draggable", true);

    piece.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", piece.id);
    });

    // Touch support
    piece.addEventListener("touchstart", handleTouchStart, { passive: false });
    piece.addEventListener("touchmove", handleTouchMove, { passive: false });
    piece.addEventListener("touchend", handleTouchEnd, { passive: false });
  });

  zones.forEach(zone => {
    // Desktop drop
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.style.backgroundColor = "#fbe9e7";
    });

    zone.addEventListener("dragleave", () => {
      zone.style.backgroundColor = "#fff8f8";
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      const pieceId = e.dataTransfer.getData("text/plain");
      const piece = document.getElementById(pieceId);

      if (zone.children.length > 0) {
        const existing = zone.firstElementChild;
        document.querySelector('.puzzle-pieces').appendChild(existing);
      }
      zone.appendChild(piece);
      zone.style.backgroundColor = "#fff8f8";
      checkPuzzleCompletion();
    });
  });

  // Touch handling
  let activePiece = null;

  function handleTouchStart(e) {
    e.preventDefault();
    activePiece = e.target;
    activePiece.classList.add("dragging");
  }

  function handleTouchMove(e) {
    if (!activePiece) return;
    const touch = e.touches[0];
    activePiece.style.position = "fixed";
    activePiece.style.left = touch.clientX - activePiece.offsetWidth / 2 + "px";
    activePiece.style.top = touch.clientY - activePiece.offsetHeight / 2 + "px";
    activePiece.style.zIndex = 10000;
  }

  function handleTouchEnd(e) {
    if (!activePiece) return;

    activePiece.style.position = "";
    activePiece.style.left = "";
    activePiece.style.top = "";
    activePiece.style.zIndex = "";

    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

    if (dropTarget && dropTarget.classList.contains("drop-zone")) {
      if (dropTarget.children.length > 0) {
        const existing = dropTarget.firstElementChild;
        document.querySelector('.puzzle-pieces').appendChild(existing);
      }
      dropTarget.appendChild(activePiece);
      checkPuzzleCompletion();
    }

    activePiece.classList.remove("dragging");
    activePiece = null;
  }
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function checkPuzzleCompletion() {
  const dropZones = document.querySelectorAll('.drop-zone');
  let isComplete = true;

  dropZones.forEach((zone, index) => {
    const piece = zone.querySelector('img');
    if (!piece || piece.id !== `piece${index + 1}`) {
      isComplete = false;
    }
  });

  if (isComplete) {
    showPolaroidReveal();
  }
}

function showPolaroidReveal() {
  const puzzleSection = document.getElementById('puzzle-section');
  puzzleSection.classList.add('hidden');

  const polaroid = document.createElement('div');
  polaroid.className = 'polaroid-final';

  const img = document.createElement('img');
  img.src = 'puzzle/final_image.jpg'; // ← replace this with your actual final full image path
  img.alt = 'Complete';
  img.className = 'polaroid-img';

  const message = document.createElement('p');
  message.textContent = "We're better together! 💖";
  message.className = 'polaroid-message';

  polaroid.appendChild(img);
  polaroid.appendChild(message);

  document.body.appendChild(polaroid);
}