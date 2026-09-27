/* ============================================================
   BENTO CORE – ultra-light loader for slot scripts
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const loadedSlots = new Set();

    // Mapa: clase del slot → archivo JS dentro de /bento-box/
    const slotScripts = {
        "bento-slot-1": "/wp-content/themes/wavo-child/includes/bento-box/js/slot-1.js",
        "bento-slot-2": "/wp-content/themes/wavo-child/includes/bento-box/js/slot-2.js",
        "bento-slot-3": "/wp-content/themes/wavo-child/includes/bento-box/js/slot-3.js",
        "bento-slot-4": "/wp-content/themes/wavo-child/includes/bento-box/js/slot-4.js",
        "bento-slot-5": "/wp-content/themes/wavo-child/includes/bento-box/js/slot-5.js",
        "bento-slot-6": "/wp-content/themes/wavo-child/includes/bento-box/js/slot-6.js",
        "bento-slot-7": "/wp-content/themes/wavo-child/includes/bento-box/js/slot-7.js"
    };

    /* ------------------------------------------------------------
       loadScript – carga dinámica y evita dobles ejecuciones
    ------------------------------------------------------------ */
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            // evitar cargar dos veces
            if (document.querySelector(`script[data-bento-src="${src}"]`)) {
                resolve();
                return;
            }

            const s = document.createElement("script");
            s.src = src + "?v=" + Date.now(); // anti-cache
            s.async = true;
            s.dataset.bentoSrc = src;

            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Failed to load " + src));

            document.body.appendChild(s);
        });
    }

    /* ------------------------------------------------------------
       initSlot – carga el JS del slot si existe en DOM
    ------------------------------------------------------------ */
    async function initSlot(slotClass) {
        if (loadedSlots.has(slotClass)) return;

        const slotEl = document.querySelector(`.${slotClass}`);
        if (!slotEl) return;

        const jsFile = slotScripts[slotClass];
        if (!jsFile) return;

        try {
            await loadScript(jsFile);

            // Cada slot debe exponer una función global initSlotX()
            const fnName = "init" + slotClass.replace("bento-slot-", "Slot");
            if (typeof window[fnName] === "function") {
                window[fnName](slotEl);
            }

            loadedSlots.add(slotClass);

        } catch (err) {
            console.error("[BENTO] Error cargando", jsFile, err);
        }
    }

    /* ------------------------------------------------------------
       DETECTAR Y CARGAR
       Todos los slots presentes en el DOM
    ------------------------------------------------------------ */
    Object.keys(slotScripts).forEach(slotClass => initSlot(slotClass));
});
