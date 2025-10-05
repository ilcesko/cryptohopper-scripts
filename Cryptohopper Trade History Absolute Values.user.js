// ==UserScript==
// @name         Cryptohopper Trade History Absolute Values
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.1
// @description  Adds absolute profit/loss values to Trade History table
// @author       @ilcesko
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @match        https://www.cryptohopper.com/trade-history*
// @icon         https://www.google.com/s2/favicons?domain=cryptohopper.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function updateTradeHistoryAbsoluteValues() {
        const table = document.querySelector('#trade_history_table');
        if (!table) return;

        const rows = table.querySelectorAll('tbody tr');

        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 9) return;

            const typeCell = cells[2];
            const isSell = typeCell.textContent.includes('SELL');

            if (!isSell) return;

            const totalCell = cells[7];
            const totalValue = parseFloat(totalCell.textContent.trim().replace(/,/g, ''));

            const resultCell = cells[8];
            const resultSpan = resultCell.querySelector('span');

            if (!resultSpan || isNaN(totalValue)) return;

            const percentageMatch = resultSpan.textContent.match(/-?[\d.]+/);
            if (!percentageMatch) return;

            const percentage = parseFloat(percentageMatch[0]);

            const absoluteProfit = (totalValue * percentage / (100 + percentage)).toFixed(2);
            const displayValue = `(${absoluteProfit > 0 ? '+' : ''}${absoluteProfit})`;

            resultSpan.setAttribute('data-absolute', displayValue);
        });
    }

    function addStyles() {
        GM_addStyle(`
            #trade_history_table tbody td span[data-absolute]::after {
                content: " " attr(data-absolute);
                margin-left: 0.5em;
                font-weight: normal;
                opacity: 0.8;
            }
        `);
    }

    function init() {
        addStyles();

        setTimeout(updateTradeHistoryAbsoluteValues, 1000);
        setTimeout(updateTradeHistoryAbsoluteValues, 2000);
        setTimeout(updateTradeHistoryAbsoluteValues, 3000);

        const observer = new MutationObserver(() => {
            setTimeout(updateTradeHistoryAbsoluteValues, 100);
        });

        const table = document.getElementById('trade_history_table');
        if (table) {
            observer.observe(table, {
                childList: true,
                subtree: true,
                characterData: true
            });
        } else {
            setTimeout(init, 2000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();