/**
 * SMS Smart Ground - Application Logic & Interactive Engine
 * Includes System Google Account Auth, Visitor Tracking, Grounds & Memberships CMS Sync Engine
 */

// ==========================================
// 1. Data Store: Default Grounds & Configurations
// ==========================================
const DEFAULT_GROUNDS = [
  {
    id: "g1",
    name: "Thunder Box Cricket Arena",
    sport: "cricket",
    sportLabel: "Cricket",
    icon: "sports_cricket",
    image: "https://images.unsplash.com/photo-1540822855330-cc30cf1b8121?auto=format&fit=crop&w=800&q=80",
    rating: 4.85,
    reviewsCount: 215,
    ratePerHour: 1200,
    dimensions: "120ft x 65ft Enclosed",
    surface: "High-Density Shock-Absorb Grass",
    capacity: "12 - 16 Players",
    status: "available",
    specs: ["High-Tension Netting", "Auto Bowling Machine", "LED Stumps & Bails", "Digital Scoreboard", "Night Floodlights"],
    description: "Fully enclosed, high-octane box cricket turf built for intense night matches with premium bounce and shock absorption."
  },
  {
    id: "g2",
    name: "Premier Football Arena (7v7 & 5v5)",
    sport: "football",
    sportLabel: "Football / Turf",
    icon: "sports_soccer",
    image: "assets/hero_football.jpg",
    rating: 4.9,
    reviewsCount: 148,
    ratePerHour: 1400,
    dimensions: "60m x 40m FIFA Standard",
    surface: "Grade-A FIFA Pro Artificial Turf",
    capacity: "14 - 18 Players",
    status: "available",
    specs: ["1000 Lux Floodlights", "Goal Line Tech", "HD Action Cameras", "Player Dugouts", "Locker Room"],
    description: "Championship-grade artificial turf football arena equipped with broadcast-standard LED floodlights and full perimeter padding."
  },
  {
    id: "g3",
    name: "Grand Slam Synthetic Tennis Court",
    sport: "tennis",
    sportLabel: "Tennis",
    icon: "sports_tennis",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    reviewsCount: 94,
    ratePerHour: 900,
    dimensions: "ITF Tournament Standard",
    surface: "8-Layer Acrylic Hard Court",
    capacity: "2 - 4 Players",
    status: "available",
    specs: ["Anti-Glare Floodlights", "Tennis Ball Machine", "Referee Chair", "Court Squeegee Tech", "Spectator Seating"],
    description: "ITF regulation tournament hard court with superior grip, true ball bounce, and zero glare night illumination."
  },
  {
    id: "g4",
    name: "Skyline Basketball Hardwood Arena",
    sport: "basketball",
    sportLabel: "Basketball",
    icon: "sports_basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    reviewsCount: 110,
    ratePerHour: 1000,
    dimensions: "Full NBA Court (94ft x 50ft)",
    surface: "Maple Hardwood with Cushioning",
    capacity: "10 - 15 Players",
    status: "available",
    specs: ["Glass Breakaway Rims", "24s Shot Clocks", "Air Conditioned", "Full Sound System", "Electronic Scoreboard"],
    description: "Indoor air-conditioned NBA regulation maple hardwood basketball arena designed for high-flying dunks and league games."
  },
  {
    id: "g5",
    name: "Olympic Badminton Center (4 Courts)",
    sport: "badminton",
    sportLabel: "Badminton",
    icon: "sports_tennis",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    reviewsCount: 180,
    ratePerHour: 750,
    dimensions: "4 BWF Certified Courts",
    surface: "Anti-Slip PVC Matting",
    capacity: "4 - 8 Players / Court",
    status: "available",
    specs: ["Shadowless LED Lights", "Yonex Certified Mats", "Locker & Shower Access", "Racket Restringing Pro Shop"],
    description: "BWF certified multi-court indoor badminton facility with anti-slip cushioned flooring and glare-free vertical lighting."
  }
];

const DEFAULT_MEMBERSHIPS = [
  {
    id: "mem-1",
    name: "Pay As You Play",
    tagline: "For casual weekend squads",
    price: 0,
    period: "/ month",
    badge: "",
    isFeatured: false,
    btnText: "Explore Grounds",
    btnAction: "explore",
    features: [
      "Book any arena on demand",
      "7-day advance booking window",
      "Free parking & locker access",
      "Digital match pass"
    ]
  },
  {
    id: "mem-2",
    name: "Weekend Warrior Pass",
    tagline: "For regular teams & weekly leagues",
    price: 3499,
    period: "/ month",
    badge: "Most Popular",
    isFeatured: true,
    btnText: "Get Started",
    btnAction: "subscribe",
    features: [
      "4x Prime Time 60-min slots included",
      "20% discount on all additional slots",
      "Free Pro Match Ball & Bibs rental",
      "14-day priority booking window",
      "HD match video recording included"
    ]
  },
  {
    id: "mem-3",
    name: "Corporate & Club Pass",
    tagline: "For corporate leagues & academies",
    price: 8999,
    period: "/ month",
    badge: "Enterprise",
    isFeatured: false,
    btnText: "Inquire Corporate",
    btnAction: "corporate",
    features: [
      "12x Dedicated arena slots / month",
      "Dedicated umpire & referee on-demand",
      "Custom tournament branding",
      "Unlimited video recording & analytics"
    ]
  }
];

