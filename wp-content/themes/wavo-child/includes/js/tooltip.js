/* ============================================================
   DVZ TOOLTIP SYSTEM – Global, Single Instance
   Location: /wavo-child/includes/js/tooltip.js
   ============================================================ */

(function () {
    // Prevent running twice
    if (window.DVZ_TOOLTIP_INITIALIZED) return;
    window.DVZ_TOOLTIP_INITIALIZED = true;

    /* ============================================================
       REGISTRY – Centralized tooltip texts
       Add all tooltip IDs here:
       ============================================================ */
    window.DVZ_TOOLTIPS = {
        "tooltip-song": "My fav song of my fav game :)",
        "tooltip-medium": "Read on medium.com",
		"tooltip-medium-more": "Go to medium.com",
        // Add more IDs here...
    };

    /* ============================================================
       CREATE GLOBAL TOOLTIP ELEMENT IF NOT PRESENT
       (User must have <div id="dvz-tooltip"></div> in footer, but
        engine will create it automatically if missing)
       ============================================================ */
    let tooltip = document.getElementById("dvz-tooltip");

    if (!tooltip) {
        tooltip = document.createElement("div");
        tooltip.id = "dvz-tooltip";
        document.body.appendChild(tooltip);
    }

    let activeEl = null;

    /* ============================================================
       MOUSE FOLLOW
       ============================================================ */
    document.addEventListener("mousemove", (e) => {
        if (!activeEl) return;

        tooltip.style.left = e.clientX + 16 + "px";
        tooltip.style.top = e.clientY + 20 + "px";
    });

    /* ============================================================
       SHOW TOOLTIP
       ============================================================ */
    function showTooltip(el) {
        const id = el.id;
        const text = window.DVZ_TOOLTIPS[id];

        if (!text) return;

        activeEl = el;
        tooltip.textContent = text;

        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateY(0px)";
    }

    /* ============================================================
       HIDE TOOLTIP
       ============================================================ */
    function hideTooltip() {
        activeEl = null;
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateY(6px)";
    }

    /* ============================================================
       EVENT DELEGATION – Works for Elementor dynamic content
       ============================================================ */
    document.addEventListener("mouseover", (e) => {
        const el = e.target.closest(".tooltip-dvz");
        if (el) showTooltip(el);
    });

    document.addEventListener("mouseout", (e) => {
        const el = e.target.closest(".tooltip-dvz");
        if (el) hideTooltip(el);
    });

})();
