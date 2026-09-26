const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const storageKey = "sana-sport-content";

document.querySelectorAll(".topbar .social").forEach((social) => {
  social.innerHTML =
    '<a class="social__link social__link--whatsapp" href="https://wa.me/77470947197" target="_blank" rel="noopener" aria-label="Написать в WhatsApp"><svg aria-hidden="true"><use href="images/social-icons.svg#whatsapp"></use></svg></a><a class="social__link social__link--instagram" href="https://www.instagram.com/sanasportkz/" target="_blank" rel="noopener" aria-label="Открыть Instagram Sana Sport"><svg aria-hidden="true"><use href="images/social-icons.svg#instagram"></use></svg></a>';
});

document.querySelector("#faq details[open]")?.removeAttribute("open");

document.querySelectorAll("#faq details").forEach((details) => {
  const summary = details.querySelector("summary");
  if (!summary) return;

  let currentAnimation;

  const finishAnimation = (shouldStayOpen) => {
    currentAnimation?.cancel();
    currentAnimation = undefined;
    details.open = shouldStayOpen;
    details.style.height = "";
  };

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    const isClosing = details.dataset.faqClosing === "true";
    if (currentAnimation) finishAnimation(!isClosing);

    const startHeight = details.offsetHeight;
    const shouldOpen = !details.open || isClosing;
    delete details.dataset.faqClosing;

    if (shouldOpen) {
      details.open = true;
    } else {
      details.dataset.faqClosing = "true";
      details.open = false;
    }

    const endHeight = details.offsetHeight;
    details.open = true;
    details.style.height = `${startHeight}px`;

    currentAnimation = details.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration: 200, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
    );

    currentAnimation.onfinish = () => {
      currentAnimation = undefined;
      details.open = shouldOpen;
      details.style.height = "";
      delete details.dataset.faqClosing;
    };
  });
});
const defaultContent = {
  heroTitle: "Sana Sport — Семейный\nспортивный центр",
  heroDescription:
    "Более 20 кружков спорта, творчества и образования\nна 10 000 м². Один центр — весь день ребёнка.",
  address: "г. Астана, ул. Кажымукана, 5",
  phone: "+7 (747) 094 71 97",
  heroImage: "images/placeholder.png",
  aboutImage: "images/waitingzone.png",
};

menuToggle.addEventListener("click", () => nav.classList.toggle("is-open"));
document
  .querySelectorAll(".nav a")
  .forEach((link) =>
    link.addEventListener("click", () => nav.classList.remove("is-open")),
  );

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.is-active").classList.remove("is-active");
    tab.classList.add("is-active");
  });
});

document.querySelector(".contact form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector(".form-status");
  status.textContent = "Спасибо! Мы свяжемся с вами в ближайшее время.";
  event.currentTarget.reset();
});

const adminPanel = document.querySelector("#admin-panel");
const adminForm = document.querySelector("#admin-form");
const adminStatus = document.querySelector("#admin-status");
if (adminForm) {
  let content = {
    ...defaultContent,
    ...JSON.parse(localStorage.getItem(storageKey) || "{}"),
  };

  function applyContent() {
    document.querySelector("#hero-title").innerHTML = content.heroTitle.replace(
      /\n/g,
      "<br>",
    );
    document.querySelector("#hero-description").innerHTML =
      content.heroDescription.replace(/\n/g, "<br>");
    document.querySelector("#site-address").textContent = content.address;
    const phone = document.querySelector("#site-phone");
    phone.textContent = content.phone;
    phone.href = `tel:${content.phone.replace(/[^\d+]/g, "")}`;
    const heroImage =
      content.heroImage &&
      !content.heroImage.includes("Hero image placeholder.png")
        ? content.heroImage
        : defaultContent.heroImage;
    document.querySelector(".visual--building img").src = heroImage;
    const aboutImage = content.aboutImage || defaultContent.aboutImage;
    document.querySelector(".visual--lounge img").src = aboutImage;
  }

  function fillAdminForm() {
    Object.entries(content).forEach(([key, value]) => {
      const field = adminForm.elements[key];
      if (field && field.type !== "file") field.value = value;
    });
  }

  function setAdminOpen(isOpen) {
    adminPanel.classList.toggle("is-open", isOpen);
    adminPanel.setAttribute("aria-hidden", String(!isOpen));
    if (isOpen) fillAdminForm();
  }

  function resizeImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const scale = Math.min(1, 1600 / image.width, 1200 / image.height);
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(image.width * scale);
          canvas.height = Math.round(image.height * scale);
          canvas
            .getContext("2d")
            .drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };
        image.onerror = reject;
        image.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  document
    .querySelector("#admin-open")
    .addEventListener("click", () => setAdminOpen(true));
  document
    .querySelector("#admin-close")
    .addEventListener("click", () => setAdminOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setAdminOpen(false);
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a")
      setAdminOpen(true);
  });

  adminForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(adminForm);
    content.heroTitle = formData.get("heroTitle").trim();
    content.heroDescription = formData.get("heroDescription").trim();
    content.address = formData.get("address").trim();
    content.phone = formData.get("phone").trim();
    for (const imageName of ["heroImage", "aboutImage"]) {
      const file = formData.get(imageName);
      if (file && file.size) content[imageName] = await resizeImage(file);
    }
    localStorage.setItem(storageKey, JSON.stringify(content));
    applyContent();
    adminStatus.textContent = "Изменения сохранены";
    setTimeout(() => {
      adminStatus.textContent = "";
    }, 2500);
  });

  document.querySelectorAll(".admin-remove").forEach((button) => {
    button.addEventListener("click", () => {
      content[button.dataset.image] = "";
      localStorage.setItem(storageKey, JSON.stringify(content));
      applyContent();
      fillAdminForm();
    });
  });

  document.querySelector("#admin-reset").addEventListener("click", () => {
    content = { ...defaultContent };
    localStorage.removeItem(storageKey);
    applyContent();
    fillAdminForm();
    adminStatus.textContent = "Восстановлены исходные данные";
  });

  applyContent();
}