const TIME_SLOTS = [
  { time: "06:00 AM - 07:00 AM", period: "morning", multiplier: 0.85, status: "available" },
  { time: "07:00 AM - 08:00 AM", period: "morning", multiplier: 0.85, status: "available" },
  { time: "08:00 AM - 09:00 AM", period: "morning", multiplier: 1.0, status: "booked" },
  { time: "09:00 AM - 10:00 AM", period: "morning", multiplier: 1.0, status: "available" },
  { time: "04:00 PM - 05:00 PM", period: "evening", multiplier: 1.1, status: "available" },
  { time: "05:00 PM - 06:00 PM", period: "evening", multiplier: 1.15, status: "fast" },
  { time: "06:00 PM - 07:00 PM", period: "night", multiplier: 1.25, status: "booked" },
  { time: "07:00 PM - 08:00 PM", period: "night", multiplier: 1.3, status: "available" },
  { time: "08:00 PM - 09:00 PM", period: "night", multiplier: 1.3, status: "available" },
  { time: "09:00 PM - 10:00 PM", period: "night", multiplier: 1.25, status: "available" },
  { time: "10:00 PM - 11:00 PM", period: "night", multiplier: 1.15, status: "available" }
];

const ADDONS = [
  { id: "ball", name: "Pro Match Ball Set", price: 150, icon: "sports_soccer" },
  { id: "bibs", name: "Team Bibs (Set of 14)", price: 120, icon: "checkroom" },
  { id: "referee", name: "Certified Umpire / Referee", price: 500, icon: "sports" },
  { id: "recording", name: "Full HD Match Video Recording", price: 450, icon: "videocam" },
  { id: "hydration", name: "Hydration Pack (10x Energy Drinks)", price: 300, icon: "local_drink" }
];

const OPEN_GAMES = [
  {
    id: "match-1",
    title: "Friday Night 7v7 Football Clash",
    sport: "Football",
    groundName: "Premier Football Arena",
    date: "Tonight",
    time: "08:00 PM - 09:00 PM",
    host: "FC Titans (Alex M.)",
    level: "Intermediate / Semi-Pro",
    joined: 11,
    maxPlayers: 14,
    costPerPlayer: "₹180 / player"
  },
  {
    id: "match-2",
    title: "Weekend Turbo Box Cricket League",
    sport: "Cricket",
    groundName: "Thunder Box Cricket Arena",
    date: "Tomorrow",
    time: "06:00 PM - 08:00 PM",
    host: "Super Strikers (Vikram)",
    level: "All Skill Levels",
    joined: 9,
    maxPlayers: 12,
    costPerPlayer: "₹160 / player"
  },
  {
    id: "match-3",
    title: "Doubles Tennis Casual Rally",
    sport: "Tennis",
    groundName: "Grand Slam Tennis Court",
    date: "Sunday",
    time: "07:00 AM - 08:30 AM",
    host: "Tennis Club (Sarah K.)",
    level: "Intermediate",
    joined: 3,
    maxPlayers: 4,
    costPerPlayer: "₹220 / player"
  }
];

// ==========================================
// 2. Application State & Storage Sync
// ==========================================
function getStoredGrounds() {
  const saved = localStorage.getItem("sg_grounds_data");
  return saved ? JSON.parse(saved) : DEFAULT_GROUNDS;
}

function saveGroundsToStorage(grounds) {
  localStorage.setItem("sg_grounds_data", JSON.stringify(grounds));
}

function getStoredMemberships() {
  const saved = localStorage.getItem("sg_memberships");
  return saved ? JSON.parse(saved) : DEFAULT_MEMBERSHIPS;
}

function saveMembershipsToStorage(memberships) {
  localStorage.setItem("sg_memberships", JSON.stringify(memberships));
}

function getRegisteredUsers() {
  const saved = localStorage.getItem("sg_registered_users");
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem("sg_registered_users", JSON.stringify(users));
}

function upsertRegisteredUser(profile) {
  if (!profile || !profile.email) return;

  const users = getRegisteredUsers();
  const normalizedEmail = profile.email.trim().toLowerCase();
  const existingIndex = users.findIndex(user => user.email && user.email.toLowerCase() === normalizedEmail);
  const normalizedProfile = {
    name: profile.name || "Unnamed User",
    email: normalizedEmail,
    role: profile.role || "Player",
    isAdmin: profile.isAdmin === true,
    loggedIn: profile.loggedIn === true,
    authProvider: profile.authProvider || "Google Account",
    picture: profile.picture || "",
    preferredSport: profile.preferredSport || "",
    phone: profile.phone || "",
    registeredAt: existingIndex >= 0 && users[existingIndex].registeredAt ? users[existingIndex].registeredAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    users[existingIndex] = { ...users[existingIndex], ...normalizedProfile };
  } else {
    users.push(normalizedProfile);
  }

  saveRegisteredUsers(users);
}

function getStoredAnnouncement() {
  return localStorage.getItem("sg_announcement") || "🎉 Special Night League: 20% OFF on all 9 PM - 11 PM slots this weekend! Use code: NIGHTPLAY";
}

