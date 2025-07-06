const techs = ["Node.js", "Express", "React", "Vue", "Next.js", "Svelte", "Astro", "HTML/CSS", "Vite"];
  const techSpan = document.getElementById("tech-name");
  let index = 0;

  setInterval(() => {
    // Fade out
    techSpan.classList.add("opacity-0");

    setTimeout(() => {
      // Switch to next tech name
      index = (index + 1) % techs.length;
      techSpan.textContent = techs[index];

      // Fade back in
      techSpan.classList.remove("opacity-0");
    }, 500); // Wait for fade-out before switching text
  }, 2000); // Total loop: every 2 seconds