const directionTabs = document.querySelectorAll(".direction-tab");
const directionCards = document.querySelectorAll(".direction-card");
const directionModal = document.querySelector("#direction-modal");

function openModal(modal) {
  if (!modal) return;
  modal.classList.remove("is-closing");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
  if (!modal || !modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  modal.classList.add("is-closing");
  modal.setAttribute("aria-hidden", "true");
  modal.addEventListener(
    "transitionend",
    (event) => {
      if (event.target === modal && event.propertyName === "opacity") {
        modal.classList.remove("is-closing");
      }
    },
    { once: true },
  );
}

function revealDirectionCards(cards) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const easing = getComputedStyle(document.documentElement)
    .getPropertyValue("--ease-out")
    .trim();

  cards.forEach((card, index) => {
    card.classList.add("is-revealed");
    card.directionFilterAnimation?.cancel();
    card.directionFilterAnimation = card.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 160,
        delay: Math.min(index, 3) * 30,
        easing,
      },
    );
  });
}

directionTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    directionTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    const category = tab.dataset.directionFilter;
    directionCards.forEach((card) =>
      card.classList.toggle(
        "is-hidden",
        category !== "all" && card.dataset.category !== category,
      ),
    );
    revealDirectionCards(
      [...directionCards].filter((card) => !card.classList.contains("is-hidden")),
    );
  });
});

function closeDirectionModal() {
  closeModal(directionModal);
}

directionCards.forEach((card) => {
  card.querySelector(".choose-direction").addEventListener("click", () => {
    document.querySelector("#modal-title").textContent = card.dataset.name;
    document.querySelector("#modal-age").textContent = card.dataset.age;
    document.querySelector("#modal-description").textContent =
      card.dataset.description;
    document.querySelector("#modal-image").style.backgroundImage =
      `url("${card.dataset.image}")`;
    openModal(directionModal);
  });
});

document
  .querySelector("#modal-close")
  ?.addEventListener("click", closeDirectionModal);
directionModal?.addEventListener("click", (event) => {
  if (event.target === directionModal) closeDirectionModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDirectionModal();
});

const shopFilters = document.querySelectorAll(".shop-filter");
const shopGroups = document.querySelectorAll(".shop-group");
const productCards = document.querySelectorAll(".product-card");
const shopModal = document.querySelector("#shop-modal");

shopFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    shopFilters.forEach((item) => item.classList.remove("is-active"));
    filter.classList.add("is-active");
    const category = filter.dataset.shopFilter;
    shopGroups.forEach((group) =>
      group.classList.toggle(
        "is-hidden",
        category !== "all" && group.dataset.shopGroup !== category,
      ),
    );
  });
});

function closeShopModal() {
  closeModal(shopModal);
}

