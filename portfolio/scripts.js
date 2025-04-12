document.addEventListener("DOMContentLoaded", () => {
  const adjustSectionHeight = () => {
    const viewportHeight = window.innerHeight;
    document.querySelectorAll(".section").forEach(section => {
      section.style.minHeight = `${viewportHeight}px`;
    });
  };

  // Adjust section height on load and resize
  adjustSectionHeight();
  window.addEventListener("resize", adjustSectionHeight);
});
