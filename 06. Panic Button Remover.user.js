// ==UserScript==
// @name         Cryptohopper Panic Button Remover
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.1
// @description  Hides the panic button from the dashboard
// @author       @ilcesko (based on work by previous contributors @markrickert)
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @match        https://www.cryptohopper.com/dashboard*
// @icon         https://www.google.com/s2/favicons?domain=cryptohopper.com
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/06.%20Panic%20Button%20Remover.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hidePanicButton() {
        const panicButton = document.getElementById("panic-button");
        const panicActive = document.getElementById("panic-button-active");
        const checkbox = document.getElementById("panic_mode_market_orders");
        const warningIcon = document.querySelector("i.md.md-warning.text-danger");
        const widgetContainer = document.querySelector("div.card-box.widget-icon.redesign-portlet:has(#panic-button)");

        let hidden = 0;

        if (widgetContainer) {
            widgetContainer.style.display = "none";
            hidden++;
        } else {
            if (panicButton) {
                const container = panicButton.closest("div.wid-icon-info");
                if (container) {
                    container.style.display = "none";
                    hidden++;
                }
            }

            if (panicActive) {
                panicActive.style.display = "none";
                hidden++;
            }

            if (checkbox) {
                const checkDiv = checkbox.closest(".checkbox");
                if (checkDiv) {
                    checkDiv.style.display = "none";
                    hidden++;
                }
            }

            if (warningIcon) {
                warningIcon.style.display = "none";
                hidden++;
            }
        }

        return hidden > 0;
    }

    setTimeout(hidePanicButton, 1000);
    setTimeout(hidePanicButton, 3000);
})();