(function () {
  const fp = document.getElementById("floating-player");
  if (!fp) return;

  const closeBtn = fp.querySelector(".floating-close-btn");
  const fpPlayBtn = fp.querySelector(".floating-play-btn");
  const fpProgress = fp.querySelector(".floating-progress");
  const fpTime = fp.querySelector(".floating-current-time");

  const slot5El = document.querySelector(".slot5-container");

  let audioBound = false;

  /* ---------------------------------------------------------
     APPEAR / DISAPPEAR ANIMATION
  --------------------------------------------------------- */

  function showFloatingPlayer() {
    syncPlayState();
    fp.classList.remove("hidden");
    fp.classList.add("visible");
  }

  function hideFloatingPlayer() {
    fp.classList.remove("visible");
    fp.classList.add("hidden");
  }

  /* ---------------------------------------------------------
     TIME + PROGRESS SYNC
  --------------------------------------------------------- */

  function formatTime(sec) {
    if (!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  }

  function syncPlayState() {
    if (!window.dvzAudio) return;

    const audio = window.dvzAudio;

    if (audio.paused) {
      fpPlayBtn.classList.remove("slot5-playing");
    } else {
      fpPlayBtn.classList.add("slot5-playing");
    }
  }

  function tryBindAudioEvents() {
    if (audioBound) return;
    if (!window.dvzAudio) return;

    const audio = window.dvzAudio;

    // PLAY: audio en marcha → estado global + iconos en ambos players
    audio.addEventListener("play", () => {
      if (window.dvzAudioState) {
        window.dvzAudioState.playing = true;
      }
      if (window.dvzAudioPlayer) {
        window.dvzAudioPlayer.classList.add("slot5-playing");
      }
      fpPlayBtn.classList.add("slot5-playing");
    });

    // PAUSE: audio pausado → estado global + iconos en ambos
    audio.addEventListener("pause", () => {
      if (window.dvzAudioState) {
        window.dvzAudioState.playing = false;
      }
      if (window.dvzAudioPlayer) {
        window.dvzAudioPlayer.classList.remove("slot5-playing");
      }
      fpPlayBtn.classList.remove("slot5-playing");
    });

    // ENDED: comportamiento como pause + reset visual
    audio.addEventListener("ended", () => {
      if (window.dvzAudioState) {
        window.dvzAudioState.playing = false;
      }
      if (window.dvzAudioPlayer) {
        window.dvzAudioPlayer.classList.remove("slot5-playing");
      }
      fpPlayBtn.classList.remove("slot5-playing");
      // El slot-5.js ya resetea currentTime, progress y texto.
    });

    audioBound = true;
  }

  // Intervalo para sincronizar tiempo + progress + fill
  setInterval(() => {
    // Intentar enganchar eventos cuando el audio exista
    tryBindAudioEvents();

    if (!window.dvzAudio) return;

    const audio = window.dvzAudio;

    fpProgress.max = audio.duration || 0;
    fpProgress.value = audio.currentTime || 0;
    fpTime.textContent = formatTime(audio.currentTime || 0);

    if (audio.duration && isFinite(audio.duration)) {
      const percent = (audio.currentTime / audio.duration) * 100;
      fpProgress.style.setProperty("--slot5-progress-fill", `${percent}%`);
    }
  }, 200);

  /* ---------------------------------------------------------
     INTERSECTION OBSERVER — lógica de visibilidad
     - Si el slot 5 entra al viewport → ocultar SIEMPRE.
     - Si sale y está reproduciendo → mostrar.
  --------------------------------------------------------- */

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        hideFloatingPlayer();
      } else {
        if (window.dvzAudioState?.playing) {
          showFloatingPlayer();
        }
      }
    },
    { threshold: 0.1 }
  );

  if (slot5El) {
    observer.observe(slot5El);
  }

  /* ---------------------------------------------------------
     CONTROLES DEL FLOATING PLAYER
  --------------------------------------------------------- */

  // Play/pause desde el floating player
  fpPlayBtn.addEventListener("click", () => {
    if (!window.dvzAudio) return;
    const audio = window.dvzAudio;

    if (audio.paused) {
      audio.play();
      // Los eventos 'play' del audio se encargan del resto.
    } else {
      audio.pause();
      // Los eventos 'pause' del audio se encargan del resto.
    }

    syncPlayState();
  });

  // Drag de progress en el floating player
  fpProgress.addEventListener("input", () => {
	  if (!window.dvzAudio) return;

	  const audio = window.dvzAudio;
	  const newTime = Number(fpProgress.value);

	  audio.currentTime = newTime;

	  // MISMA LÓGICA QUE SLOT 5 → SMOOTH
	  if (audio.duration && isFinite(audio.duration)) {
		const percent = (newTime / audio.duration) * 100;
		fpProgress.style.setProperty("--slot5-progress-fill", `${percent}%`);
	  }

	  fpTime.textContent = formatTime(newTime);
	});


  // Cerrar con la X: pausa + resetea iconos + oculta
  closeBtn.addEventListener("click", () => {
    if (!window.dvzAudio) return;

    const audio = window.dvzAudio;
    audio.pause(); // el listener de 'pause' deja todo en estado consistente
    hideFloatingPlayer();
  });

})();
