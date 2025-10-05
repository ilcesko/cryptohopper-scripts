// ==UserScript==
// @name         Cryptohopper Position Targets
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.1
// @description  Adds icons after position names: green (buy target), red (sell target)
// @author       @ilcesko (based on work by @markrickert)
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @match        https://www.cryptohopper.com/dashboard*
// @icon         https://www.google.com/s2/favicons?domain=cryptohopper.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function addStyles() {
        GM_addStyle(`
            table.dataTable tr td.target-buy::after,
            table.dataTable tr td.target-sell::after,
            table.dataTable tr td.target-none::after {
                display: inline-block;
                font-style: normal;
                font-variant: normal;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                font-family: 'Material Design Iconic Font';
                padding-left: 3px;
                font-size: 0.9em;
                content: "\\f140";
                color: #06cc98;
            }
            table.dataTable tr td.target-sell::after {
                color: #f6887d;
                content: "\\f140";
            }
            table.dataTable tr td.target-none::after {
                color: #999;
                content: "\\f141";
            }
        `);
    }

    function processResponse(event, xhr, settings) {
        if (!settings.url.includes('currenttargets')) return;

        try {
            const response = JSON.parse(xhr.responseText);

            if (response.data && response.data.ta_values) {
                const { current_sells, ta_values } = response.data;

                const allCoinTDs = jQuery(
                    `table:contains('Currency'):contains('Action') tr td:has("a[data-target='.chart-modal'] strong")`
                );

                allCoinTDs.removeClass("target-buy target-sell target-none");

                let sellTargets = [];
                if (current_sells && current_sells.length > 0) {
                    sellTargets = current_sells.split(",");
                }

                let buyTargets = [];
                for (const target in ta_values) {
                    if (ta_values[target].signals == "buy") {
                        buyTargets.push(target);
                    }
                }

                allCoinTDs.each((i, td) => {
                    const coinName = td.innerText.trim();

                    if (sellTargets.includes(coinName)) {
                        jQuery(td).addClass("target-sell");
                    } else if (buyTargets.includes(coinName)) {
                        jQuery(td).addClass("target-buy");
                    }
                });
            }
        } catch (err) {
            // Silently handle errors
        }
    }

    function watchTargets() {
        if (typeof jQuery !== 'undefined') {
            jQuery(document).ajaxComplete(processResponse);
        }
    }

    function init() {
        addStyles();
        watchTargets();
    }

    if (typeof jQuery !== 'undefined') {
        jQuery(init);
    } else {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(init, 1000);
            });
        } else {
            setTimeout(init, 1000);
        }
    }

})();