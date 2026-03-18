(() => {
    "use strict";
    document.querySelectorAll(".select-field").forEach((select => {
        const input = select.querySelector(".select-field__input");
        const list = select.querySelector(".select-field__list");
        const items = list.querySelectorAll("li");
        input.addEventListener("focus", (() => {
            closeAll();
            select.classList.add("open");
        }));
        select.querySelector(".arrow-block").addEventListener("click", (e => {
            e.stopPropagation();
            closeAll();
            select.classList.toggle("open");
            input.focus();
        }));
        input.addEventListener("input", (() => {
            const value = input.value.toLowerCase();
            items.forEach((item => {
                item.style.display = item.textContent.toLowerCase().includes(value) ? "block" : "none";
            }));
        }));
        items.forEach((item => {
            item.addEventListener("click", (() => {
                input.value = item.textContent;
                select.classList.remove("open");
            }));
        }));
    }));
    function closeAll() {
        document.querySelectorAll(".select-field.open").forEach((el => el.classList.remove("open")));
    }
    document.addEventListener("click", (e => {
        if (!e.target.closest(".select-field")) closeAll();
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const scrollBtn = document.querySelector(".scroll");
        const nextSection = document.querySelector(".next-section");
        if (scrollBtn && nextSection) scrollBtn.addEventListener("click", (() => {
            nextSection.scrollIntoView({
                behavior: "smooth"
            });
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const sliderEl = document.querySelector(".response2-slider");
        const paginationContainer = document.querySelector(".response__pagination");
        const nextBtn = document.querySelector(".response__arrow--next");
        const prevBtn = document.querySelector(".response__arrow--prev");
        if (!sliderEl || !paginationContainer) return;
        const responseSwiper = new Swiper(sliderEl, {
            loop: false,
            speed: 700,
            slidesPerView: 4,
            spaceBetween: 24,
            grabCursor: true,
            simulateTouch: true,
            navigation: nextBtn && prevBtn ? {
                nextEl: nextBtn,
                prevEl: prevBtn
            } : false,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                440: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                668: {
                    slidesPerView: 3,
                    spaceBetween: 15
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 24
                }
            }
        });
        const MAX_BULLETS = 7;
        function updatePagination() {
            const slidesCount = responseSwiper.slides.length;
            const bulletsCount = Math.min(slidesCount, MAX_BULLETS);
            if (paginationContainer.childElementCount !== bulletsCount) {
                paginationContainer.innerHTML = "";
                for (let i = 0; i < bulletsCount; i++) {
                    const bullet = document.createElement("span");
                    bullet.className = "swiper-pagination-bullet";
                    if (i === 0) bullet.classList.add("swiper-pagination-bullet-active");
                    bullet.addEventListener("click", (() => {
                        responseSwiper.slideTo(i);
                    }));
                    paginationContainer.appendChild(bullet);
                }
            }
            const bullets = paginationContainer.querySelectorAll(".swiper-pagination-bullet");
            let activeIndex = responseSwiper.activeIndex;
            if (slidesCount > MAX_BULLETS) activeIndex %= MAX_BULLETS;
            bullets.forEach(((bullet, i) => {
                bullet.classList.toggle("swiper-pagination-bullet-active", i === activeIndex);
            }));
        }
        updatePagination();
        responseSwiper.on("slideChange", updatePagination);
        window.addEventListener("resize", updatePagination);
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const headers = document.querySelectorAll(".header");
            if (!headers.length) return;
            const handleScroll = () => {
                headers.forEach((header => {
                    if (window.scrollY > 200) header.classList.add("slidedown"); else header.classList.remove("slidedown");
                }));
            };
            window.addEventListener("scroll", handleScroll);
            handleScroll();
        } catch (e) {
            console.warn("Header scroll effect skipped:", e);
        }
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const burgers = document.querySelectorAll(".burger");
        const mobileMenus = document.querySelectorAll(".header__info.mobile-menu");
        const closeBtns = document.querySelectorAll(".mobile-menu__close");
        const overlay = document.querySelector(".menu-overlay");
        if (!burgers.length || !mobileMenus.length) return;
        burgers.forEach(((burger, index) => {
            const menu = mobileMenus[index];
            const closeBtn = closeBtns[index];
            const closeMenu = () => {
                menu.classList.remove("active");
                overlay.classList.remove("active");
                document.body.classList.remove("no-scroll");
            };
            burger.addEventListener("click", (() => {
                menu.classList.add("active");
                overlay.classList.add("active");
                document.body.classList.add("no-scroll");
            }));
            closeBtn?.addEventListener("click", closeMenu);
            const menuLinks = menu.querySelectorAll(".menu a");
            menuLinks.forEach((link => {
                link.addEventListener("click", closeMenu);
            }));
            overlay.addEventListener("click", closeMenu);
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const selects = document.querySelectorAll(".custom-select-first");
            if (!selects.length) return;
            selects.forEach((select => {
                const selected = select.querySelector(".custom-select__selected");
                const options = select.querySelectorAll(".custom-select__option");
                const text = select.querySelector(".custom-select__text");
                const arrow = select.querySelector(".custom-select__arrow");
                if (!selected || !options.length || !text || !arrow) return;
                selected.addEventListener("click", (e => {
                    e.stopPropagation();
                    select.classList.toggle("active");
                }));
                options.forEach((option => {
                    option.addEventListener("click", (() => {
                        options.forEach((o => o.classList.remove("selected")));
                        option.classList.add("selected");
                        text.textContent = option.textContent;
                        select.classList.remove("active");
                    }));
                }));
            }));
            document.addEventListener("click", (() => {
                selects.forEach((select => select.classList.remove("active")));
            }));
        } catch (err) {
            console.warn("Custom select error:", err);
        }
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const selects = document.querySelectorAll(".custom-select-services");
            if (!selects.length) return;
            selects.forEach((select => {
                const selected = select.querySelector(".custom-select__selected");
                if (!selected) return;
                selected.addEventListener("click", (e => {
                    e.stopPropagation();
                    select.classList.toggle("active");
                }));
            }));
            document.addEventListener("click", (() => {
                selects.forEach((select => select.classList.remove("active")));
            }));
        } catch (err) {}
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const sliderEl = document.querySelector(".result__swiper");
        const paginationContainer = document.querySelector(".result__pagination");
        const nextBtn = document.querySelector(".result__arrow--next");
        const prevBtn = document.querySelector(".result__arrow--prev");
        if (!sliderEl || !paginationContainer) return;
        const resultSwiper = new Swiper(sliderEl, {
            loop: false,
            speed: 700,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 55
                }
            },
            grabCursor: true,
            simulateTouch: true,
            watchOverflow: true,
            on: {
                init(swiper) {
                    swiper.update();
                    swiper.navigation.update();
                },
                resize(swiper) {
                    swiper.update();
                    swiper.navigation.update();
                }
            }
        });
        const MAX_BULLETS = 7;
        function createPagination() {
            const slidesCount = resultSwiper.slides.length;
            const bulletsCount = Math.min(slidesCount, MAX_BULLETS);
            paginationContainer.innerHTML = "";
            for (let i = 0; i < bulletsCount; i++) {
                const bullet = document.createElement("span");
                bullet.className = "swiper-pagination-bullet";
                bullet.addEventListener("click", (() => {
                    resultSwiper.slideTo(i);
                }));
                paginationContainer.appendChild(bullet);
            }
        }
        function updatePagination() {
            const bullets = paginationContainer.querySelectorAll(".swiper-pagination-bullet");
            let activeIndex = resultSwiper.activeIndex;
            const slidesCount = resultSwiper.slides.length;
            if (slidesCount > MAX_BULLETS) activeIndex %= MAX_BULLETS;
            bullets.forEach(((bullet, index) => {
                bullet.classList.toggle("swiper-pagination-bullet-active", index === activeIndex);
            }));
        }
        createPagination();
        updatePagination();
        resultSwiper.on("slideChange", updatePagination);
        window.addEventListener("load", (() => {
            setTimeout((() => {
                resultSwiper.update();
                resultSwiper.navigation.update();
            }), 50);
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const sliderEl = document.querySelector(".team__slider");
        const paginationContainer = document.querySelector(".team__pagination");
        if (!sliderEl || !paginationContainer) return;
        const hiddenSlides = sliderEl.querySelectorAll(".team__slide.team__slide--text");
        const teamSwiper = new Swiper(sliderEl, {
            loop: false,
            speed: 700,
            navigation: {
                nextEl: ".team__arrow--next",
                prevEl: ".team__arrow--prev"
            },
            grabCursor: true,
            simulateTouch: true,
            slidesPerView: 4,
            spaceBetween: 32,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 32
                }
            }
        });
        function updateHiddenSlides() {
            const width = window.innerWidth;
            hiddenSlides.forEach((slide => {
                const slideIndex = Array.from(teamSwiper.slides).indexOf(slide);
                if (width <= 576) {
                    if (slideIndex >= 0) teamSwiper.removeSlide(slideIndex);
                } else if (slideIndex === -1) teamSwiper.appendSlide(slide);
            }));
        }
        updateHiddenSlides();
        window.addEventListener("resize", (() => {
            updateHiddenSlides();
            updatePagination();
        }));
        const MAX_BULLETS = 7;
        function updatePagination() {
            const slidesCount = teamSwiper.slides.length;
            const bulletsCount = Math.min(slidesCount, MAX_BULLETS);
            if (paginationContainer.childElementCount !== bulletsCount) {
                paginationContainer.innerHTML = "";
                for (let i = 0; i < bulletsCount; i++) {
                    const bullet = document.createElement("span");
                    bullet.className = "swiper-pagination-bullet";
                    if (i === 0) bullet.classList.add("swiper-pagination-bullet-active");
                    bullet.addEventListener("click", (() => {
                        teamSwiper.slideTo(i);
                    }));
                    paginationContainer.appendChild(bullet);
                }
            }
            const bullets = paginationContainer.querySelectorAll(".swiper-pagination-bullet");
            let activeIndex = teamSwiper.activeIndex;
            if (slidesCount > MAX_BULLETS) activeIndex %= MAX_BULLETS;
            bullets.forEach(((bullet, i) => {
                bullet.classList.toggle("swiper-pagination-bullet-active", i === activeIndex);
            }));
        }
        updatePagination();
        teamSwiper.on("slideChange", updatePagination);
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const items = document.querySelectorAll(".popular-questions__item");
            if (!items.length) return;
            items.forEach((item => {
                const header = item.querySelector(".popular-questions__header");
                const content = item.querySelector(".popular-questions__content");
                const servicesWrapper = item.querySelector(".popular-questions-services__wrapper");
                if (!header) return;
                const openItem = () => {
                    item.classList.add("active");
                    if (content) requestAnimationFrame((() => {
                        content.style.maxHeight = content.scrollHeight + 20 + "px";
                        content.style.opacity = "1";
                    }));
                    if (servicesWrapper) {
                        servicesWrapper.style.maxHeight = servicesWrapper.scrollHeight + "px";
                        servicesWrapper.style.opacity = "1";
                    }
                };
                const closeItem = () => {
                    item.classList.remove("active");
                    if (content) {
                        content.style.maxHeight = null;
                        content.style.opacity = "0";
                    }
                    if (servicesWrapper) {
                        servicesWrapper.style.maxHeight = null;
                        servicesWrapper.style.opacity = "0";
                    }
                };
                if (item.classList.contains("active")) openItem();
                header.addEventListener("click", (() => {
                    const isActive = item.classList.contains("active");
                    items.forEach((el => {
                        if (el !== item) try {
                            const elContent = el.querySelector(".popular-questions__content");
                            const elServicesWrapper = el.querySelector(".popular-questions-services__wrapper");
                            el.classList.remove("active");
                            if (elContent) {
                                elContent.style.maxHeight = null;
                                elContent.style.opacity = "0";
                            }
                            if (elServicesWrapper) {
                                elServicesWrapper.style.maxHeight = null;
                                elServicesWrapper.style.opacity = "0";
                            }
                        } catch (e) {}
                    }));
                    isActive ? closeItem() : openItem();
                }));
            }));
        } catch (e) {}
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const STORAGE_KEY = "cleaningOrder";
        const TAB_KEY = "cleaningTabs_packages01";
        const root = document.querySelector(".packages-01");
        if (!root) return;
        const isCalculatePage = document.querySelector(".calculate") !== null;
        const hasTabs = root.querySelectorAll(".packages__tab").length > 0;
        function getOrder() {
            try {
                const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
                return {
                    type: data.type || null,
                    service: data.service || null,
                    extras: Array.isArray(data.extras) ? data.extras : []
                };
            } catch {
                return {
                    type: null,
                    service: null,
                    extras: []
                };
            }
        }
        function saveOrder(order) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
            window.dispatchEvent(new Event("orderUpdated"));
        }
        function getSavedTab() {
            return localStorage.getItem(TAB_KEY);
        }
        function saveTab(area) {
            localStorage.setItem(TAB_KEY, area);
        }
        function openTab(area) {
            if (!hasTabs) return;
            root.querySelectorAll(".packages__tab").forEach((tab => {
                tab.classList.toggle("active", tab.dataset.area === area);
            }));
            root.querySelectorAll(".packages-slide").forEach((slide => {
                slide.classList.toggle("is-hidden", slide.dataset.area !== area);
            }));
            saveTab(area);
        }
        if (hasTabs) {
            root.querySelectorAll(".packages__tab").forEach((tab => {
                tab.addEventListener("click", (() => openTab(tab.dataset.area)));
            }));
            const saved = getSavedTab();
            const def = root.querySelector('.packages__tab[data-area="60"]')?.dataset.area;
            openTab(saved || def);
        }
        function syncUI() {
            const order = getOrder();
            const current = order.service;
            root.querySelectorAll(".order-btn:not(.season-ticket-btn)").forEach((btn => {
                const isSelected = current && btn.dataset.name === current.name && btn.dataset.area === current.area;
                btn.classList.toggle("is-selected", isSelected);
                btn.textContent = isSelected ? "Вибрано" : "Замовити";
            }));
            root.querySelectorAll(".packages-slide").forEach((slide => {
                const isSelected = current && slide.dataset.name === current.name && slide.dataset.area === current.area;
                slide.classList.toggle("is-selected", isSelected);
            }));
        }
        root.addEventListener("click", (function(e) {
            if (e.target.closest(".see-more")) return;
            if (e.target.closest(".season-ticket-btn")) return;
            const order = getOrder();
            if (!isCalculatePage) {
                const button = e.target.closest(".order-btn");
                if (!button) return;
                e.preventDefault();
                const service = {
                    name: button.dataset.name,
                    area: button.dataset.area,
                    price: Number(button.dataset.price)
                };
                const isSame = order.service && order.service.name === service.name && order.service.area === service.area;
                if (isSame) {
                    saveOrder({
                        type: "one-time",
                        service: null,
                        extras: []
                    });
                    return;
                }
                saveOrder({
                    type: "one-time",
                    service,
                    extras: []
                });
                const link = button.getAttribute("href");
                if (link && link !== "#") window.location.href = link;
                return;
            }
            const slide = e.target.closest(".packages-slide");
            if (!slide) return;
            const service = {
                name: slide.dataset.name,
                area: slide.dataset.area,
                price: Number(slide.dataset.price)
            };
            const isSame = order.service && order.service.name === service.name && order.service.area === service.area;
            if (isSame) {
                saveOrder({
                    type: "one-time",
                    service: null,
                    extras: []
                });
                return;
            }
            saveOrder({
                type: "one-time",
                service,
                extras: []
            });
        }));
        syncUI();
        window.addEventListener("orderUpdated", syncUI);
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const STORAGE_KEY = "cleaningOrder";
        const DEFAULT_TAB = "zones";
        function getOrder() {
            try {
                const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
                return {
                    type: data.type || null,
                    service: data.service || null,
                    extras: Array.isArray(data.extras) ? data.extras : []
                };
            } catch {
                return {
                    type: null,
                    service: null,
                    extras: []
                };
            }
        }
        function saveOrder(order) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
            window.dispatchEvent(new Event("orderUpdated"));
        }
        function getActiveTab() {
            const order = getOrder();
            if (order.extras.length > 0) return order.extras[order.extras.length - 1].tab;
            return DEFAULT_TAB;
        }
        function openTab(tabName) {
            document.querySelectorAll(".more-services-tab").forEach((btn => {
                btn.classList.toggle("active", btn.dataset.tab === tabName);
            }));
            document.querySelectorAll(".more-services-pane").forEach((pane => {
                pane.classList.toggle("active", pane.dataset.tab === tabName);
            }));
        }
        function syncTabs() {
            openTab(getActiveTab());
        }
        document.addEventListener("click", (function(e) {
            const slide = e.target.closest(".more-services__slide");
            if (!slide) return;
            const pane = slide.closest(".more-services-pane");
            const tab = pane?.dataset.tab;
            const order = getOrder();
            if (!order.service || order.type !== "one-time") return;
            const extra = {
                name: slide.dataset.name,
                price: Number(slide.dataset.price),
                tab
            };
            const exists = order.extras.some((item => item.name === extra.name && item.tab === extra.tab));
            if (exists) order.extras = order.extras.filter((item => !(item.name === extra.name && item.tab === extra.tab))); else order.extras.push(extra);
            saveOrder(order);
        }));
        function syncUI() {
            const order = getOrder();
            if (!order.service || order.type !== "one-time") if (order.extras.length > 0) {
                order.extras = [];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
            }
            document.querySelectorAll(".more-services__slide").forEach((slide => {
                const pane = slide.closest(".more-services-pane");
                const tab = pane?.dataset.tab;
                const exists = order.service && order.type === "one-time" && order.extras.some((item => item.name === slide.dataset.name && item.tab === tab));
                slide.classList.toggle("is-selected", exists);
            }));
            syncTabs();
            if (window.renderSummary) window.renderSummary();
        }
        syncUI();
        window.addEventListener("orderUpdated", syncUI);
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const STORAGE_KEY = "cleaningOrder";
        const root = document.querySelector(".packages-02");
        if (!root) return;
        const isCalculatePage = document.querySelector(".calculate") !== null;
        const hasTabs = root.querySelectorAll(".packages__tab").length > 0;
        function getOrder() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
            } catch {
                return {};
            }
        }
        function saveOrder(data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            window.dispatchEvent(new Event("orderUpdated"));
        }
        function clearOrder() {
            localStorage.removeItem(STORAGE_KEY);
            window.dispatchEvent(new Event("orderUpdated"));
        }
        const bonusBlock = root.querySelector(".bonus-services");
        const bonusCountText = root.querySelector(".bonus-services__count");
        function resetBonus() {
            if (!bonusBlock) return;
            bonusBlock.style.display = "none";
            root.querySelectorAll(".bonus-services .checkbox__input").forEach((cb => {
                cb.checked = false;
                cb.disabled = false;
                cb.parentElement.classList.remove("disabled");
            }));
            if (bonusCountText) bonusCountText.textContent = "";
        }
        function updateBonus(limit) {
            if (!bonusBlock || !limit) return;
            const checkboxes = root.querySelectorAll(".bonus-services .checkbox__input");
            const selectedCount = root.querySelectorAll(".bonus-services .checkbox__input:checked").length;
            const remaining = limit - selectedCount;
            if (bonusCountText) bonusCountText.textContent = remaining > 0 ? `Оберіть ще ${remaining}` : "Ліміт бонусів досягнуто";
            checkboxes.forEach((cb => {
                if (!cb.checked) {
                    cb.disabled = selectedCount >= limit;
                    cb.parentElement.classList.toggle("disabled", selectedCount >= limit);
                }
            }));
        }
        function syncBonusWithActiveService() {
            if (!bonusBlock) return;
            const activeSlide = root.querySelector(".ticket-slide-ordinary.is-selected");
            if (!activeSlide) {
                resetBonus();
                return;
            }
            const limit = parseInt(activeSlide.dataset.bonusLimit || "0");
            const countSpan = bonusBlock.querySelector(".count");
            if (limit > 0) {
                bonusBlock.style.display = "flex";
                bonusBlock.dataset.limit = limit;
                if (countSpan) countSpan.textContent = limit;
                const order = getOrder();
                root.querySelectorAll(".bonus-services .checkbox__input").forEach((cb => {
                    cb.checked = order.service?.bonuses?.includes(cb.value) || false;
                }));
                updateBonus(limit);
            } else resetBonus();
        }
        function openTab(area) {
            if (!hasTabs) return;
            root.querySelectorAll(".packages__tab").forEach((tab => {
                tab.classList.toggle("active", tab.dataset.area === area);
            }));
            root.querySelectorAll(".packages-slide").forEach((slide => {
                slide.classList.toggle("is-hidden", slide.dataset.area !== area);
            }));
        }
        if (hasTabs) root.querySelectorAll(".packages__tab").forEach((tab => {
            tab.addEventListener("click", (() => openTab(tab.dataset.area)));
        }));
        function syncUI() {
            const order = getOrder();
            const current = order.service;
            if (!current) {
                root.querySelectorAll(".is-selected").forEach((el => {
                    el.classList.remove("is-selected");
                }));
                root.querySelectorAll(".btn-save").forEach((btn => {
                    btn.textContent = "Замовити";
                }));
                resetBonus();
                return;
            }
            if (!isCalculatePage) root.querySelectorAll(".btn-save").forEach((btn => {
                const isSelected = btn.dataset.title === current.name && btn.dataset.area === current.area;
                btn.classList.toggle("is-selected", isSelected);
                btn.textContent = isSelected ? "Вибрано" : "Замовити";
            }));
            if (isCalculatePage) root.querySelectorAll(".ticket-slide-ordinary").forEach((slide => {
                const isSelected = slide.dataset.title === current.name && slide.dataset.area === current.area;
                slide.classList.toggle("is-selected", isSelected);
            }));
            syncBonusWithActiveService();
        }
        root.addEventListener("click", (function(e) {
            const order = getOrder();
            if (!isCalculatePage) {
                const btn = e.target.closest(".btn-save");
                if (!btn) return;
                e.preventDefault();
                const service = {
                    name: btn.dataset.title,
                    area: btn.dataset.area,
                    price: Number(btn.dataset.price),
                    bonuses: []
                };
                const isSame = order.service && order.service.name === service.name && order.service.area === service.area;
                if (isSame) {
                    clearOrder();
                    return;
                }
                saveOrder({
                    type: "subscription",
                    service
                });
                const link = btn.getAttribute("href");
                if (link && link !== "#") window.location.href = link;
                return;
            }
            const slide = e.target.closest(".ticket-slide-ordinary");
            if (!slide) return;
            const service = {
                name: slide.dataset.title,
                area: slide.dataset.area,
                price: Number(slide.dataset.price),
                bonuses: []
            };
            const isSame = order.service && order.service.name === service.name && order.service.area === service.area;
            if (isSame) {
                clearOrder();
                return;
            }
            saveOrder({
                type: "subscription",
                service
            });
        }));
        root.addEventListener("change", (function(e) {
            if (!e.target.classList.contains("checkbox__input")) return;
            const order = getOrder();
            if (!order.service) return;
            const selected = Array.from(root.querySelectorAll(".bonus-services .checkbox__input:checked")).map((cb => cb.value));
            order.service.bonuses = selected;
            saveOrder(order);
            syncBonusWithActiveService();
        }));
        const saved = getOrder();
        if (hasTabs) openTab(saved?.service?.area || "60");
        syncUI();
        window.addEventListener("orderUpdated", syncUI);
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const STORAGE_KEY = "cleaningOrder";
        function getOrder() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
            } catch {
                return null;
            }
        }
        function renderSummary() {
            const order = getOrder();
            const summaries = document.querySelectorAll(".order-summary");
            if (!summaries.length) return;
            summaries.forEach((summary => {
                const mainList = summary.querySelector('[data-type="main"] .order-summary-type__list');
                const extrasContainer = summary.querySelector('[data-type="extras"]');
                const priceBlock = summary.querySelector(".full-price__value");
                if (!priceBlock) return;
                if (mainList) mainList.innerHTML = "";
                if (extrasContainer) extrasContainer.innerHTML = "";
                let total = 0;
                if (order?.service) {
                    total += Number(order.service.price || 0);
                    if (mainList) mainList.innerHTML = `\n        <div class="order-summary-type__item">\n          <div class="order-summary-type__item-top">\n            <p class="order-summary__name">${order.service.name || ""}</p>\n            <span>(${order.service.area || ""})</span>\n          </div>\n          <p class="order-summary__price">+${Number(order.service.price || 0).toLocaleString("uk-UA")}</p>\n        </div>\n      `;
                } else {
                    priceBlock.textContent = "0";
                    return;
                }
                if (order.type === "one-time" && Array.isArray(order.extras) && order.extras.length && extrasContainer) {
                    const tabs = [ ...new Set(order.extras.map((e => e.tab))) ];
                    tabs.forEach((tab => {
                        const tabItems = order.extras.filter((e => e.tab === tab));
                        const tabButton = document.querySelector(`.more-services-tab[data-tab="${tab}"]`);
                        const tabName = tabButton?.dataset.title || tab;
                        const tabBlock = document.createElement("div");
                        tabBlock.className = "order-summary__item";
                        tabBlock.setAttribute("data-type", "extras");
                        tabBlock.innerHTML = `\n    <h4>${tabName}</h4>\n    <div class="order-summary-type__list"></div>\n  `;
                        const listContainer = tabBlock.querySelector(".order-summary-type__list");
                        tabItems.forEach((item => {
                            total += Number(item.price || 0);
                            listContainer.innerHTML += `\n            <div class="order-summary-type__item">\n              <p class="order-summary__name">${item.name}</p>\n              <p class="order-summary__price">+${Number(item.price || 0).toLocaleString("uk-UA")}</p>\n            </div>\n          `;
                        }));
                        extrasContainer.appendChild(tabBlock);
                    }));
                }
                if (order.type === "subscription" && Array.isArray(order.service?.bonuses) && order.service.bonuses.length && extrasContainer) {
                    const bonusBlock = document.createElement("div");
                    bonusBlock.className = "order-summary__item";
                    bonusBlock.setAttribute("data-type", "extras");
                    bonusBlock.innerHTML = `\n        <h4>Бонуси</h4>\n        <div class="order-summary-type__list"></div>\n      `;
                    const listContainer = bonusBlock.querySelector(".order-summary-type__list");
                    order.service.bonuses.forEach((bonus => {
                        listContainer.innerHTML += `\n          <div class="order-summary-type__item">\n            <p class="order-summary__name">${bonus}</p>\n          </div>\n        `;
                    }));
                    extrasContainer.appendChild(bonusBlock);
                }
                priceBlock.textContent = total.toLocaleString("uk-UA");
            }));
        }
        renderSummary();
        window.addEventListener("orderUpdated", renderSummary);
        window.renderSummary = renderSummary;
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        function smoothScrollTo(targetSelector, duration = 800) {
            const target = targetSelector === "top" ? document.body : document.querySelector(targetSelector);
            if (!target) {
                console.warn("Target not found:", targetSelector);
                return;
            }
            const start = window.pageYOffset;
            const end = targetSelector === "top" ? 0 : target.getBoundingClientRect().top + start;
            const distance = end - start;
            let startTime = null;
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutCubic(timeElapsed, start, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
            requestAnimationFrame(animation);
        }
        document.querySelectorAll('nav a[href^="#"]').forEach((link => {
            link.addEventListener("click", (function(e) {
                const targetID = this.getAttribute("href");
                if (targetID && targetID.length > 1) {
                    e.preventDefault();
                    smoothScrollTo(targetID, 1e3);
                }
            }));
        }));
        const upBtn = document.querySelector(".up");
        if (upBtn) {
            window.addEventListener("scroll", (() => {
                if (window.scrollY > 400) upBtn.classList.add("show"); else upBtn.classList.remove("show");
            }));
            upBtn.addEventListener("click", (e => {
                e.preventDefault();
                smoothScrollTo("top", 1e3);
            }));
        }
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const toggleButtons = document.querySelectorAll(".response-1__toggle");
        const items = document.querySelectorAll(".response-1__item");
        document.querySelector(".response-1__more");
        let isExpanded = false;
        function setClosedText(text) {
            const isMobile = window.innerWidth <= 576;
            text.style.maxHeight = isMobile ? "40px" : "20px";
            text.style.webkitLineClamp = isMobile ? "2" : "1";
        }
        document.querySelectorAll(".response-1__text").forEach((text => {
            const item = text.closest(".response-1__item");
            if (!item.classList.contains("open")) setClosedText(text);
        }));
        function hideExtraItems() {
            const breakpoint = window.innerWidth;
            const hiddenItems = Array.from(items).slice(breakpoint);
            hiddenItems.forEach((item => {
                item.style.display = "none";
                item.style.pointerEvents = "none";
            }));
        }
        hideExtraItems();
        toggleButtons.forEach((btn => {
            btn.addEventListener("click", (function() {
                const item = this.closest(".response-1__item");
                if (!item) return;
                const text = item.querySelector(".response-1__text");
                if (!text) return;
                window.innerWidth;
                if (item.classList.contains("open")) {
                    setClosedText(text);
                    item.classList.remove("open");
                    this.textContent = "Читати далі";
                } else {
                    text.style.maxHeight = text.scrollHeight + "px";
                    text.style.webkitLineClamp = "unset";
                    item.classList.add("open");
                    this.textContent = "Згорнути";
                }
            }));
        }));
        window.addEventListener("resize", (() => {
            document.querySelectorAll(".response-1__text").forEach((text => {
                const item = text.closest(".response-1__item");
                if (!item.classList.contains("open")) setClosedText(text);
            }));
            if (!isExpanded) hideExtraItems();
        }));
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const packagesBlocks = document.querySelectorAll(".packages");
        if (!packagesBlocks.length) return;
        packagesBlocks.forEach((block => {
            const tabs = block.querySelectorAll(".packages__tab");
            const tabs2 = block.querySelectorAll(".packages__tab2");
            const slides = block.querySelectorAll(".packages-slide");
            const swiperEl = block.querySelector(".packages__swiper");
            const nextBtn = block.querySelector(".packages__arrow--next");
            const prevBtn = block.querySelector(".packages__arrow--prev");
            let packagesSwiper = null;
            if (swiperEl) packagesSwiper = new Swiper(swiperEl, {
                loop: false,
                speed: 600,
                slidesPerView: 3,
                spaceBetween: 30,
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn
                },
                pagination: {
                    el: block.querySelector(".packages__pagination"),
                    clickable: true
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }
            });
            function toggleNavigation() {
                if (!packagesSwiper) return;
                if (packagesSwiper.isLocked) {
                    nextBtn?.style.setProperty("display", "none");
                    prevBtn?.style.setProperty("display", "none");
                } else {
                    nextBtn?.style.removeProperty("display");
                    prevBtn?.style.removeProperty("display");
                }
            }
            function filterSlides(area) {
                slides.forEach((slide => {
                    slide.style.display = slide.dataset.area === area ? "" : "none";
                }));
                if (packagesSwiper) {
                    packagesSwiper.update();
                    packagesSwiper.slideTo(0);
                    toggleNavigation();
                    scrollToSelected();
                }
            }
            function scrollToSelected() {
                if (!packagesSwiper) return;
                const selectedBtn = block.querySelector(".order-btn.is-selected");
                if (!selectedBtn) return;
                const slide = selectedBtn.closest(".packages-slide");
                if (!slide) return;
                const index = [ ...slides ].indexOf(slide);
                if (index !== -1) packagesSwiper.slideTo(index, 600);
            }
            const activeTab = block.querySelector(".packages__tab.active");
            if (activeTab) {
                filterSlides(activeTab.dataset.area);
                scrollToSelected();
            }
            tabs.forEach((tab => {
                tab.addEventListener("click", (function() {
                    tabs.forEach((t => t.classList.remove("active")));
                    this.classList.add("active");
                    filterSlides(this.dataset.area);
                }));
            }));
            tabs2.forEach((tab => {
                tab.addEventListener("click", (function() {
                    tabs2.forEach((t => t.classList.remove("active")));
                    this.classList.add("active");
                    filterSlides(this.dataset.area);
                }));
            }));
            if (packagesSwiper) {
                packagesSwiper.on("update", toggleNavigation);
                packagesSwiper.on("resize", toggleNavigation);
                packagesSwiper.on("breakpoint", toggleNavigation);
            }
            window.addEventListener("resize", toggleNavigation);
            window.addEventListener("orderUpdated", scrollToSelected);
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const seeMoreButtons = document.querySelectorAll(".packages-see-more");
            const modalOverlay = document.getElementById("modalOverlay");
            const modalClose = document.getElementById("modalClose");
            if (!modalOverlay || !modalClose) return;
            seeMoreButtons.forEach((btn => {
                btn.addEventListener("click", (() => {
                    modalOverlay.classList.add("active");
                }));
            }));
            modalClose.addEventListener("click", (() => {
                modalOverlay.classList.remove("active");
            }));
            modalOverlay.addEventListener("click", (e => {
                if (e.target === modalOverlay) modalOverlay.classList.remove("active");
            }));
        } catch (e) {}
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const sliderEl = document.querySelector(".addition-services__swiper");
        const paginationContainer = document.querySelector(".addition-services__pagination");
        if (!sliderEl || !paginationContainer) return;
        const slides = sliderEl.querySelectorAll(".swiper-slide");
        const slidesCount = slides.length;
        const MAX_BULLETS = 7;
        const bulletsCount = Math.min(slidesCount, MAX_BULLETS);
        const resultSwiper = new Swiper(sliderEl, {
            loop: false,
            speed: 700,
            navigation: {
                nextEl: ".result__arrow--next",
                prevEl: ".result__arrow--prev"
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 25
                }
            },
            slidesPerView: 3,
            spaceBetween: 25,
            effect: "slide"
        });
        paginationContainer.innerHTML = "";
        for (let i = 0; i < bulletsCount; i++) {
            const bullet = document.createElement("span");
            bullet.className = "swiper-pagination-bullet";
            if (i === 0) bullet.classList.add("swiper-pagination-bullet-active");
            bullet.addEventListener("click", (() => {
                resultSwiper.slideTo(i);
            }));
            paginationContainer.appendChild(bullet);
        }
        const bullets = paginationContainer.querySelectorAll(".swiper-pagination-bullet");
        function updatePagination() {
            let activeIndex = resultSwiper.activeIndex;
            if (slidesCount > MAX_BULLETS) activeIndex %= MAX_BULLETS;
            bullets.forEach(((bullet, index) => {
                bullet.classList.toggle("swiper-pagination-bullet-active", index === activeIndex);
            }));
        }
        resultSwiper.on("slideChange", updatePagination);
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const swiperContainers = document.querySelectorAll(".more-services__swiper");
        const swipers = [];
        swiperContainers.forEach((sliderEl => {
            const paginationContainer = sliderEl.parentElement.querySelector(".more-services__pagination");
            const slides = sliderEl.querySelectorAll(".swiper-slide");
            const slidesCount = slides.length;
            const MAX_BULLETS = 7;
            const bulletsCount = slidesCount > MAX_BULLETS ? MAX_BULLETS : slidesCount;
            const swiper = new Swiper(sliderEl, {
                loop: false,
                speed: 700,
                navigation: {
                    nextEl: sliderEl.parentElement.querySelector(".more-services__arrow--next"),
                    prevEl: sliderEl.parentElement.querySelector(".more-services__arrow--prev")
                },
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 8,
                        grid: {
                            rows: 2,
                            fill: "row"
                        }
                    },
                    365: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                        grid: {
                            rows: 2,
                            fill: "row"
                        }
                    },
                    576: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                        grid: {
                            rows: 2,
                            fill: "row"
                        }
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 17,
                        grid: {
                            rows: 1
                        }
                    },
                    1200: {
                        slidesPerView: 6,
                        spaceBetween: 17,
                        grid: {
                            rows: 1
                        }
                    }
                }
            });
            if (paginationContainer) {
                paginationContainer.innerHTML = "";
                for (let i = 0; i < bulletsCount; i++) {
                    const bullet = document.createElement("span");
                    bullet.className = "swiper-pagination-bullet";
                    if (i === 0) bullet.classList.add("swiper-pagination-bullet-active");
                    bullet.addEventListener("click", (() => swiper.slideTo(i)));
                    paginationContainer.appendChild(bullet);
                }
                const bullets = paginationContainer.querySelectorAll(".swiper-pagination-bullet");
                swiper.on("slideChange", (() => {
                    let activeIndex = swiper.activeIndex;
                    if (slidesCount > MAX_BULLETS) activeIndex %= MAX_BULLETS;
                    bullets.forEach(((b, idx) => b.classList.toggle("swiper-pagination-bullet-active", idx === activeIndex)));
                }));
            }
            const navBtns = sliderEl.parentElement.querySelector(".more-services__buttons");
            if (slidesCount <= 6 && navBtns) navBtns.style.display = "none";
            swipers.push(swiper);
        }));
        const tabs = document.querySelectorAll(".more-services-tab");
        const panes = document.querySelectorAll(".more-services-pane");
        tabs.forEach((tab => {
            tab.addEventListener("click", (() => {
                const category = tab.dataset.tab;
                tabs.forEach((t => t.classList.remove("active")));
                tab.classList.add("active");
                panes.forEach((pane => {
                    const swiperEl = pane.querySelector(".more-services__swiper");
                    if (pane.dataset.tab === category) {
                        pane.classList.add("active");
                        if (swiperEl && swiperEl.swiper) swiperEl.swiper.update();
                        const navBtns = pane.querySelector(".more-services__buttons");
                        if (swiperEl && navBtns) {
                            const wrapper = swiperEl.querySelector(".swiper-wrapper");
                            const containerWidth = swiperEl.clientWidth;
                            const slidesWidth = Array.from(wrapper.children).reduce(((sum, s) => sum + s.offsetWidth), 0);
                            if (slidesWidth <= containerWidth) navBtns.style.display = "none"; else navBtns.style.display = "";
                        }
                    } else pane.classList.remove("active");
                }));
            }));
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const swiperContainers2 = document.querySelectorAll(".single-cleaning-tab .more-services__swiper2");
        const swipers = [];
        swiperContainers2.forEach((sliderEl => {
            const paginationContainer = sliderEl.parentElement.querySelector(".more-services__pagination2");
            const slides = sliderEl.querySelectorAll(".swiper-slide");
            const slidesCount = slides.length;
            const MAX_BULLETS = 7;
            const bulletsCount = slidesCount > MAX_BULLETS ? MAX_BULLETS : slidesCount;
            const swiper = new Swiper(sliderEl, {
                loop: false,
                speed: 700,
                navigation: {
                    nextEl: sliderEl.parentElement.querySelector(".more-services__arrow--next2"),
                    prevEl: sliderEl.parentElement.querySelector(".more-services__arrow--prev2")
                },
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 8,
                        grid: {
                            rows: 2,
                            fill: "row"
                        }
                    },
                    365: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                        grid: {
                            rows: 2,
                            fill: "row"
                        }
                    },
                    576: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                        grid: {
                            rows: 2,
                            fill: "row"
                        }
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                        grid: {
                            rows: 3,
                            fill: "row"
                        }
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                        grid: {
                            rows: 3,
                            fill: "row"
                        }
                    }
                }
            });
            if (paginationContainer) {
                paginationContainer.innerHTML = "";
                for (let i = 0; i < bulletsCount; i++) {
                    const bullet = document.createElement("span");
                    bullet.className = "swiper-pagination-bullet";
                    if (i === 0) bullet.classList.add("swiper-pagination-bullet-active");
                    bullet.addEventListener("click", (() => swiper.slideTo(i)));
                    paginationContainer.appendChild(bullet);
                }
                const bullets = paginationContainer.querySelectorAll(".swiper-pagination-bullet");
                swiper.on("slideChange", (() => {
                    let activeIndex = swiper.activeIndex;
                    if (slidesCount > MAX_BULLETS) activeIndex %= MAX_BULLETS;
                    bullets.forEach(((b, idx) => b.classList.toggle("swiper-pagination-bullet-active", idx === activeIndex)));
                }));
            }
            const navBtns = sliderEl.parentElement.querySelector(".more-services__buttons");
            if (slidesCount <= 8 && navBtns) navBtns.style.display = "none";
            swipers.push(swiper);
        }));
        const tabs = document.querySelectorAll(".more-services-tab");
        const panes = document.querySelectorAll(".more-services-pane");
        tabs.forEach((tab => {
            tab.addEventListener("click", (() => {
                const category = tab.dataset.tab;
                tabs.forEach((t => t.classList.remove("active")));
                tab.classList.add("active");
                panes.forEach((pane => {
                    const swiperEl = pane.querySelector(".more-services__swiper");
                    if (pane.dataset.tab === category) {
                        pane.classList.add("active");
                        if (swiperEl && swiperEl.swiper) swiperEl.swiper.update();
                        const navBtns = pane.querySelector(".more-services__buttons");
                        if (swiperEl && navBtns) {
                            const wrapper = swiperEl.querySelector(".swiper-wrapper");
                            const containerWidth = swiperEl.clientWidth;
                            const slidesWidth = Array.from(wrapper.children).reduce(((sum, s) => sum + s.offsetWidth), 0);
                            if (slidesWidth <= containerWidth) navBtns.style.display = "none"; else navBtns.style.display = "";
                        }
                    } else pane.classList.remove("active");
                }));
            }));
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const switchers = document.querySelectorAll(".switcher");
        const singleTab = document.querySelector(".single-cleaning-tab");
        const seasonTab = document.querySelector(".season-ticket-tab");
        if (!switchers.length || !singleTab || !seasonTab) return;
        switchers.forEach((switcher => {
            const buttons = switcher.querySelectorAll(".switcher__button");
            buttons.forEach(((btn, index) => {
                btn.addEventListener("click", (() => {
                    buttons.forEach((b => b.classList.remove("switcher__button--active")));
                    btn.classList.add("switcher__button--active");
                    document.querySelectorAll(".switcher__button").forEach(((b, i) => {
                        if (i % 2 === index) b.classList.add("switcher__button--active"); else b.classList.remove("switcher__button--active");
                    }));
                    if (index === 0) {
                        singleTab.style.display = "block";
                        seasonTab.style.display = "none";
                    } else {
                        singleTab.style.display = "none";
                        seasonTab.style.display = "block";
                    }
                }));
            }));
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const steps = document.querySelectorAll("[class*='step-']");
        const nextBtns = document.querySelectorAll(".order-checkout-next");
        const prevBtns = document.querySelectorAll(".order-checkout-prev");
        const stepperItems = document.querySelectorAll(".stepper__item");
        const stepperLines = document.querySelectorAll(".stepper__line");
        const counter = document.querySelector(".stepper__counter");
        const thanksBlock = document.querySelector(".thanks");
        const calculateWrapper = document.querySelector(".calculate__wrapper");
        const STEP_KEY = "currentStep";
        const STORAGE_KEY = "cleaningOrder";
        let currentStep = Number(localStorage.getItem(STEP_KEY)) || 0;
        function getOrder() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
            } catch {
                return {};
            }
        }
        function saveOrder(order) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
        }
        function clearOrder() {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(STEP_KEY);
        }
        function updateStepperCounter() {
            if (counter) counter.textContent = `Крок ${currentStep + 1} з ${steps.length}`;
        }
        function showStep(index) {
            steps.forEach(((step, i) => {
                step.style.display = i === index ? "block" : "none";
            }));
            stepperItems.forEach(((item, i) => {
                item.classList.toggle("stepper__item--active", i <= index);
            }));
            stepperLines.forEach(((line, i) => {
                line.classList.toggle("stepper__item--active", i < index);
            }));
            currentStep = index;
            localStorage.setItem(STEP_KEY, currentStep);
            updateNextBtnState();
            updateStepperCounter();
            if (currentStep === 2) fillStep3Summary();
        }
        function updateNextBtnState() {
            const order = getOrder();
            nextBtns.forEach((btn => {
                let disabled = false;
                if (currentStep === 0) disabled = !(order.service && (order.type === "one-time" || order.type === "subscription")); else if (currentStep === 1) {
                    const stepFields = steps[currentStep].querySelectorAll("[required]");
                    disabled = !Array.from(stepFields).every((f => f.classList.contains("success")));
                }
                btn.disabled = disabled;
                btn.classList.toggle("btn-disabled", disabled);
            }));
        }
        nextBtns.forEach((btn => {
            btn.addEventListener("click", (e => {
                const order = getOrder();
                if (currentStep === 0 && !(order.service && (order.type === "one-time" || order.type === "subscription"))) {
                    e.preventDefault();
                    return;
                }
                if (currentStep === 1) {
                    const stepFields = steps[currentStep].querySelectorAll("[required]");
                    if (!Array.from(stepFields).every((f => f.classList.contains("success")))) {
                        e.preventDefault();
                        return;
                    }
                }
                if (currentStep === 2) {
                    if (calculateWrapper) calculateWrapper.style.display = "none";
                    if (thanksBlock) thanksBlock.style.display = "flex";
                    clearOrder();
                    return;
                }
                if (currentStep < steps.length - 1) showStep(currentStep + 1);
            }));
        }));
        prevBtns.forEach((btn => {
            btn.addEventListener("click", (e => {
                e.preventDefault();
                if (currentStep > 0) showStep(currentStep - 1);
            }));
        }));
        const serviceInputs = document.querySelectorAll("[name='service'], [name='type']");
        serviceInputs.forEach((input => {
            input.addEventListener("change", (() => {
                const order = getOrder();
                order[input.name] = input.value;
                saveOrder(order);
                updateNextBtnState();
            }));
            const order = getOrder();
            if (order[input.name]) input.value = order[input.name];
        }));
        if (steps[1]) {
            const step2Fields = steps[1].querySelectorAll("input, textarea, select");
            step2Fields.forEach((field => {
                const errorBlock = field.parentElement.querySelector(".input-error");
                if (errorBlock) errorBlock.style.display = "none";
                const order = getOrder();
                if (order[field.name || field.id]) {
                    field.value = order[field.name || field.id];
                    if (field.hasAttribute("required")) validateField(field, true, errorBlock);
                }
                let touched = false;
                field.addEventListener("focus", (() => touched = true));
                field.addEventListener("input", (() => {
                    touched = true;
                    const order = getOrder();
                    order[field.name || field.id] = field.value;
                    saveOrder(order);
                    if (field.hasAttribute("required")) validateField(field, touched, errorBlock);
                    updateNextBtnState();
                }));
                field.addEventListener("blur", (() => {
                    if (touched && field.hasAttribute("required")) validateField(field, touched, errorBlock);
                }));
            }));
        }
        function validateField(field, touched = true, errorBlock = null) {
            const value = field.value.trim();
            if (!errorBlock) errorBlock = field.parentElement.querySelector(".input-error");
            let isValid = false;
            if (field.id === "name") isValid = /^[А-Яа-яЇїІіЄєҐґA-Za-z\s'-]{5,}$/.test(value); else if (field.id === "phone") isValid = /^(\+38|38|0)\d{9}$/.test(value); else if (field.id === "street" || field.id === "house") isValid = value !== ""; else if (field.id === "data") isValid = validateDate(field, errorBlock); else isValid = true;
            if (isValid) showSuccess(field, errorBlock); else if (touched && field.hasAttribute("required")) showError(field, errorBlock); else {
                field.classList.remove("error");
                field.classList.remove("success");
                if (errorBlock) errorBlock.style.display = "none";
            }
        }
        function validateDate(field, errorBlock = null) {
            const value = field.value.trim();
            const regex = /^\d{2}\.\d{2}\.\d{4}$/;
            if (!regex.test(value)) return false;
            const [day, month, year] = value.split(".").map(Number);
            const inputDate = new Date(year, month - 1, day);
            const today = new Date;
            today.setHours(0, 0, 0, 0);
            if (inputDate < today) return false;
            if (errorBlock) showSuccess(field, errorBlock);
            return true;
        }
        function showError(field, errorBlock) {
            field.classList.remove("success");
            field.classList.add("error");
            if (errorBlock) errorBlock.style.display = "flex";
        }
        function showSuccess(field, errorBlock) {
            field.classList.remove("error");
            field.classList.add("success");
            if (errorBlock) errorBlock.style.display = "none";
        }
        function fillStep3Summary() {
            const order = getOrder();
            if (!order) return;
            const addressEl = document.querySelector(".form-info-address");
            if (addressEl) {
                const street = order.street || "";
                const house = order.house || "";
                addressEl.textContent = `${street} ${house}`.trim();
            }
            const dateEl = document.querySelector(".form-info-data");
            if (dateEl) dateEl.textContent = formatDateToText(order.data);
            const nameEl = document.querySelector(".form-info-name");
            if (nameEl) nameEl.textContent = order.name || "";
            const phoneEl = document.querySelector(".form-info__item p:nth-child(2)");
            if (phoneEl) phoneEl.textContent = order.phone || "";
        }
        function formatDateToText(dateStr) {
            if (!dateStr) return "";
            const months = [ "січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня" ];
            const [day, month] = dateStr.split(".").map(Number);
            if (!day || !month) return dateStr;
            return `${day} ${months[month - 1]}`;
        }
        if (thanksBlock) thanksBlock.style.display = "none";
        if (currentStep >= steps.length) currentStep = 0;
        showStep(currentStep);
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const container = document.querySelector(".our-partners__blocks");
        container.innerHTML += container.innerHTML;
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const wrappers = document.querySelectorAll(".bonus-service__wrapper");
        wrappers.forEach((wrapper => {
            const list = wrapper.querySelector(".bonus-service__list");
            const button = wrapper.querySelector(".bonus-service-more");
            if (!list || !button) return;
            const items = list.querySelectorAll(".bonus-service__item");
            const getVisibleCount = () => window.innerWidth <= 756 ? 2 : 4;
            if (items.length <= getVisibleCount()) {
                button.style.display = "none";
                return;
            }
            const setInitialHeight = () => {
                const visibleCount = getVisibleCount();
                const lastVisibleItem = items[visibleCount - 1];
                if (!lastVisibleItem) return;
                const listTop = list.getBoundingClientRect().top;
                const itemBottom = lastVisibleItem.getBoundingClientRect().bottom;
                const height = itemBottom - listTop;
                list.style.maxHeight = height + "px";
                list.style.opacity = "1";
            };
            const open = () => {
                wrapper.classList.add("active");
                list.style.maxHeight = list.scrollHeight + "px";
                button.querySelector("span").textContent = "Сховати послуги";
            };
            const close = () => {
                wrapper.classList.remove("active");
                setInitialHeight();
                button.querySelector("span").textContent = "Показати всі послуги";
            };
            setInitialHeight();
            button.addEventListener("click", (() => {
                wrapper.classList.contains("active") ? close() : open();
            }));
            window.addEventListener("resize", (() => {
                if (!wrapper.classList.contains("active")) setInitialHeight();
            }));
        }));
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const seasonBlocks = document.querySelectorAll(".season-ticket");
        if (!seasonBlocks.length) return;
        seasonBlocks.forEach((block => {
            const tabs = block.querySelectorAll(".packages__tab");
            const slides = block.querySelectorAll(".ticket-slide");
            const swiperEl = block.querySelector(".season-ticket__swiper");
            let seasonSwiper = null;
            if (swiperEl) seasonSwiper = new Swiper(swiperEl, {
                loop: false,
                speed: 700,
                slidesPerView: 3,
                spaceBetween: 39,
                pagination: {
                    el: block.querySelector(".season-ticket__pagination"),
                    clickable: true
                },
                breakpoints: {
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    668: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 39
                    }
                }
            });
            const filterSlides = area => {
                slides.forEach((slide => {
                    slide.style.display = slide.dataset.area === area ? "" : "none";
                }));
                if (seasonSwiper) {
                    seasonSwiper.update();
                    scrollToSelected();
                }
            };
            const scrollToSelected = () => {
                if (!seasonSwiper) return;
                let targetSlide = block.querySelector(".btn-save.is-selected")?.closest(".ticket-slide");
                if (!targetSlide) targetSlide = block.querySelector(".ticket-slide-recommended");
                if (!targetSlide) return;
                const index = [ ...slides ].indexOf(targetSlide);
                if (index !== -1) seasonSwiper.slideTo(index, 600);
            };
            const activeTab = block.querySelector(".packages__tab.active");
            if (activeTab) filterSlides(activeTab.dataset.area);
            tabs.forEach((tab => {
                tab.addEventListener("click", (function() {
                    tabs.forEach((t => t.classList.remove("active")));
                    this.classList.add("active");
                    const area = this.dataset.area;
                    filterSlides(area);
                }));
            }));
            window.addEventListener("orderUpdated", scrollToSelected);
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const openBtns = document.querySelectorAll(".your-order-modal-btn");
        const modal = document.querySelector(".modal-order");
        const overlay = document.querySelector(".menu-overlay2");
        const closeBtn = document.querySelector(".modal-close");
        function openModal() {
            if (window.innerWidth <= 1200) {
                modal.classList.add("active");
                overlay.classList.add("active");
            }
        }
        function closeModal() {
            modal.classList.remove("active");
            overlay.classList.remove("active");
        }
        openBtns.forEach((btn => {
            btn.addEventListener("click", openModal);
        }));
        overlay.addEventListener("click", closeModal);
        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        window.addEventListener("resize", (() => {
            if (window.innerWidth > 1200) closeModal();
        }));
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const select = document.querySelector(".contact-form-select");
        if (!select) return;
        const arrow = select.querySelector(".custom-select__arrow");
        const wrap = select.querySelector(".contact-form-select__wrap");
        const options = select.querySelectorAll(".contact-form-select2__option");
        const text = select.querySelector(".custom-select__text");
        arrow.addEventListener("click", (function() {
            wrap.classList.toggle("active");
        }));
        options.forEach((function(option) {
            option.addEventListener("click", (function() {
                const value = option.textContent;
                text.textContent = value;
                options.forEach((function(item) {
                    item.classList.remove("active");
                }));
                option.classList.add("active");
                wrap.classList.remove("active");
            }));
        }));
        document.addEventListener("click", (function(e) {
            if (!select.contains(e.target)) wrap.classList.remove("active");
        }));
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const methodItems = document.querySelectorAll(".method-com__item");
        if (!methodItems.length) return;
        methodItems.forEach((function(item) {
            item.addEventListener("click", (function() {
                methodItems.forEach((function(el) {
                    el.classList.remove("active");
                }));
                item.classList.add("active");
            }));
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const form = document.querySelector(".contact-form");
        const nameInput = form.querySelector("#name");
        const phoneInput = form.querySelector("#phone");
        const streetInput = form.querySelector("#street");
        const houseInput = form.querySelector("#house");
        const dateInput = form.querySelector("#data");
        const requiredFields = [ nameInput, phoneInput, streetInput, houseInput, dateInput ];
        requiredFields.forEach((field => {
            field.addEventListener("input", (() => validateField(field)));
        }));
        function validateField(field) {
            const value = field.value.trim();
            const errorBlock = field.parentElement.querySelector(".input-error");
            if (field === nameInput) {
                const nameRegex = /^[А-Яа-яЇїІіЄєҐґA-Za-z\s'-]+$/;
                if (!nameRegex.test(value) || value.length <= 4) showError(field, errorBlock); else showSuccess(field, errorBlock);
            } else if (field === phoneInput) if (isValidPhone(value)) showSuccess(field, errorBlock); else showError(field, errorBlock); else if (field === streetInput || field === houseInput) if (value === "") showError(field, errorBlock); else showSuccess(field, errorBlock); else if (field === dateInput) validateDate(field, errorBlock);
        }
        function isValidPhone(value) {
            const regex = /^(\+38|38|0)\d{9}$/;
            return regex.test(value);
        }
        function validateDate(field, errorBlock) {
            const value = field.value.trim();
            const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
            if (!dateRegex.test(value)) {
                showError(field, errorBlock);
                return;
            }
            const [day, month, year] = value.split(".").map(Number);
            const inputDate = new Date(year, month - 1, day);
            const today = new Date;
            today.setHours(0, 0, 0, 0);
            if (inputDate < today) showError(field, errorBlock); else showSuccess(field, errorBlock);
        }
        function showError(field, errorBlock) {
            field.classList.remove("success");
            field.classList.add("error");
            if (errorBlock) errorBlock.style.display = "flex";
        }
        function showSuccess(field, errorBlock) {
            field.classList.remove("error");
            field.classList.add("success");
            if (errorBlock) errorBlock.style.display = "none";
        }
        const calendarDays = document.querySelectorAll(".calendar-days div");
        calendarDays.forEach((day => {
            day.addEventListener("click", (() => {
                const selectedDate = day.dataset.date;
                dateInput.value = selectedDate;
                validateField(dateInput);
            }));
        }));
        dateInput.addEventListener("input", (() => validateField(dateInput)));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const dateInput = document.querySelector("#data");
            if (!dateInput) return;
            const errorBlock = dateInput.parentElement.querySelector(".input-error");
            if (errorBlock) errorBlock.style.display = "none";
            dateInput.addEventListener("input", (() => {
                let value = dateInput.value.replace(/\D/g, "");
                if (value.length > 8) value = value.slice(0, 8);
                if (value.length > 4) value = value.replace(/^(\d{2})(\d{2})(\d{0,4})/, "$1.$2.$3"); else if (value.length > 2) value = value.replace(/^(\d{2})(\d{0,2})/, "$1.$2");
                dateInput.value = value;
                validateDate(dateInput, errorBlock);
            }));
            const calendarDays = document.querySelectorAll(".calendar-days div");
            if (calendarDays) calendarDays.forEach((day => {
                day.addEventListener("click", (() => {
                    const selectedDate = day.dataset.date;
                    if (!selectedDate) return;
                    dateInput.value = selectedDate;
                    validateDate(dateInput, errorBlock);
                }));
            }));
            function validateDate(field, errorBlock) {
                if (!field) return;
                const value = field.value.trim();
                const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
                if (!dateRegex.test(value)) {
                    showError(field, errorBlock);
                    return;
                }
                const [day, month, year] = value.split(".").map(Number);
                const inputDate = new Date(year, month - 1, day);
                const today = new Date;
                today.setHours(0, 0, 0, 0);
                if (inputDate < today) showError(field, errorBlock); else showSuccess(field, errorBlock);
            }
            function showError(field, errorBlock) {
                field.classList.remove("success");
                field.classList.add("error");
                if (errorBlock) errorBlock.style.display = "flex";
            }
            function showSuccess(field, errorBlock) {
                field.classList.remove("error");
                field.classList.add("success");
                if (errorBlock) errorBlock.style.display = "none";
            }
        } catch (e) {}
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        try {
            const calendar = document.querySelector(".contact-form__input-calendar");
            if (!calendar) return;
            const input = calendar.querySelector("input");
            const box = calendar.querySelector(".calendar-box");
            const daysContainer = calendar.querySelector(".calendar-days");
            const title = calendar.querySelector(".calendar-title");
            const prev = calendar.querySelector(".calendar-prev");
            const next = calendar.querySelector(".calendar-next");
            const errorBlock = calendar.parentElement.querySelector(".input-error");
            if (!input || !box || !daysContainer || !title || !prev || !next || !errorBlock) return;
            errorBlock.style.display = "none";
            const locale = document.documentElement.lang || "uk";
            let date = new Date;
            let currentMonth = date.getMonth();
            let currentYear = date.getFullYear();
            let selectedDay = null;
            function renderCalendar() {
                daysContainer.innerHTML = "";
                const firstDay = new Date(currentYear, currentMonth, 1);
                const lastDay = new Date(currentYear, currentMonth + 1, 0);
                const daysInMonth = lastDay.getDate();
                let startDay = firstDay.getDay();
                if (startDay === 0) startDay = 7;
                const monthName = new Intl.DateTimeFormat(locale, {
                    month: "long"
                }).format(new Date(currentYear, currentMonth));
                title.textContent = `${monthName} ${currentYear}`;
                for (let i = 1; i < startDay; i++) {
                    const empty = document.createElement("div");
                    daysContainer.appendChild(empty);
                }
                for (let d = 1; d <= daysInMonth; d++) {
                    const day = document.createElement("div");
                    day.textContent = d;
                    if (selectedDay && selectedDay.day === d && selectedDay.month === currentMonth && selectedDay.year === currentYear) day.classList.add("calendar-day--active");
                    day.addEventListener("click", (function() {
                        selectedDay = {
                            day: d,
                            month: currentMonth,
                            year: currentYear
                        };
                        const formatted = String(d).padStart(2, "0") + "." + String(currentMonth + 1).padStart(2, "0") + "." + currentYear;
                        input.value = formatted;
                        try {
                            const STORAGE_KEY = "cleaningOrder";
                            const order = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
                            order.data = formatted;
                            localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
                        } catch (e) {}
                        validateDate();
                        renderCalendar();
                        box.classList.remove("active");
                    }));
                    daysContainer.appendChild(day);
                }
            }
            prev.addEventListener("click", (function() {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                renderCalendar();
            }));
            next.addEventListener("click", (function() {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                renderCalendar();
            }));
            input.addEventListener("click", (function() {
                box.classList.toggle("active");
            }));
            document.addEventListener("click", (function(e) {
                if (!e.target.closest(".contact-form__input-calendar")) box.classList.remove("active");
            }));
            input.addEventListener("input", (() => {
                let value = input.value.replace(/\D/g, "");
                if (value.length > 8) value = value.slice(0, 8);
                if (value.length > 4) value = value.replace(/^(\d{2})(\d{2})(\d{0,4})/, "$1.$2.$3"); else if (value.length > 2) value = value.replace(/^(\d{2})(\d{0,2})/, "$1.$2");
                input.value = value;
                validateDate();
            }));
            function validateDate() {
                const value = input.value.trim();
                const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
                if (!dateRegex.test(value)) {
                    showError();
                    return;
                }
                const [day, month, year] = value.split(".").map(Number);
                const inputDate = new Date(year, month - 1, day);
                const today = new Date;
                today.setHours(0, 0, 0, 0);
                if (inputDate < today) showError(); else showSuccess();
            }
            function showError() {
                input.classList.remove("success");
                input.classList.add("error");
                errorBlock.style.display = "flex";
            }
            function showSuccess() {
                input.classList.remove("error");
                input.classList.add("success");
                errorBlock.style.display = "none";
            }
            renderCalendar();
        } catch (error) {
            console.warn("Calendar error:", error);
        }
    }));
    window["FLS"] = true;
})();