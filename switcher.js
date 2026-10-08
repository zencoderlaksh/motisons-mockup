/**
 * Motisons Mockup Suite - Global Prototype Navigation Bar
 * Seamlessly links index.html, one.html, two.html, three.html, four.html
 * Works standalone on any page and deployed on Netlify.
 */
(function () {
  if (window.__motisonsSwitcherLoaded) return;
  window.__motisonsSwitcherLoaded = true;

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const normalizedCurrent = currentPath === "" ? "index.html" : currentPath.toLowerCase();

  const pages = [
    { id: "hub", name: "Hub", file: "index.html", num: "0", desc: "Master Portal" },
    { id: "one", name: "Flagship", file: "one.html", num: "1", desc: "Wealth & Capital Ecosystem" },
    { id: "two", name: "Onboarding", file: "two.html", num: "2", desc: "Digital KYC Flow" },
    { id: "three", name: "Universe", file: "three.html", num: "3", desc: "The Investment Universe" },
    { id: "four", name: "Wealth OS", file: "four.html", num: "4", desc: "Investor Experience" }
  ];

  // Inject Styles
  const style = document.createElement("style");
  style.id = "motisons-switcher-styles";
  style.textContent = `
    .ms-dock-container {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999999;
      font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }
    .ms-dock-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(5, 11, 22, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(214, 168, 79, 0.32);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65), 0 0 25px rgba(214, 168, 79, 0.12);
      padding: 6px 8px;
      border-radius: 9999px;
    }
    .ms-dock-brand {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 4px 12px 4px 8px;
      border-right: 1px solid rgba(255, 255, 255, 0.12);
      text-decoration: none;
      color: #F8FAFC;
    }
    .ms-dock-logo {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: linear-gradient(135deg, #F1D58A 0%, #D6A84F 50%, #B88A32 100%);
      color: #050B16;
      font-weight: 800;
      font-size: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: serif;
    }
    .ms-dock-brand-text {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #D6A84F;
    }
    .ms-dock-nav {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ms-dock-link {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      color: #94A3B8;
      text-decoration: none;
      transition: all 0.2s ease;
      position: relative;
      white-space: nowrap;
    }
    .ms-dock-link:hover {
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.07);
    }
    .ms-dock-link.active {
      color: #050B16;
      background: linear-gradient(135deg, #F1D58A 0%, #D6A84F 100%);
      font-weight: 700;
      box-shadow: 0 0 16px rgba(214, 168, 79, 0.45);
    }
    .ms-dock-badge {
      font-size: 9px;
      padding: 1px 5px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.12);
      color: currentColor;
      font-weight: 700;
    }
    .ms-dock-link.active .ms-dock-badge {
      background: rgba(5, 11, 22, 0.25);
    }
    .ms-dock-toggle {
      background: transparent;
      border: none;
      color: #94A3B8;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 50%;
      transition: all 0.2s;
      margin-left: 2px;
    }
    .ms-dock-toggle:hover {
      color: #D6A84F;
      background: rgba(255, 255, 255, 0.06);
    }
    /* Collapsed Pill */
    .ms-collapsed-badge {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      background: rgba(5, 11, 22, 0.92);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(214, 168, 79, 0.5);
      border-radius: 9999px;
      padding: 8px 16px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(214, 168, 79, 0.2);
      display: none;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.25s ease;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }
    .ms-collapsed-badge:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.7), 0 0 25px rgba(214, 168, 79, 0.35);
      border-color: #F1D58A;
    }
    .ms-shortcut-hint {
      display: inline-block;
      font-size: 8px;
      opacity: 0.65;
      padding: 1px 3px;
      border-radius: 3px;
      background: rgba(0, 0, 0, 0.3);
      margin-left: 2px;
    }

    @media (max-width: 768px) {
      .ms-dock-container {
        bottom: 12px;
        width: calc(100% - 24px);
        max-width: 480px;
      }
      .ms-dock-pill {
        justify-content: space-between;
        padding: 4px 6px;
        overflow-x: auto;
      }
      .ms-dock-brand-text {
        display: none;
      }
      .ms-dock-brand {
        padding: 4px 6px;
      }
      .ms-dock-link {
        padding: 6px 8px;
        font-size: 11px;
      }
      .ms-dock-badge {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);

  // Determine initial collapsed state
  const isCollapsed = localStorage.getItem("motisons_switcher_collapsed") === "true";

  // Build Container
  const container = document.createElement("div");
  container.className = "ms-dock-container";
  container.id = "motisons-dock";
  if (isCollapsed) container.style.display = "none";

  const pill = document.createElement("div");
  pill.className = "ms-dock-pill";

  // Brand button (links to index.html)
  const brand = document.createElement("a");
  brand.href = "index.html";
  brand.className = "ms-dock-brand";
  brand.title = "Return to Motisons Suite Portal";
  brand.innerHTML = `
    <div class="ms-dock-logo">M</div>
    <span class="ms-dock-brand-text">Motisons Suite</span>
  `;
  pill.appendChild(brand);

  // Navigation Links
  const nav = document.createElement("nav");
  nav.className = "ms-dock-nav";

  pages.forEach((page) => {
    const a = document.createElement("a");
    a.href = page.file;
    a.className = "ms-dock-link";
    const isActive = normalizedCurrent === page.file || (page.file === "index.html" && normalizedCurrent === "");
    if (isActive) a.classList.add("active");
    a.title = `${page.name} (${page.desc}) — Press '${page.num}' to switch`;
    a.innerHTML = `
      <span class="ms-dock-badge">${page.num}</span>
      <span>${page.name}</span>
    `;
    nav.appendChild(a);
  });
  pill.appendChild(nav);

  // Minimize button
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "ms-dock-toggle";
  toggleBtn.title = "Minimize switcher dock (Press 'M')";
  toggleBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="4 14 10 14 10 20"></polyline>
      <polyline points="20 10 14 10 14 4"></polyline>
    </svg>
  `;
  pill.appendChild(toggleBtn);
  container.appendChild(pill);
  document.body.appendChild(container);

  // Floating Minimized Button
  const collapsedBadge = document.createElement("div");
  collapsedBadge.className = "ms-collapsed-badge";
  collapsedBadge.id = "motisons-collapsed-badge";
  if (isCollapsed) collapsedBadge.style.display = "flex";

  const activePageObj = pages.find((p) => p.file === normalizedCurrent) || pages[0];
  collapsedBadge.innerHTML = `
    <div class="ms-dock-logo">M</div>
    <div style="display:flex; flex-direction:column; line-height:1.1;">
      <span style="font-size:11px; font-weight:700; color:#D6A84F; text-transform:uppercase; letter-spacing:0.05em;">Motisons</span>
      <span style="font-size:10px; color:#F8FAFC; font-weight:500;">${activePageObj.name}</span>
    </div>
    <span style="color:#94A3B8; font-size:11px; margin-left:4px;">▲</span>
  `;
  collapsedBadge.title = "Expand Motisons Mockup Switcher";
  document.body.appendChild(collapsedBadge);

  // Handlers for collapse/expand
  function collapseDock() {
    container.style.display = "none";
    collapsedBadge.style.display = "flex";
    localStorage.setItem("motisons_switcher_collapsed", "true");
  }

  function expandDock() {
    container.style.display = "block";
    collapsedBadge.style.display = "none";
    localStorage.setItem("motisons_switcher_collapsed", "false");
  }

  toggleBtn.addEventListener("click", collapseDock);
  collapsedBadge.addEventListener("click", expandDock);

  // Keyboard navigation shortcuts
  document.addEventListener("keydown", (e) => {
    // Avoid triggering when user is typing in inputs or textareas
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (e.target && e.target.isContentEditable)) {
      return;
    }
    if (e.key === "0" || e.key.toLowerCase() === "h") {
      window.location.href = "index.html";
    } else if (e.key === "1") {
      window.location.href = "one.html";
    } else if (e.key === "2") {
      window.location.href = "two.html";
    } else if (e.key === "3") {
      window.location.href = "three.html";
    } else if (e.key === "4") {
      window.location.href = "four.html";
    } else if (e.key.toLowerCase() === "m") {
      if (container.style.display === "none") {
        expandDock();
      } else {
        collapseDock();
      }
    }
  });
})();
