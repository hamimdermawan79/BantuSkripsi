import { PriceCalculator } from "./calculator.js";
import { OrderFlowModal } from "./orderFlow.js";
import { initComparisonViewer } from "./comparison.js";
import { initOrderTracker } from "./tracker.js";
import { fetchCampuses } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Initialize Price Calculator
  const calculator = new PriceCalculator();

  // 2. Initialize Order & Consultation Modal
  const orderModal = new OrderFlowModal({
    calculatorInstance: calculator
  });

  // 3. Connect package select buttons on pricing cards
  document.querySelectorAll(".btn-select-package").forEach(btn => {
    btn.addEventListener("click", () => {
      const pkgId = btn.getAttribute("data-package");
      if (pkgId) {
        calculator.setPackage(pkgId);
        const calcSection = document.getElementById("kalkulator");
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // 4. Initialize Before vs After Document Comparison
  initComparisonViewer();

  // 5. Initialize Direct Reference Order Tracker
  initOrderTracker();

  // 6. Transparent to Floating Navbar Transition
  const header = document.getElementById("site-header");
  const heroSection = document.getElementById("hero");
  const secondSection = document.getElementById("layanan");

  let isTicking = false;

  function updateNavbarState() {
    if (!header) return;

    const headerHeight = header.offsetHeight || 72;
    let isPastHero = false;

    if (secondSection) {
      const rect = secondSection.getBoundingClientRect();
      // Triggers floating navbar when entering the second section
      isPastHero = rect.top <= headerHeight + 5;
    } else if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      isPastHero = rect.bottom <= headerHeight + 5;
    } else {
      isPastHero = window.scrollY > 400;
    }

    if (isPastHero) {
      header.classList.add("floating", "scrolled");
    } else {
      header.classList.remove("floating", "scrolled");
    }

    isTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateNavbarState);
      isTicking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateNavbarState);
      isTicking = true;
    }
  }, { passive: true });

  // Initial check on load
  updateNavbarState();

  // 7. Navigation Dropdown & Mobile Menu
  const mobileToggle = document.getElementById("nav-mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove("mobile-open");
    if (mobileToggle) mobileToggle.classList.remove("active");
    document.body.classList.remove("menu-open");
    document.querySelectorAll(".has-dropdown.open").forEach(item => item.classList.remove("open"));
  }

  function toggleMobileMenu() {
    if (!navMenu) return;
    const isOpen = navMenu.classList.contains("mobile-open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      navMenu.classList.add("mobile-open");
      if (mobileToggle) mobileToggle.classList.add("active");
      document.body.classList.add("menu-open");
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close mobile drawer when clicking any regular navigation anchor link or CTA inside drawer
  if (navMenu) {
    navMenu.querySelectorAll("a, .btn").forEach(el => {
      el.addEventListener("click", () => {
        if (!el.classList.contains("dropdown-toggle")) {
          closeMobileMenu();
        }
      });
    });
  }

  // Dropdown toggles (Mobile Accordion / Click support)
  document.querySelectorAll(".has-dropdown").forEach(item => {
    const toggleBtn = item.querySelector(".dropdown-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = item.classList.contains("open");
          document.querySelectorAll(".has-dropdown.open").forEach(d => {
            if (d !== item) d.classList.remove("open");
          });
          if (!isOpen) {
            item.classList.add("open");
          } else {
            item.classList.remove("open");
          }
        }
      });
    }
  });

  // Close mobile menu / dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
      if (navMenu?.classList.contains("mobile-open")) {
        if (!e.target.closest("#nav-menu") && !e.target.closest("#nav-mobile-toggle")) {
          closeMobileMenu();
        }
      }
    } else {
      if (!e.target.closest(".has-dropdown")) {
        document.querySelectorAll(".has-dropdown.open").forEach(item => {
          item.classList.remove("open");
        });
      }
    }
  });

  // 8. Service Tabs Switcher (Naskah Akademik vs Laporan Korporat & Kontraktor)
  const tabAkademik = document.getElementById("tab-btn-akademik");
  const tabKorporat = document.getElementById("tab-btn-korporat");
  const panelAkademik = document.getElementById("tab-panel-akademik");
  const panelKorporat = document.getElementById("tab-panel-korporat");

  function switchServiceTab(tabName) {
    if (tabName === "korporat") {
      tabKorporat?.classList.add("active");
      tabAkademik?.classList.remove("active");
      if (panelKorporat) panelKorporat.style.display = "block";
      if (panelAkademik) panelAkademik.style.display = "none";
    } else {
      tabAkademik?.classList.add("active");
      tabKorporat?.classList.remove("active");
      if (panelAkademik) panelAkademik.style.display = "block";
      if (panelKorporat) panelKorporat.style.display = "none";
    }
  }

  tabAkademik?.addEventListener("click", () => switchServiceTab("akademik"));
  tabKorporat?.addEventListener("click", () => switchServiceTab("korporat"));

  // Dropdown links switching tab and scrolling
  document.querySelectorAll(".nav-service-switch").forEach(link => {
    link.addEventListener("click", () => {
      const targetTab = link.getAttribute("data-target-tab");
      if (targetTab) {
        switchServiceTab(targetTab);
      }
      navMenu?.classList.remove("mobile-open");
      document.querySelectorAll(".has-dropdown.open").forEach(item => item.classList.remove("open"));
    });
  });

  // 9. Populate Dynamic Campus List
  try {
    const campusRes = await fetchCampuses();
    if (campusRes.success && Array.isArray(campusRes.data)) {
      const campusSelects = document.querySelectorAll(".campus-select-input");
      campusSelects.forEach(select => {
        select.innerHTML = `<option value="">-- Pilih Perguruan Tinggi --</option>` +
          campusRes.data.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
      });
    }
  } catch (e) {
    // Static preset fallback
  }

  // 10. Dynamic Year in Footer
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