productCards.forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelector("#shop-modal-title").textContent =
      card.dataset.product;
    document.querySelector("#shop-modal-price").textContent =
      card.dataset.price;
    document.querySelector("#shop-modal-image").className =
      `shop-modal__image ${card.querySelector(".product-image").className.replace("product-image", "")}`;
    const sizeSelect = document.querySelector("#shop-modal-size");
    sizeSelect.innerHTML = `<option>${card.dataset.size}</option><option>Уточнить размер</option>`;
    openModal(shopModal);
  });
});

document
  .querySelector("#shop-modal-close")
  ?.addEventListener("click", closeShopModal);
shopModal?.addEventListener("click", (event) => {
  if (event.target === shopModal) closeShopModal();
});

const newsCards = document.querySelectorAll(".news-card");
const newsModal = document.querySelector("#news-modal");

function closeNewsModal() {
  closeModal(newsModal);
}

newsCards.forEach((card) => {
  card.querySelector(".news-read").addEventListener("click", () => {
    document.querySelector("#news-modal-date").textContent =
      card.dataset.newsDate;
    document.querySelector("#news-modal-title").textContent =
      card.dataset.newsTitle;
    document.querySelector("#news-modal-text").textContent =
      card.dataset.newsText;
    document.querySelector("#news-modal-image").style.backgroundImage =
      `url("${card.dataset.newsImage}")`;
    openModal(newsModal);
  });
});

document
  .querySelector("#news-modal-close")
  ?.addEventListener("click", closeNewsModal);
newsModal?.addEventListener("click", (event) => {
  if (event.target === newsModal) closeNewsModal();
});

const parentArticles = document.querySelectorAll(".parent-article");
const parentModal = document.querySelector("#parent-modal");

function closeParentModal() {
  closeModal(parentModal);
}

parentArticles.forEach((article) => {
  article.querySelector(".parent-more").addEventListener("click", () => {
    document.querySelector("#parent-modal-title").textContent =
      article.dataset.parentTitle;
    document.querySelector("#parent-modal-text").textContent =
      article.dataset.parentText;
    document.querySelector("#parent-modal-image").style.backgroundImage =
      `url("${article.dataset.parentImage}")`;
    openModal(parentModal);
  });
});

document
  .querySelector("#parent-modal-close")
  ?.addEventListener("click", closeParentModal);
parentModal?.addEventListener("click", (event) => {
  if (event.target === parentModal) closeParentModal();
});

const mapSearchButton = document.querySelector("#map-search-button");
const mapAddressInput = document.querySelector("#map-address");
const contactMap = document.querySelector("#contact-map");
const mapExternal = document.querySelector("#map-external");
const mapStatus = document.querySelector("#map-status");

mapSearchButton?.addEventListener("click", () => {
  const address = mapAddressInput.value.trim();
  if (!address) {
    mapStatus.textContent = "Введите адрес для поиска";
    return;
  }
  const encodedAddress = encodeURIComponent(address);
  contactMap.src = `https://yandex.ru/map-widget/v1/?text=${encodedAddress}&z=16`;
  mapExternal.href = `https://yandex.ru/maps/?text=${encodedAddress}`;
  mapStatus.textContent = "Карта обновлена";
});

(function setupPageTransitions() {
  const duration = 600;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) return;

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      link.origin !== window.location.origin ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const destination = new URL(link.href);
    const isSameDocument =
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search;

    if (isSameDocument) return;

    event.preventDefault();
    document.body.classList.add("is-leaving");

    window.setTimeout(() => {
      window.location.assign(destination.href);
    }, duration);
  });

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      document.body.classList.remove("is-leaving");
    }
  });
})();

(function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

  const revealSelector = [
    "main > section",
    "footer.footer",
    ".direction-card",
    ".product-card",
    ".news-card",
    ".parent-article",
    ".tariff-card",
    ".rental-option",
    ".reminder-grid article",
  ].join(",");
  const revealTargets = document.querySelectorAll(revealSelector);
  const staggeredSelector = [
    ".direction-card",
    ".product-card",
    ".news-card",
    ".parent-article",
    ".tariff-card",
    ".rental-option",
    ".reminder-grid article",
  ].join(",");

  revealTargets.forEach((element) => {
    element.classList.add("reveal-on-scroll");

    if (element.matches(staggeredSelector)) {
      const siblings = [...element.parentElement.children];
      const siblingIndex = siblings.indexOf(element);
      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(siblingIndex, 4) * 70}ms`,
      );
    }
  });

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-revealed");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((element) => observer.observe(element));
})();