function recordVisitor() {
  let count = parseInt(localStorage.getItem("sg_visitor_count") || "12480", 10);
  count += 1;
  localStorage.setItem("sg_visitor_count", count.toString());

  const viewsHistory = JSON.parse(localStorage.getItem("sg_views_history") || "[]");
  viewsHistory.push({ time: new Date().toISOString() });
  if (viewsHistory.length > 500) viewsHistory.shift();
  localStorage.setItem("sg_views_history", JSON.stringify(viewsHistory));

  return count;
}

const appState = {
  theme: localStorage.getItem("sg_theme") || "dark",
  user: JSON.parse(localStorage.getItem("sg_user")) || null,
  grounds: getStoredGrounds(),
  memberships: getStoredMemberships(),
  announcement: getStoredAnnouncement(),
  visitorCount: recordVisitor(),
  selectedGround: null,
  selectedDate: new Date().toISOString().split("T")[0],
  selectedSlots: [],
  selectedAddons: [],
  activeFilter: "all",
  bookings: JSON.parse(localStorage.getItem("sg_bookings")) || [
    {
      id: "SG-84291",
      groundName: "Premier Football Arena (7v7 & 5v5)",
      groundSport: "Football / Turf",
      date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      slot: "08:00 PM - 09:00 PM",
      totalAmount: 1750,
      status: "Confirmed",
      addons: ["Pro Match Ball Set", "Team Bibs (Set of 14)"],
      bookedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      user: "Rahul Verma"
    },
    {
      id: "SG-84110",
      groundName: "Thunder Box Cricket Arena",
      groundSport: "Cricket",
      date: new Date().toISOString().split("T")[0],
      slot: "06:00 PM - 07:00 PM",
      totalAmount: 1470,
      status: "Confirmed",
      addons: ["Pro Match Ball Set"],
      bookedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      user: "Amit Sharma"
    }
  ]
};

// ==========================================
// 3. Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupEventListeners();
  initAuthUI();
  syncAuthGate();

  if (!appState.user || !appState.user.loggedIn) {
    openAuthModal();
    const authModal = document.getElementById("authModal");
    if (authModal) {
      authModal.classList.add("active");
    }
    document.body.style.overflow = "hidden";
  }

  initAnnouncementBanner();
  renderGrounds("all");
  renderMemberships();
  renderOpenGames();
  updateBookingCountBadge();
  initDateInputs();
  initVisitorDisplay();
});

function initTheme() {
  document.documentElement.setAttribute("data-theme", appState.theme);
  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    themeIcon.textContent = appState.theme === "dark" ? "light_mode" : "dark_mode";
  }
}

function initDateInputs() {
  const today = new Date().toISOString().split("T")[0];
  const datePickers = document.querySelectorAll(".date-input-field");
  datePickers.forEach(input => {
    input.min = today;
    input.value = today;
  });
}

function initVisitorDisplay() {
  const el = document.getElementById("liveVisitorCount");
  if (el) {
    el.textContent = appState.visitorCount.toLocaleString();
  }
}

function initAnnouncementBanner() {
  const banner = document.getElementById("topAnnouncementBanner");
  const textEl = document.getElementById("announcementText");
  if (banner && textEl) {
    if (appState.announcement && appState.announcement.trim().length > 0) {
      textEl.textContent = appState.announcement;
      banner.style.display = "flex";
    } else {
      banner.style.display = "none";
    }
  }
}

// ==========================================
// 4. Google Account Sign-In & Sign-Up with Admin Key
// ==========================================
function syncAuthGate() {
  const isLoggedIn = !!(appState.user && appState.user.loggedIn);
  const authModal = document.getElementById("authModal");
  const protectedEls = document.querySelectorAll("header.site-header, .announcement-banner, main, footer");

  protectedEls.forEach(el => {
    el.style.display = isLoggedIn ? "" : "none";
  });

  document.body.classList.toggle("auth-locked", !isLoggedIn);

  if (authModal) {
    authModal.style.display = isLoggedIn ? "none" : "flex";
  }
}

