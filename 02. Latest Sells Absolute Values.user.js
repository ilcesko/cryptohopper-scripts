// ==UserScript==
// @name         Cryptohopper Latest Sells Absolute Values
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.1
// @description  Adds absolute profit/loss values to Latest Sells table
// @author       @ilcesko
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @match        https://www.cryptohopper.com/dashboard*
// @icon         https://www.google.com/s2/favicons?domain=cryptohopper.com
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/02.%20Latest%20Sells%20Absolute%20Values.user.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function updateSellsAbsoluteValues() {
        const table = document.querySelector('#datatable-latesttrades');
        if (!table) return;

        const rows = table.querySelectorAll('tbody tr');

        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 3) return;

            const totalCell = cells[1];
            const totalValue = parseFloat(totalCell.textContent.trim().replace(/,/g, ''));

            const resultCell = cells[2];
            const resultSpan = resultCell.querySelector('span');

            if (!resultSpan || isNaN(totalValue)) return;

            const percentageMatch = resultSpan.textContent.match(/-?[\d.]+/);
            if (!percentageMatch) return;

            const percentage = parseFloat(percentageMatch[0]);

            // Calculate absolute profit using formula: totalValue * (percentage / (100 + percentage))
            const absoluteProfit = (totalValue * percentage / (100 + percentage)).toFixed(2);
            const displayValue = `(${absoluteProfit > 0 ? '+' : ''}${absoluteProfit})`;

            resultSpan.setAttribute('data-absolute', displayValue);
        });
    }

    function addStyles() {
        GM_addStyle(`
            #datatable-latesttrades tbody td span[data-absolute]::after {
                content: " " attr(data-absolute);
                margin-left: 0.5em;
                font-weight: normal;
                opacity: 0.8;
            }
        `);
    }

    function init() {
        addStyles();

        setTimeout(updateSellsAbsoluteValues, 1000);
        setTimeout(updateSellsAbsoluteValues, 2000);

        const observer = new MutationObserver(() => {
            setTimeout(updateSellsAbsoluteValues, 100);
        });

        const tradesDiv = document.getElementById('latesttrades_div');
        if (tradesDiv) {
            observer.observe(tradesDiv, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }

        const refreshButton = document.getElementById('refreshLatestTradesButton');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => {
                setTimeout(updateSellsAbsoluteValues, 500);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();