document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggles = document.querySelectorAll("[data-theme-toggle]");
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme) {
    root.classList.toggle("dark", storedTheme === "dark");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.classList.add("dark");
  }

  const syncThemeButtons = () => {
    const isDark = root.classList.contains("dark");
    themeToggles.forEach((button) => {
      button.setAttribute("aria-pressed", isDark);
      button.textContent = isDark ? "☀️" : "🌙";
    });
  };

  if (themeToggles.length) {
    themeToggles.forEach((button) => {
      button.addEventListener("click", () => {
        root.classList.toggle("dark");
        localStorage.setItem(
          "theme",
          root.classList.contains("dark") ? "dark" : "light"
        );
        syncThemeButtons();
      });
    });
    syncThemeButtons();
  }
  const navToggles = document.querySelectorAll("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const mobileNavBackdrop = document.querySelector(
    "[data-mobile-nav-backdrop]"
  );

  if (navToggles.length && mobileNav) {
    const setMobileNavState = (isOpen) => {
      mobileNav.classList.toggle("hidden", !isOpen);
      if (mobileNavBackdrop) {
        mobileNavBackdrop.classList.toggle("hidden", !isOpen);
      }
      navToggles.forEach((button) => {
        button.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    };

    navToggles.forEach((button) => {
      button.addEventListener("click", () => {
        const nextOpen = mobileNav.classList.contains("hidden");
        setMobileNavState(nextOpen);
      });
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMobileNavState(false);
      });
    });

    if (mobileNavBackdrop) {
      mobileNavBackdrop.addEventListener("click", () => {
        setMobileNavState(false);
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMobileNavState(false);
      }
    });
  }

  document.querySelectorAll("[data-before-after]").forEach((container) => {
    const range = container.querySelector("input[type='range']");
    const afterImage = container.querySelector("[data-after-image]");
    const divider = container.querySelector("[data-divider]");

    if (!range || !afterImage || !divider) return;

    const update = () => {
      const value = range.value;
      afterImage.style.width = `${value}%`;
      divider.style.left = `${value}%`;
    };

    range.addEventListener("input", update);
    update();
  });

  const modal = document.querySelector("[data-diagram-modal]");
  if (modal) {
    const title = modal.querySelector("[data-modal-title]");
    const devices = modal.querySelector("[data-modal-devices]");
    const benefits = modal.querySelector("[data-modal-benefits]");
    const brands = modal.querySelector("[data-modal-brands]");
    const closeButtons = modal.querySelectorAll("[data-modal-close]");

    document.querySelectorAll("[data-diagram-zone]").forEach((zone) => {
      zone.addEventListener("click", () => {
        title.textContent = zone.dataset.title;
        devices.textContent = zone.dataset.devices;
        benefits.textContent = zone.dataset.benefits;
        brands.textContent = zone.dataset.brands;
        modal.classList.remove("hidden");
        document.body.classList.add("modal-open");
      });
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.classList.add("hidden");
        document.body.classList.remove("modal-open");
      });
    });
  }

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const items = carousel.querySelectorAll("[data-carousel-item]");
    if (!items.length) return;
    let index = 0;

    const show = () => {
      items.forEach((item, i) => {
        item.classList.toggle("hidden", i !== index);
      });
    };

    const next = () => {
      index = (index + 1) % items.length;
      show();
    };

    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        index = (index - 1 + items.length) % items.length;
        show();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", next);
    }

    show();
    setInterval(next, 6500);
  });

  document.querySelectorAll("[data-accordion]").forEach((item) => {
    const button = item.querySelector("button");
    const panel = item.querySelector("[data-accordion-panel]");
    const icon = item.querySelector("[data-accordion-icon]");
    if (!button || !panel) return;

    button.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("hidden");
      if (icon) {
        icon.classList.toggle("rotate-45", !isOpen);
      }
    });
  });

  const areaForm = document.querySelector("[data-area-form]");
  if (areaForm) {
    const input = areaForm.querySelector("input");
    const result = areaForm.querySelector("[data-area-result]");
    const cities = [
      "mumbai",
      "delhi",
      "bengaluru",
      "hyderabad",
      "pune",
      "chennai",
      "jaipur",
      "kolkata",
      "ahmedabad",
      "gurugram",
      "noida",
    ];

    areaForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim().toLowerCase();
      if (!value) return;
      const isAvailable = cities.includes(value);
      result.textContent = isAvailable
        ? `Great news! TechNest services are available in ${input.value}.`
        : `We're expanding soon. Leave your email and we'll notify you about ${input.value}.`;
      result.classList.toggle("text-emerald-600", isAvailable);
      result.classList.toggle("text-slate-600", !isAvailable);
    });
  }

  const authToggleButtons = document.querySelectorAll("[data-auth-toggle]");
  if (authToggleButtons.length) {
    const loginPanel = document.querySelector("[data-auth-login]");
    const registerPanel = document.querySelector("[data-auth-register]");

    const setAuthView = (target) => {
      authToggleButtons.forEach((btn) =>
        btn.classList.toggle("bg-blue-600", btn.dataset.authToggle === target)
      );
      authToggleButtons.forEach((btn) =>
        btn.classList.toggle("text-white", btn.dataset.authToggle === target)
      );
      authToggleButtons.forEach((btn) =>
        btn.classList.toggle("text-slate-600", btn.dataset.authToggle !== target)
      );
      if (loginPanel && registerPanel) {
        loginPanel.classList.toggle("hidden", target !== "login");
        registerPanel.classList.toggle("hidden", target !== "register");
      }
    };

    authToggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setAuthView(button.dataset.authToggle);
      });
    });

    if (window.location.hash === "#register") {
      setAuthView("register");
    }
  }

  const blogFilterButtons = document.querySelectorAll("[data-blog-filter]");
  if (blogFilterButtons.length) {
    const setActiveBlogFilter = (activeButton) => {
      blogFilterButtons.forEach((button) => {
        const isActive = button === activeButton;
        button.classList.toggle("border-slate-900", isActive);
        button.classList.toggle("text-slate-900", isActive);
        button.classList.toggle("shadow-sm", isActive);
        button.classList.toggle("border-slate-200", !isActive);
        button.classList.toggle("text-slate-600", !isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    };

    blogFilterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setActiveBlogFilter(button);
      });
    });
  }

  const animatedItems = document.querySelectorAll("[data-animate]");
  if (animatedItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedItems.forEach((item) => observer.observe(item));
  }
});