function initAuthUI() {
  const navAuthBtn = document.getElementById("navAuthBtn");
  const userMenuWrap = document.getElementById("userProfileMenuWrap");
  const dropAdminLink = document.getElementById("dropAdminLink");

  if (!navAuthBtn || !userMenuWrap) return;

  if (appState.user && appState.user.loggedIn) {
    navAuthBtn.style.display = "none";
    userMenuWrap.style.display = "block";

    const avatar = document.getElementById("headerUserAvatar");
    const nameText = document.getElementById("headerUserName");
    const dropName = document.getElementById("dropUserName");
    const dropEmail = document.getElementById("dropUserEmail");
    const dropRole = document.getElementById("dropUserRole");

    if (avatar) avatar.src = appState.user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(appState.user.name)}&background=10b981&color=fff&bold=true`;
    if (nameText) nameText.textContent = appState.user.name.split(" ")[0];
    if (dropName) dropName.textContent = appState.user.name;
    if (dropEmail) dropEmail.textContent = appState.user.email;
    if (dropRole) dropRole.textContent = appState.user.role;

    // Show Admin Console link ONLY if user is verified as Admin
    if (dropAdminLink) {
      if (appState.user.isAdmin === true) {
        dropAdminLink.style.display = "flex";
      } else {
        dropAdminLink.style.display = "none";
      }
    }
  } else {
    navAuthBtn.style.display = "inline-flex";
    userMenuWrap.style.display = "none";
    if (dropAdminLink) dropAdminLink.style.display = "none";
  }
}

function toggleUserDropdown() {
  const drop = document.getElementById("userDropdownCard");
  if (drop) {
    drop.classList.toggle("show");
  }
}

document.addEventListener("click", (e) => {
  const wrap = document.getElementById("userProfileMenuWrap");
  const drop = document.getElementById("userDropdownCard");
  if (drop && wrap && !wrap.contains(e.target)) {
    drop.classList.remove("show");
  }
});

function openAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector(".modal-close-btn");
    if (closeBtn && (!appState.user || !appState.user.loggedIn)) {
      closeBtn.style.display = "none";
    }
  }
}

function closeAuthModal() {
  if (!appState.user || !appState.user.loggedIn) {
    showToast("Please sign in or register to continue.", "info");
    return;
  }

  const modal = document.getElementById("authModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  syncAuthGate();
}

function switchAuthTab(tabType) {
  const signInView = document.getElementById("googleSignInView");
  const signUpView = document.getElementById("googleSignUpView");
  const signInTab = document.getElementById("authTabSignIn");
  const signUpTab = document.getElementById("authTabSignUp");

  if (tabType === 'signin') {
    if (signInView) signInView.style.display = "block";
    if (signUpView) signUpView.style.display = "none";
    if (signInTab) { signInTab.classList.add("active"); signInTab.style.borderBottomColor = "var(--primary)"; signInTab.style.color = "var(--primary)"; }
    if (signUpTab) { signUpTab.classList.remove("active"); signUpTab.style.borderBottomColor = "transparent"; signUpTab.style.color = "var(--text-muted)"; }
  } else {
    if (signInView) signInView.style.display = "none";
    if (signUpView) signUpView.style.display = "block";
    if (signUpTab) { signUpTab.classList.add("active"); signUpTab.style.borderBottomColor = "var(--primary)"; signUpTab.style.color = "var(--primary)"; }
    if (signInTab) { signInTab.classList.remove("active"); signInTab.style.borderBottomColor = "transparent"; signInTab.style.color = "var(--text-muted)"; }
  }
}

const ADMIN_EMAIL_PRIMARY = String.fromCharCode(97,100,109,105,110,64,115,109,97,114,116,103,114,111,117,110,100,46,99,111,109);
const ADMIN_EMAIL_SECONDARY = String.fromCharCode(97,100,109,105,110,46,115,109,97,114,116,103,114,111,117,110,100,64,103,109,97,105,108,46,99,111,109);
var MASTER_ADMIN_PASS = String.fromCharCode(49,48,49,48,49,48);

// 1. Google Account Sign In (Checks for private admin credentials)
function handleGoogleInstantSignIn(accountType) {
  let profile;
  
  if (accountType === 'custom') {
    const emailInput = document.getElementById("googleCustomEmailInput")?.value.trim();
    const passInput = document.getElementById("googleCustomPassInput")?.value.trim();
    const nameInput = document.getElementById("googleCustomNameInput")?.value.trim();

    if (!emailInput || !emailInput.includes("@")) {
      showToast("Please enter a valid Google Account email address.", "error");
      return;
    }

    const isTargetAdmin = emailInput.toLowerCase() === ADMIN_EMAIL_PRIMARY || emailInput.toLowerCase() === ADMIN_EMAIL_SECONDARY || emailInput.toLowerCase().includes("admin");

    if (isTargetAdmin) {
      if (passInput === MASTER_ADMIN_PASS) {
        profile = {
          name: nameInput || "Marcus Cole (Ground Admin)",
          email: emailInput,
          picture: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
          role: "Ground Admin",
          isAdmin: true,
          loggedIn: true,
          authProvider: "Google Account"
        };
        sessionStorage.setItem("sg_admin_authenticated", "true");
        showToast("Admin access verified! Admin Console unlocked in profile menu. 🔓", "success");
      } else {
        showToast("Incorrect Admin Passcode.", "error");
        return;
      }
    } else {
      const displayName = nameInput || emailInput.split("@")[0].replace(".", " ");
      profile = {
        name: displayName,
        email: emailInput,
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=10b981&color=fff&bold=true`,
        role: "Athlete / Player",
        isAdmin: false,
        loggedIn: true,
        authProvider: "Google Account"
      };
      showToast(`Connected as athlete: ${profile.name}! ⚽`, "success");
    }
  } else {
    profile = {
      name: "Rahul Verma",
      email: "rahul.verma.sports@gmail.com",
      picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      role: "Regular Athlete",
      isAdmin: false,
      loggedIn: true,
      authProvider: "Google Account"
    };
    showToast(`Signed in as ${profile.name}! 🚀`, "success");
  }

  appState.user = profile;
  localStorage.setItem("sg_user", JSON.stringify(profile));
  upsertRegisteredUser(profile);

  initAuthUI();
  syncAuthGate();
  closeAuthModal();
}

