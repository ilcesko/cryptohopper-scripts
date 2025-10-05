// ==UserScript==
// @name         Cryptohopper Absolute Values
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.2
// @description  Adds absolute value for your open positions using CSS approach
// @author       @ilcesko (based on work by @eatsleepcoderepeat-gl, @markrickert)
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @match        https://www.cryptohopper.com/dashboard*
// @icon         https://www.google.com/s2/favicons?domain=cryptohopper.com
// @grant        GM_addStyle
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/01.%20Absolute%20Values.user.js
// ==/UserScript==

(function() {
    'use strict';

    function updateCSSAttributes() {
        document.querySelectorAll('tr[data-pair]').forEach((row) => {
            const pair = row.getAttribute('data-pair');
            const pairClass = pair.replace(/\//g, '_');
            const rateSpan = row.querySelector(`span.rate_${pairClass}`);
            const cells = row.querySelectorAll('td');
            let costCell = null;

            // Strategy: cost column is the one before the rate column
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].querySelector(`span.rate_${pairClass}`)) {
                    if (i > 0) {
                        costCell = cells[i - 1];
                    }
                    break;
                }
            }

            // Fallback: find a cell with a reasonable decimal number
            if (!costCell) {
                for (let i = 0; i < cells.length; i++) {
                    const text = cells[i].textContent.trim();
                    const num = parseFloat(text.replace(/,/g, ''));
                    if (!isNaN(num) && num > 1 && text.includes('.')) {
                        costCell = cells[i];
                        break;
                    }
                }
            }

            if (rateSpan && costCell) {
                const percentageMatch = rateSpan.textContent.match(/-?[\d.]+/);
                const cost = parseFloat(costCell.textContent.replace(/,/g, ''));

                if (percentageMatch && !isNaN(cost)) {
                    const percentage = parseFloat(percentageMatch[0]);
                    const absoluteValue = ((percentage / 100) * cost).toFixed(2);
                    const displayValue = `(${absoluteValue > 0 ? '+' : ''}${absoluteValue})`;

                    rateSpan.setAttribute('data-absolute', displayValue);
                }
            }
        });
    }

    function addStyles() {
        GM_addStyle(`
            span[class*="rate_"][data-absolute]::after {
                content: " " attr(data-absolute);
                margin-left: 0.5em;
                font-weight: normal;
                opacity: 0.8;
            }
        `);
    }

    function init() {
        addStyles();
        setTimeout(updateCSSAttributes, 1000);

        const observer = new MutationObserver(() => {
            setTimeout(updateCSSAttributes, 100);
        });

        const tableContainer = document.getElementById('openPosTableHolder');
        if (tableContainer) {
            observer.observe(tableContainer, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();