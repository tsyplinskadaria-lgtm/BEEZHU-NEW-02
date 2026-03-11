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
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const deleteButtons = document.querySelectorAll(".your-order__added .delete");
            deleteButtons.forEach((btn => {
                btn.addEventListener("click", (() => {
                    const item = btn.closest(".your-order__added-item");
                    if (item) item.remove();
                }));
            }));
        } catch (e) {}
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const ORDER_KEY = "cleaningOrder";
        const getOrder = () => JSON.parse(localStorage.getItem(ORDER_KEY)) || [];
        const saveOrder = order => localStorage.setItem(ORDER_KEY, JSON.stringify(order));
        const buttons = document.querySelectorAll("[data-order-btn]");
        const modeButtons = document.querySelectorAll(".mode-switch__btn");
        buttons.forEach((btn => {
            if (!btn.dataset.defaultText) btn.dataset.defaultText = btn.textContent.trim();
            const itemData = {
                type: btn.dataset.type,
                category: btn.dataset.category,
                mode: btn.dataset.mode,
                zone: btn.dataset.zone || null,
                title: btn.dataset.title,
                area: btn.dataset.area,
                price: btn.dataset.price || null,
                pricePerMeter: btn.dataset.pricePerMeter || null,
                discount: btn.dataset.discount || null
            };
            const existing = getOrder().find((item => item.title === itemData.title && item.mode === itemData.mode));
            if (existing) setBtnActive(btn);
            btn.addEventListener("click", (e => {
                e.preventDefault();
                let order = getOrder();
                if (itemData.type === "after-repair") {
                    const index = order.findIndex((item => item.title === itemData.title));
                    if (index === -1) {
                        order.push(itemData);
                        setBtnActive(btn);
                    } else if (btn.classList.contains("pricing__btn--selected")) {
                        order.splice(index, 1);
                        setBtnDefault(btn);
                    } else {
                        order[index] = itemData;
                        setBtnActive(btn);
                    }
                    saveOrder(order);
                    return;
                }
                if (itemData.type === "base") {
                    const existingIndex = order.findIndex((item => item.type === "base"));
                    if (existingIndex !== -1 && order[existingIndex].title === itemData.title) {
                        order.splice(existingIndex, 1);
                        setBtnDefault(btn);
                        saveOrder(order);
                        return;
                    }
                    order = order.filter((item => item.type !== "base"));
                    document.querySelectorAll('[data-type="base"]').forEach((b => setBtnDefault(b)));
                    order.push(itemData);
                    saveOrder(order);
                    setBtnActive(btn);
                    return;
                }
                if (itemData.type === "subscription") {
                    const existingIndex = order.findIndex((item => item.type === "subscription"));
                    if (existingIndex !== -1 && order[existingIndex].title === itemData.title) {
                        order.splice(existingIndex, 1);
                        setBtnDefault(btn);
                        saveOrder(order);
                        return;
                    }
                    order = order.filter((item => item.type !== "subscription"));
                    document.querySelectorAll('[data-type="subscription"]').forEach((b => setBtnDefault(b)));
                    order.push({
                        type: itemData.type,
                        title: itemData.title,
                        duration: btn.dataset.duration,
                        totalPrice: btn.dataset.totalPrice,
                        supportive: btn.dataset.supportive,
                        comprehensive: btn.dataset.comprehensive,
                        bonus: btn.dataset.bonus || null
                    });
                    setBtnActive(btn);
                    saveOrder(order);
                    return;
                }
                const index = order.findIndex((item => item.title === itemData.title));
                if (index === -1) {
                    order.push(itemData);
                    setBtnActive(btn);
                } else {
                    order.splice(index, 1);
                    setBtnDefault(btn);
                }
                saveOrder(order);
            }));
        }));
        modeButtons.forEach((modeBtn => {
            modeBtn.addEventListener("click", (e => {
                e.preventDefault();
                modeButtons.forEach((b => b.classList.remove("furniture--active")));
                modeBtn.classList.add("furniture--active");
                const selectedMode = modeBtn.dataset.mode;
                let order = getOrder();
                buttons.forEach((btn => {
                    if (btn.dataset.type === "after-repair") {
                        btn.dataset.mode = selectedMode;
                        if (btn.classList.contains("pricing__btn--selected")) {
                            const index = order.findIndex((item => item.title === btn.dataset.title));
                            if (index !== -1) order[index].mode = selectedMode;
                        }
                    }
                }));
                saveOrder(order);
            }));
        }));
        const currentOrder = getOrder();
        currentOrder.forEach((item => {
            const btn = Array.from(buttons).find((b => b.dataset.title === item.title));
            if (btn) {
                btn.dataset.mode = item.mode;
                setBtnActive(btn);
                const modeBtn = Array.from(modeButtons).find((b => b.dataset.mode === item.mode));
                if (modeBtn) {
                    modeButtons.forEach((b => b.classList.remove("furniture--active")));
                    modeBtn.classList.add("furniture--active");
                }
            }
        }));
        function setBtnActive(btn) {
            btn.classList.add("pricing__btn--selected");
            btn.textContent = "Відхилити";
        }
        function setBtnDefault(btn) {
            btn.classList.remove("pricing__btn--selected");
            btn.textContent = btn.dataset.defaultText;
        }
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
    document.querySelectorAll(".popular-questions-services__item").forEach((item => {
        const minus = item.querySelector(".btn-minus");
        const plus = item.querySelector(".btn-plus");
        const input = item.querySelector(".count-number");
        const addBtn = item.querySelector(".add-more");
        input.value = input.value || 0;
        updateButton();
        plus.addEventListener("click", (() => {
            input.value = +input.value + 1;
            updateButton();
        }));
        minus.addEventListener("click", (() => {
            if (+input.value > 0) {
                input.value = +input.value - 1;
                updateButton();
            }
        }));
        input.addEventListener("input", (() => {
            if (+input.value < 0) input.value = 0;
            updateButton();
        }));
        function updateButton() {
            if (+input.value > 0) addBtn.classList.remove("disabled"); else addBtn.classList.add("disabled");
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
            const swiperEl = block.querySelector(".packages__swiper");
            if (!swiperEl) return;
            const buttonsWrap = block.querySelector(".packages__buttons");
            const tabs = block.querySelectorAll(".packages__tab");
            const slides = block.querySelectorAll(".packages-slide");
            const activeTab = block.querySelector(".packages__tab.active");
            const activeArea = activeTab ? activeTab.dataset.area : "55";
            slides.forEach((slide => {
                slide.style.display = slide.dataset.area === activeArea ? "" : "none";
            }));
            const packagesSwiper = new Swiper(swiperEl, {
                loop: false,
                speed: 700,
                slidesPerView: 3,
                spaceBetween: 30,
                navigation: {
                    nextEl: block.querySelector(".packages__arrow--next"),
                    prevEl: block.querySelector(".packages__arrow--prev")
                },
                pagination: {
                    el: block.querySelector(".packages__pagination"),
                    clickable: true
                },
                breakpoints: {
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                },
                on: {
                    init(swiper) {
                        toggleArrows(swiper);
                    },
                    resize(swiper) {
                        toggleArrows(swiper);
                    },
                    update(swiper) {
                        toggleArrows(swiper);
                    }
                }
            });
            function toggleArrows(swiper) {
                if (!buttonsWrap) return;
                const totalSlides = Array.from(slides).filter((slide => slide.style.display !== "none")).length;
                const visibleSlides = typeof swiper.params.slidesPerView === "number" ? swiper.params.slidesPerView : 1;
                buttonsWrap.style.display = totalSlides > visibleSlides ? "flex" : "none";
            }
            tabs.forEach((tab => {
                tab.addEventListener("click", (function() {
                    tabs.forEach((t => t.classList.remove("active")));
                    this.classList.add("active");
                    const area = this.dataset.area;
                    slides.forEach((slide => {
                        slide.style.display = slide.dataset.area === area ? "" : "none";
                    }));
                    packagesSwiper.update();
                }));
            }));
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
            if (slidesCount <= 1 && navBtns) navBtns.style.display = "none";
            swipers.push(swiper);
        }));
        const allSlides = document.querySelectorAll(".more-services__slide");
        const orderBtn = document.querySelector(".more-services-btn");
        orderBtn.classList.add("disabled");
        allSlides.forEach((slide => {
            slide.addEventListener("click", (e => {
                e.preventDefault();
                slide.classList.toggle("active");
                const anyActive = Array.from(allSlides).some((s => s.classList.contains("active")));
                if (anyActive) {
                    orderBtn.classList.add("active");
                    orderBtn.classList.remove("disabled");
                } else {
                    orderBtn.classList.remove("active");
                    orderBtn.classList.add("disabled");
                }
            }));
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
            const swiperEl = block.querySelector(".season-ticket__swiper");
            if (!swiperEl) return;
            const tabs = block.querySelectorAll(".packages__tab");
            const slides = block.querySelectorAll(".ticket-slide");
            const activeTab = block.querySelector(".packages__tab.active");
            let activeArea = activeTab ? activeTab.dataset.area : "60";
            const filterSlides = area => {
                slides.forEach((slide => {
                    slide.style.display = slide.dataset.area === area ? "" : "none";
                }));
            };
            const getRecommendedIndex = area => {
                const visibleSlides = Array.from(slides).filter((slide => slide.dataset.area === area));
                return visibleSlides.findIndex((slide => slide.classList.contains("ticket-slide-recommended")));
            };
            filterSlides(activeArea);
            const seasonSwiper = new Swiper(swiperEl, {
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
                },
                on: {
                    breakpoint: function() {
                        const isMobile = window.innerWidth <= 768;
                        const index = getRecommendedIndex(activeArea);
                        if (isMobile && index !== -1) this.slideTo(index, 0); else this.slideTo(0, 0);
                    }
                }
            });
            const isMobile = window.innerWidth <= 768;
            const startIndex = getRecommendedIndex(activeArea);
            if (isMobile && startIndex !== -1) seasonSwiper.slideTo(startIndex, 0);
            tabs.forEach((tab => {
                tab.addEventListener("click", (function() {
                    tabs.forEach((t => t.classList.remove("active")));
                    this.classList.add("active");
                    activeArea = this.dataset.area;
                    filterSlides(activeArea);
                    seasonSwiper.update();
                    const isMobile = window.innerWidth <= 768;
                    const index = getRecommendedIndex(activeArea);
                    if (isMobile && index !== -1) seasonSwiper.slideTo(index, 0); else seasonSwiper.slideTo(0, 0);
                }));
            }));
        }));
    }));
    window["FLS"] = true;
})();