// 2. Google Account Sign Up (Registration linked with Google ID)
function handleGoogleSignUp(event) {
  event.preventDefault();
  const name = document.getElementById("signupFullName")?.value.trim();
  const email = document.getElementById("signupGoogleEmail")?.value.trim();
  const pass = document.getElementById("signupPass")?.value.trim();
  const phone = document.getElementById("signupPhone")?.value.trim();
  const sport = document.getElementById("signupPrefSport")?.value;
  const role = document.getElementById("signupRole")?.value || "Regular Player";

  if (!name || !email || !email.includes("@")) {
    showToast("Please provide your full name and valid Google email.", "error");
    return;
  }

  const isAttemptingAdmin = role === "Ground Manager" || email.toLowerCase().includes("admin");

  let isAdminUser = false;
  if (isAttemptingAdmin) {
    if (pass === MASTER_ADMIN_PASS) {
      isAdminUser = true;
      sessionStorage.setItem("sg_admin_authenticated", "true");
      showToast("Registered as Ground Admin with full control access! 🛡️", "success");
    } else {
      showToast("Ground Manager role requires the private master pass.", "error");
      return;
    }
  } else {
    showToast(`Welcome to Smart Ground, ${name}! Your account is ready. 🏆`, "success");
  }

  const profile = {
    name: name,
    email: email,
    phone: phone,
    preferredSport: sport,
    picture: isAdminUser ? "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80" : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff&bold=true`,
    role: isAdminUser ? "Ground Admin" : role,
    isAdmin: isAdminUser,
    loggedIn: true,
    authProvider: "Google Account"
  };

  appState.user = profile;
  localStorage.setItem("sg_user", JSON.stringify(profile));
  upsertRegisteredUser(profile);

  initAuthUI();
  syncAuthGate();
  closeAuthModal();
}

function signOutUser() {
  appState.user = null;
  localStorage.removeItem("sg_user");
  sessionStorage.removeItem("sg_admin_authenticated");
  const drop = document.getElementById("userDropdownCard");
  if (drop) drop.classList.remove("show");
  initAuthUI();
  syncAuthGate();
  openAuthModal();
  showToast("Signed out of Google account.", "info");
}

// ==========================================
// 5. Grounds Catalog Rendering & CMS Sync
// ==========================================
function renderGrounds(filter) {
  const grid = document.getElementById("groundsGrid");
  if (!grid) return;

  appState.grounds = getStoredGrounds();
  const filtered = filter === "all" ? appState.grounds : appState.grounds.filter(g => g.sport === filter);

  grid.innerHTML = filtered.map(ground => {
    const isMaintenance = ground.status === "maintenance";
    return `
      <article class="ground-card glass-panel" data-id="${ground.id}">
        <div class="card-media-wrap">
          <img src="${ground.image}" alt="${ground.name}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80'" />
          <div class="card-media-overlay"></div>
          <div class="card-sport-badge">
            <span class="material-icons text-sm">${ground.icon || 'stadium'}</span>
            ${ground.sportLabel || ground.sport}
          </div>
          <div class="card-rating-badge">
            <span class="material-icons text-sm">star</span>
            ${ground.rating || 4.9} (${ground.reviewsCount || 100})
          </div>
        </div>
        
        <div class="card-body">
          <h3 class="card-title">${ground.name}</h3>
          <p class="card-desc">${ground.description || 'Modern sports arena equipped with professional turf and night illumination.'}</p>
          
          <div class="card-specs-list">
            <span class="spec-tag"><span class="material-icons text-xs">straighten</span> ${ground.dimensions}</span>
            <span class="spec-tag"><span class="material-icons text-xs">groups</span> ${ground.capacity}</span>
            <span class="spec-tag"><span class="material-icons text-xs">grass</span> ${ground.surface}</span>
            ${isMaintenance ? '<span class="spec-tag" style="color: var(--danger); border-color: var(--danger);"><span class="material-icons text-xs">build</span> Maintenance</span>' : ''}
          </div>

          <div class="card-footer">
            <div class="card-price-wrap">
              <span class="price-tag">₹${ground.ratePerHour}</span>
              <span class="price-unit">per 60-min slot</span>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              ${isMaintenance ? `
                <button class="btn btn-secondary" disabled style="opacity: 0.6; cursor: not-allowed;">
                  <span class="material-icons text-sm">construction</span>
                  Maintenance
                </button>
              ` : `
                <button class="btn btn-primary" onclick="openBookingModal('${ground.id}')">
                  <span class="material-icons text-sm">event_available</span>
                  Book Slot
                </button>
              `}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// ==========================================
// 6. Dynamic Memberships Rendering & Actions
// ==========================================
function renderMemberships() {
  const container = document.getElementById("membershipGrid");
  if (!container) return;

  const memberships = getStoredMemberships();
  container.innerHTML = memberships.map(m => {
    const isFeatured = m.isFeatured === true;
    return `
      <div class="pricing-card glass-panel ${isFeatured ? 'featured' : ''}" data-id="${m.id}">
        ${m.badge ? `<div class="pricing-badge">${m.badge}</div>` : ''}
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-main);">${m.name}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">${m.tagline}</p>
        <div class="pricing-amount">₹${parseInt(m.price, 10).toLocaleString()} <span>${m.period || '/ month'}</span></div>
        <ul class="pricing-features-list">
          ${m.features.map(f => `<li class="pricing-feature-item"><span class="material-icons">check</span> ${f}</li>`).join('')}
        </ul>
        ${m.btnAction === 'explore' ? `
          <a href="#groundsSection" class="btn btn-secondary" style="margin-top: auto;">${m.btnText || 'Explore Grounds'}</a>
        ` : `
          <button class="btn ${isFeatured ? 'btn-primary' : 'btn-secondary'}" onclick="handleMembershipAction('${m.id}', '${m.name}')" style="margin-top: auto;">${m.btnText || 'Get Started'}</button>
        `}
      </div>
    `;
  }).join('');
}

function handleMembershipAction(id, name) {
  showToast(`Selected membership: "${name}"! Our operations team has queued your activation. 🏆`, "success");
}

// ==========================================
// 7. Interactive Booking Engine Modal
// ==========================================
function openBookingModal(groundId) {
  const ground = appState.grounds.find(g => g.id === groundId);
  if (!ground) return;

  appState.selectedGround = ground;
  appState.selectedSlots = [];
  appState.selectedAddons = [];

  const modal = document.getElementById("bookingModal");
  if (!modal) return;

  document.getElementById("modalGroundTitle").textContent = ground.name;
  document.getElementById("modalGroundRate").textContent = `₹${ground.ratePerHour}/hr`;
  document.getElementById("modalGroundDimensions").textContent = ground.dimensions;
  document.getElementById("modalGroundCapacity").textContent = ground.capacity;
  document.getElementById("modalGroundSurface").textContent = ground.surface;
  
  const groundImg = document.getElementById("modalGroundImg");
  if (groundImg) groundImg.src = ground.image;

  const dateInput = document.getElementById("modalBookingDate");
  if (dateInput) {
    dateInput.value = appState.selectedDate;
  }

  renderSlotGrid(ground);
  renderAddonsList();
  updateModalSummary();

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function renderSlotGrid(ground) {
  const container = document.getElementById("slotsTimeGrid");
  if (!container) return;

  container.innerHTML = TIME_SLOTS.map((slot, index) => {
    const slotPrice = Math.round(ground.ratePerHour * slot.multiplier);
    const isBooked = slot.status === "booked";
    const isFast = slot.status === "fast";
    const isSelected = appState.selectedSlots.some(s => s.time === slot.time);

    let stateClass = "";
    let stateLabel = `<span class="slot-state-label" style="color: var(--primary);">Available</span>`;
    
    if (isBooked) {
      stateClass = "booked";
      stateLabel = `<span class="slot-state-label" style="color: var(--danger);">Occupied</span>`;
    } else if (isFast) {
      stateLabel = `<span class="slot-state-label" style="color: var(--accent);">Fast Filling</span>`;
    }

    if (isSelected) {
      stateClass += " selected";
    }

    return `
      <div class="slot-card-btn ${stateClass}" onclick="${isBooked ? '' : `toggleSlot('${slot.time}', ${slotPrice})`}">
        <span class="slot-time">${slot.time.split(" - ")[0]}</span>
        <span class="slot-price">₹${slotPrice}</span>
        ${stateLabel}
      </div>
    `;
  }).join("");
}

function toggleSlot(timeString, price) {
  const existingIdx = appState.selectedSlots.findIndex(s => s.time === timeString);
  if (existingIdx > -1) {
    appState.selectedSlots.splice(existingIdx, 1);
  } else {
    appState.selectedSlots.push({ time: timeString, price });
  }

  renderSlotGrid(appState.selectedGround);
  updateModalSummary();
}

function renderAddonsList() {
  const container = document.getElementById("addonsGrid");
  if (!container) return;

  container.innerHTML = ADDONS.map(addon => {
    const isChecked = appState.selectedAddons.some(a => a.id === addon.id);
    return `
      <label class="addon-card ${isChecked ? 'selected' : ''}" onclick="toggleAddon('${addon.id}', ${addon.price})">
        <input type="checkbox" class="addon-checkbox" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation();" onchange="toggleAddon('${addon.id}', ${addon.price})" />
        <span class="material-icons text-primary">${addon.icon}</span>
        <div style="flex-grow: 1;">
          <div style="font-weight: 600; font-size: 0.88rem;">${addon.name}</div>
          <div style="color: var(--primary); font-size: 0.8rem; font-weight: 700;">+₹${addon.price}</div>
        </div>
      </label>
    `;
  }).join("");
}

function toggleAddon(addonId, price) {
  const addonObj = ADDONS.find(a => a.id === addonId);
  if (!addonObj) return;

  const idx = appState.selectedAddons.findIndex(a => a.id === addonId);
  if (idx > -1) {
    appState.selectedAddons.splice(idx, 1);
  } else {
    appState.selectedAddons.push(addonObj);
  }

  renderAddonsList();
  updateModalSummary();
}

function updateModalSummary() {
  const slotsTotal = appState.selectedSlots.reduce((sum, s) => sum + s.price, 0);
  const addonsTotal = appState.selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const subtotal = slotsTotal + addonsTotal;
  const taxes = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + taxes;

  const slotsCountEl = document.getElementById("summarySlotsCount");
  const slotsTotalEl = document.getElementById("summarySlotsTotal");
  const addonsTotalEl = document.getElementById("summaryAddonsTotal");
  const taxEl = document.getElementById("summaryTax");
  const grandTotalEl = document.getElementById("summaryGrandTotal");
  const checkoutBtn = document.getElementById("proceedCheckoutBtn");

  if (slotsCountEl) slotsCountEl.textContent = `${appState.selectedSlots.length} slot(s) selected`;
  if (slotsTotalEl) slotsTotalEl.textContent = `₹${slotsTotal}`;
  if (addonsTotalEl) addonsTotalEl.textContent = `₹${addonsTotal}`;
  if (taxEl) taxEl.textContent = `₹${taxes}`;
  if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal}`;

  if (checkoutBtn) {
    if (appState.selectedSlots.length === 0) {
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = "0.5";
      checkoutBtn.style.cursor = "not-allowed";
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = "1";
      checkoutBtn.style.cursor = "pointer";
    }
  }
}

// ==========================================
// 8. Complete Booking & Generate Ticket Pass
// ==========================================
function completeBookingFlow() {
  if (appState.selectedSlots.length === 0) {
    showToast("Please select at least one available slot to book.", "error");
    return;
  }

  const bookingId = "SG-" + Math.floor(10000 + Math.random() * 90000);
  const slotsTotal = appState.selectedSlots.reduce((sum, s) => sum + s.price, 0);
  const addonsTotal = appState.selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const grandTotal = Math.round((slotsTotal + addonsTotal) * 1.05);

  const userName = appState.user && appState.user.loggedIn ? appState.user.name : "Guest Athlete";

  const newBooking = {
    id: bookingId,
    groundName: appState.selectedGround.name,
    groundSport: appState.selectedGround.sportLabel || appState.selectedGround.sport,
    date: document.getElementById("modalBookingDate").value || appState.selectedDate,
    slot: appState.selectedSlots.map(s => s.time).join(", "),
    addons: appState.selectedAddons.map(a => a.name),
    totalAmount: grandTotal,
    status: "Confirmed",
    bookedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    user: userName
  };

  appState.bookings.unshift(newBooking);
  localStorage.setItem("sg_bookings", JSON.stringify(appState.bookings));

  closeBookingModal();
  renderConfirmationTicket(newBooking);
  updateBookingCountBadge();
  showToast(`Booking ${bookingId} successfully confirmed! 🎉`, "success");
}

function renderConfirmationTicket(booking) {
  const ticketModal = document.getElementById("ticketModal");
  if (!ticketModal) return;

  document.getElementById("ticketIdText").textContent = booking.id;
  document.getElementById("ticketGroundName").textContent = booking.groundName;
  document.getElementById("ticketDate").textContent = booking.date;
  document.getElementById("ticketTime").textContent = booking.slot;
  document.getElementById("ticketAddons").textContent = booking.addons && booking.addons.length > 0 ? booking.addons.join(", ") : "None";
  document.getElementById("ticketAmount").textContent = `₹${booking.totalAmount}`;
  document.getElementById("ticketPlayerName").textContent = booking.user;

  ticketModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeTicketModal() {
  const ticketModal = document.getElementById("ticketModal");
  if (ticketModal) ticketModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function printDigitalTicket() {
  window.print();
}

// ==========================================
// 9. Community Open Games
// ==========================================
function renderOpenGames() {
  const grid = document.getElementById("openMatchesGrid");
  if (!grid) return;

  grid.innerHTML = OPEN_GAMES.map(game => `
    <div class="match-card glass-panel">
      <div class="match-header">
        <span class="match-sport-tag">${game.sport}</span>
        <span class="badge-tag" style="margin-bottom: 0;">${game.date}</span>
      </div>

      <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);">${game.title}</h4>
      
      <div class="match-meta-row">
        <span><span class="material-icons text-xs" style="vertical-align: middle;">stadium</span> ${game.groundName}</span>
        <span><span class="material-icons text-xs" style="vertical-align: middle;">schedule</span> ${game.time}</span>
        <span><span class="material-icons text-xs" style="vertical-align: middle;">stars</span> ${game.level}</span>
      </div>

      <div style="margin-top: 0.5rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600;">
          <span style="color: var(--text-muted);">Players Joined</span>
          <span style="color: var(--primary);">${game.joined} / ${game.maxPlayers}</span>
        </div>
        <div class="players-progress-bar">
          <div class="progress-fill" style="width: ${(game.joined / game.maxPlayers) * 100}%"></div>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
        <span style="font-weight: 700; color: var(--secondary); font-size: 0.95rem;">${game.costPerPlayer}</span>
        <button class="btn btn-secondary" style="padding: 0.45rem 1rem; font-size: 0.85rem;" onclick="joinMatch('${game.id}', '${game.title}')">
          <span class="material-icons text-xs">person_add</span>
          Join Match
        </button>
      </div>
    </div>
  `).join("");
}

function joinMatch(gameId, title) {
  showToast(`You have joined "${title}"! Check your email for match coordinates and team chat link. ⚽🏏`, "success");
}

// ==========================================
// 10. My Bookings Drawer
// ==========================================
function openMyBookingsDrawer() {
  const drawer = document.getElementById("myBookingsDrawer");
  if (!drawer) return;

  const listEl = document.getElementById("bookingsListContainer");
  if (listEl) {
    if (appState.bookings.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <span class="material-icons" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 1rem;">event_busy</span>
          <p style="font-weight: 600;">No active bookings found.</p>
          <p style="font-size: 0.85rem; margin-top: 0.3rem;">Explore our arenas and reserve your slot today!</p>
        </div>
      `;
    } else {
      listEl.innerHTML = appState.bookings.map(b => `
        <div class="glass-panel" style="padding: 1.25rem; margin-bottom: 1rem; border-left: 4px solid var(--primary);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-weight: 800; font-size: 0.85rem; color: var(--primary);">${b.id}</span>
            <span class="badge-tag" style="margin-bottom:0; padding: 0.2rem 0.6rem; font-size: 0.7rem;">${b.status}</span>
          </div>
          <h4 style="font-weight: 700; font-size: 1rem; margin-bottom: 0.35rem;">${b.groundName}</h4>
          <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.2rem;">
            <span><span class="material-icons text-xs" style="vertical-align:middle;">calendar_today</span> ${b.date} | ${b.slot}</span>
            <span><span class="material-icons text-xs" style="vertical-align:middle;">payments</span> Paid: ₹${b.totalAmount}</span>
          </div>
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button class="btn btn-secondary" style="padding: 0.35rem 0.8rem; font-size: 0.8rem;" onclick="viewPass('${b.id}')">
              <span class="material-icons text-xs">qr_code</span> View Pass
            </button>
            <button class="btn btn-secondary" style="padding: 0.35rem 0.8rem; font-size: 0.8rem; color: var(--danger); border-color: rgba(239, 68, 68, 0.3);" onclick="cancelBooking('${b.id}')">
              Cancel Slot
            </button>
          </div>
        </div>
      `).join("");
    }
  }

  drawer.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMyBookingsDrawer() {
  const drawer = document.getElementById("myBookingsDrawer");
  if (drawer) drawer.classList.remove("active");
  document.body.style.overflow = "auto";
}

