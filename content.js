let speedToggled = false;
let intervalID;

document.addEventListener("keydown", function(event) {
  if (event.key === "b") {
    const video = document.querySelector("video");
    console.log("Initial video:", video);
    if (!video) return;

    // Toggle speed
    video.playbackRate = speedToggled ? 1.0 : 10;
    speedToggled = !speedToggled;
    console.log("Speed toggled to:", video.playbackRate);

    // Clear previous interval, if any
    clearInterval(intervalID);

    // Start new interval to poll for "Skip Ad" button
    intervalID = setInterval(() => {
      const skipButton = document.querySelector("button.ytp-ad-skip-button-modern.ytp-button");
      console.log("Skip button:", skipButton);

      if (skipButton) {
        skipButton.click();

        // Reset speed and rewind video after a delay
        setTimeout(() => {
          const newVideo = document.querySelector("video");
          console.log("New video:", newVideo);

          if (newVideo) {
            newVideo.playbackRate = 1.0;
            newVideo.currentTime -= 1; // Rewind the video by 100ms*10x = 1s
            speedToggled = false;
            console.log("Speed reset to:", newVideo.playbackRate, "and time reset to:", newVideo.currentTime);
          }
        }, 100);

        clearInterval(intervalID); // Stop the interval
      }
    }, 10);
  }
});
