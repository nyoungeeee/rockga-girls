import { ARCHIVE_DATA } from "./data.js";

(() => {
  "use strict";

  const data = ARCHIVE_DATA;
  const state = {
    query: "",
    itemFilter: "전체",
    transferFilter: "전체",
    expanded: { items: false, rooms: false, transfers: false },
  };

  const $ = (selector) => document.querySelector(selector);
  const normalize = (value) => String(value || "").toLowerCase().replace(/\s/g, "");
  const includesQuery = (values) => !state.query || normalize(values.join(" ")).includes(normalize(state.query));
  const displayLimit = () => (window.innerWidth < 720 ? 3 : 4);
  const linkAttrs = (url) => url && url !== "#" ? `href="${url}" target="_blank" rel="noopener noreferrer"` : `href="#" aria-disabled="true"`;

  function placeholder(name) {
    const initial = name.replace(/[^가-힣A-Za-z0-9]/g, "").slice(0, 2);
    return `<div class="image-placeholder" aria-label="${name} 이미지 없음"><span>✦</span><b>${initial}</b><small>IMAGE SOON</small></div>`;
  }

  function renderFilters(target, options, current, setter) {
    const container = $(target);
    container.innerHTML = options.map((option) =>
      `<button class="filter-chip ${option === current ? "is-active" : ""}" type="button" data-filter="${option}" aria-pressed="${option === current}">${option}</button>`
    ).join("");
    container.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => setter(button.dataset.filter)));
  }

  function itemCard(item) {
    const image = item.image
      ? `<img src="${item.image}" alt="${item.name}" data-name="${item.name}" loading="lazy" />`
      : placeholder(item.name);
    return `
      <article class="item-card">
        <div class="item-image">${image}<span class="category-tag">${item.category}</span></div>
        <div class="item-body">
          <div class="item-topline"><span>${item.shop}</span><span>${item.date.replaceAll(".", ".")}</span></div>
          <h3>${item.name}</h3>
          <p class="price">${item.price}</p>
          <div class="review"><span>후기</span><p>${item.review}</p></div>
          <div class="points">${item.points.map((point) => `<span>${point}</span>`).join("")}</div>
          <a class="text-link" ${linkAttrs(item.url)}>구매 링크 <span>↗</span></a>
        </div>
      </article>`;
  }

  function renderItems() {
    const all = data.items.filter((item) => (state.itemFilter === "전체" || item.category === state.itemFilter) && includesQuery([item.name, item.category, item.shop, item.review, ...item.points]));
    const visible = state.expanded.items ? all : all.slice(0, displayLimit());
    $("#item-grid").innerHTML = visible.map(itemCard).join("");
    $("#item-grid").querySelectorAll("img").forEach((image) => image.addEventListener("error", () => {
      image.outerHTML = placeholder(image.dataset.name);
    }, { once: true }));
    $("#items-count").textContent = `${all.length} ITEMS`;
    const more = $("#items-more");
    more.hidden = all.length <= displayLimit();
    more.innerHTML = state.expanded.items ? "<span>−</span> 접어 보기" : "<span>＋</span> 더 많은 아이템 보기";
    $("#items").classList.toggle("is-empty", all.length === 0);
  }

  function roomRow(room) {
    return `<tr><td><strong>${room.name}</strong></td><td>${room.description}</td><td><a class="table-link" ${linkAttrs(room.url)}>오픈카톡 입장하기 ↗</a></td><td><span class="note-dot ${room.active ? "" : "off"}"></span>${room.note}</td></tr>`;
  }

  function roomCard(room) {
    return `<article class="info-card">
      <div class="card-heading"><span class="status-label neutral">OPEN CHAT</span><span class="note-dot ${room.active ? "" : "off"}"></span></div>
      <h3>${room.name}</h3><p>${room.description}</p>
      <div class="card-note">${room.note}</div>
      <a class="outline-link" ${linkAttrs(room.url)}>오픈카톡 입장하기 <span>↗</span></a>
    </article>`;
  }

  function renderRooms() {
    const all = data.rooms.filter((room) => includesQuery([room.name, room.description, room.note]));
    const visible = state.expanded.rooms ? all : all.slice(0, displayLimit());
    $("#rooms-table").innerHTML = visible.map(roomRow).join("");
    $("#rooms-cards").innerHTML = visible.map(roomCard).join("");
    $("#rooms-count").textContent = `${all.length} ROOMS`;
    const more = $("#rooms-more");
    more.hidden = all.length <= displayLimit();
    more.innerHTML = state.expanded.rooms ? "<span>−</span> 접어 보기" : "<span>＋</span> 더 많은 파생방 보기";
    $("#rooms").classList.toggle("is-empty", all.length === 0);
  }

  const statusClass = (status) => status === "거래중" ? "trading" : status === "예약중" ? "reserved" : "done";

  function transferRow(item) {
    const disabled = item.status === "양도완료";
    return `<tr class="${disabled ? "is-done" : ""}"><td><strong>${item.event}</strong></td><td><span class="type-label ${item.type === "숙소" ? "stay" : ""}">${item.type}</span></td><td>${item.date}</td><td>${item.quantity}</td><td>${item.price}</td><td><span class="status-label ${statusClass(item.status)}">${item.status}</span></td><td><a class="table-link" ${linkAttrs(item.url)}>${disabled ? "거래 완료" : "상세 보기 ↗"}</a></td></tr>`;
  }

  function transferCard(item) {
    const disabled = item.status === "양도완료";
    return `<article class="info-card transfer-card ${disabled ? "is-done" : ""}">
      <div class="card-heading"><span class="type-label ${item.type === "숙소" ? "stay" : ""}">${item.type}</span><span class="status-label ${statusClass(item.status)}">${item.status}</span></div>
      <h3>${item.event}</h3>
      <dl><div><dt>날짜</dt><dd>${item.date}</dd></div><div><dt>수량</dt><dd>${item.quantity}</dd></div><div><dt>가격</dt><dd>${item.price}</dd></div><div><dt>거래</dt><dd>${item.method}</dd></div></dl>
      <div class="posted">게시일 ${item.posted}</div>
      <a class="outline-link" ${linkAttrs(item.url)}>${disabled ? "거래 완료" : "상세 보기"} <span>${disabled ? "" : "↗"}</span></a>
    </article>`;
  }

  function renderTransfers() {
    const all = data.transfers.filter((item) => (state.transferFilter === "전체" || item.type === state.transferFilter) && includesQuery([item.type, item.event, item.date, item.status, item.method]));
    const visible = state.expanded.transfers ? all : all.slice(0, displayLimit());
    $("#transfers-table").innerHTML = visible.map(transferRow).join("");
    $("#transfers-cards").innerHTML = visible.map(transferCard).join("");
    $("#transfers-count").textContent = `${all.length} POSTS`;
    const more = $("#transfers-more");
    more.hidden = all.length <= displayLimit();
    more.innerHTML = state.expanded.transfers ? "<span>−</span> 접어 보기" : "<span>＋</span> 완료된 글 포함 더 보기";
    $("#transfers").classList.toggle("is-empty", all.length === 0);
  }

  function renderAll() {
    renderItems(); renderRooms(); renderTransfers();
    const everythingEmpty = ["#items", "#rooms", "#transfers"].every((id) => $(id).classList.contains("is-empty"));
    $("#no-results").hidden = !everythingEmpty;
    $(".document").classList.toggle("has-no-results", everythingEmpty);
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  const itemCategories = ["전체", ...new Set(data.items.map((item) => item.category))];
  function bindItemFilters() {
    renderFilters("#item-filters", itemCategories, state.itemFilter, (filter) => { state.itemFilter = filter; state.expanded.items = false; bindItemFilters(); renderItems(); });
  }
  function bindTransferFilters() {
    renderFilters("#transfer-filters", ["전체", "티켓", "숙소"], state.transferFilter, (filter) => { state.transferFilter = filter; state.expanded.transfers = false; bindTransferFilters(); renderTransfers(); });
  }
  bindItemFilters(); bindTransferFilters(); renderAll();

  [["items", "#items-more"], ["rooms", "#rooms-more"], ["transfers", "#transfers-more"]].forEach(([key, selector]) => {
    $(selector).addEventListener("click", () => { state.expanded[key] = !state.expanded[key]; renderAll(); });
  });

  $("#search-form").addEventListener("submit", (event) => event.preventDefault());
  $("#site-search").addEventListener("input", (event) => { state.query = event.target.value; renderAll(); });
  $("#clear-search").addEventListener("click", () => { $("#site-search").value = ""; state.query = ""; renderAll(); $("#site-search").focus(); });
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#site-search").focus(); }
    if (event.key === "Escape" && document.activeElement === $("#site-search")) { $("#site-search").blur(); }
  });

  const menuButton = $(".menu-button");
  const mobileMenu = $("#mobile-menu");
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "메뉴 열기" : "메뉴 닫기");
    mobileMenu.hidden = open;
    document.body.classList.toggle("menu-open", !open);
  });
  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { mobileMenu.hidden = true; menuButton.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open"); }));

  $("#last-updated").textContent = `최근 업데이트 ${data.site.lastUpdated}`;
  $("#submit-link").href = data.site.submitUrl;
  $("#submit-link").target = "_blank";
  $("#submit-link").rel = "noopener noreferrer";
  $("#year").textContent = new Date().getFullYear();

  document.addEventListener("click", (event) => {
    const disabledLink = event.target.closest('a[aria-disabled="true"]');
    if (disabledLink) { event.preventDefault(); showToast("완료되었거나 준비 중인 링크예요."); }
  });

  const topButton = $("#to-top");
  window.addEventListener("scroll", () => topButton.classList.toggle("visible", window.scrollY > 700), { passive: true });
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("resize", () => renderAll());
})();