function viewPass(bookingId) {
  const booking = appState.bookings.find(b => b.id === bookingId);
  if (booking) {
    closeMyBookingsDrawer();
    renderConfirmationTicket(booking);
  }
}

function cancelBooking(bookingId) {
  if (confirm(`Are you sure you want to cancel booking ${bookingId}? (Full refund policy applies up to 4 hours before slot).`)) {
    appState.bookings = appState.bookings.filter(b => b.id !== bookingId);
    localStorage.setItem("sg_bookings", JSON.stringify(appState.bookings));
    updateBookingCountBadge();
    openMyBookingsDrawer();
    showToast(`Booking ${bookingId} cancelled. Refund initiated to original payment method.`, "info");
  }
}

function updateBookingCountBadge() {
  const badge = document.getElementById("bookingCountBadge");
  if (badge) {
    badge.textContent = appState.bookings.length;
  }
}

// ==========================================
// 11. Quick Filter & Search Actions
// ==========================================
function handleQuickSearch() {
  const sportSelect = document.getElementById("quickSportSelect");
  const dateInput = document.getElementById("quickDateInput");
  
  if (sportSelect && dateInput) {
    const selectedSport = sportSelect.value;
    appState.selectedDate = dateInput.value;

    setFilter(selectedSport);

    const groundsSection = document.getElementById("groundsSection");
    if (groundsSection) {
      groundsSection.scrollIntoView({ behavior: "smooth" });
    }

    showToast(`Filtered arenas for ${selectedSport === 'all' ? 'All Sports' : selectedSport.toUpperCase()} on ${dateInput.value}.`, "info");
  }
}

