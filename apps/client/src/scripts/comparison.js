/**
 * Multi-Category Document Comparison (Before vs After) Controller
 */

export function initComparisonViewer() {
  const categoryBtns = document.querySelectorAll(".comparison-category-btn");
  const panels = document.querySelectorAll(".comparison-panel");
  const toggleBtns = document.querySelectorAll(".comparison-toggle-btn");

  // Category Tab Switching
  if (categoryBtns.length && panels.length) {
    categoryBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        categoryBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const targetCat = btn.getAttribute("data-category");
        panels.forEach(p => {
          if (p.getAttribute("data-panel") === targetCat) {
            p.classList.add("active");
          } else {
            p.classList.remove("active");
          }
        });
      });
    });
  }

  // View Mode Switching (Split / Before / After)
  if (toggleBtns.length) {
    toggleBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        toggleBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const mode = btn.getAttribute("data-mode");
        const allGrids = document.querySelectorAll(".comparison-grid");

        allGrids.forEach(grid => {
          const beforeSide = grid.querySelector(".doc-side.before");
          const afterSide = grid.querySelector(".doc-side.after");

          if (mode === "split") {
            grid.style.gridTemplateColumns = "";
            if (beforeSide) beforeSide.style.display = "";
            if (afterSide) afterSide.style.display = "";
          } else if (mode === "before") {
            grid.style.gridTemplateColumns = "1fr";
            if (beforeSide) beforeSide.style.display = "";
            if (afterSide) afterSide.style.display = "none";
          } else if (mode === "after") {
            grid.style.gridTemplateColumns = "1fr";
            if (beforeSide) beforeSide.style.display = "none";
            if (afterSide) afterSide.style.display = "";
          }
        });
      });
    });
  }
}
