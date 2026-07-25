const REFRESH_INTERVAL = 30000;

let oldPrices = {};

const sites = [
    "mg",
    "tg",
    "sv"
];

function nowTime() {

    const d = new Date();

    document.getElementById("lastUpdate").innerHTML =
        "آخرین بروزرسانی : " +
        d.toLocaleTimeString("fa-IR");

}

function setStatus(site, text, cls) {

    const el = document.getElementById(site + "_status");

    el.innerHTML = text;

    el.className = cls;

}

function updatePrice(id, value) {

    const el = document.getElementById(id);

    if (!el) return;

    if (oldPrices[id] !== value) {

        el.classList.remove("flash");

        void el.offsetWidth;

        el.classList.add("flash");

        oldPrices[id] = value;

    }

    el.innerHTML = value;

}

async function loadMelliGold() {

    try {

        setStatus("mg", "درحال دریافت...", "wait");

        /*

        این قسمت در مرحله بعد به Worker متصل می‌شود.

        */

        updatePrice("mg_gold18", "...");

        updatePrice("mg_mazane", "...");

        updatePrice("mg_coin", "...");

        updatePrice("mg_ounce", "...");

        setStatus("mg", "🟢", "online");

    }

    catch (e) {

        setStatus("mg", "🔴", "offline");

    }

}

async function loadTGJU() {

    try {

        setStatus("tg", "درحال دریافت...", "wait");

        updatePrice("tg_gold18", "...");

        updatePrice("tg_mazane", "...");

        updatePrice("tg_coin", "...");

        updatePrice("tg_ounce", "...");

        setStatus("tg", "🟢", "online");

    }

    catch (e) {

        setStatus("tg", "🔴", "offline");

    }

}

async function loadServatmandi() {

    try {

        setStatus("sv", "درحال دریافت...", "wait");

        updatePrice("sv_gold18", "...");

        updatePrice("sv_mazane", "...");

        updatePrice("sv_coin", "...");

        updatePrice("sv_ounce", "...");

        setStatus("sv", "🟢", "online");

    }

    catch (e) {

        setStatus("sv", "🔴", "offline");

    }

}

async function refreshAll() {

    nowTime();

    await loadMelliGold();

    await loadTGJU();

    await loadServatmandi();

}

document
.getElementById("refreshBtn")
.addEventListener("click", refreshAll);

refreshAll();

setInterval(refreshAll, REFRESH_INTERVAL);