function setFilter(sportCategory) {
  appState.activeFilter = sportCategory;
  
  const buttons = document.querySelectorAll(".filter-pill-btn");
  buttons.forEach(btn => {
    if (btn.getAttribute("data-filter") === sportCategory) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderGrounds(sportCategory);
}

// ==========================================
// 12. FAQ Accordion & Contact Form
// ==========================================
function toggleFaq(button) {
  const faqItem = button.closest(".faq-item");
  const isActive = faqItem.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));

  if (!isActive) {
    faqItem.classList.add("active");
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("contactName")?.value;
  showToast(`Thank you, ${name}! Your inquiry has been sent to our Ground Operations team. We will call you back shortly.`, "success");
  event.target.reset();
}

// ==========================================
// 13. Toast Notifications
// ==========================================
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-message toast-${type}`;
  
  let icon = "check_circle";
  if (type === "error") icon = "error";
  if (type === "info") icon = "info";

  toast.innerHTML = `
    <span class="material-icons text-lg">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================
// 14. Theme Toggle & Global Listeners
// ==========================================
function toggleTheme() {
  appState.theme = appState.theme === "dark" ? "light" : "dark";
  localStorage.setItem("sg_theme", appState.theme);
  initTheme();
}

function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNavMenu");
  if (mobileNav) {
    mobileNav.classList.toggle("active");
  }
}

function setupEventListeners() {
  document.querySelectorAll(".filter-pill-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      setFilter(filter);
    });
  });

  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });
}
