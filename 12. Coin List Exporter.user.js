// ==UserScript==
// @name         CryptoHopper Coin List Exporter
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.0
// @description  Add an export option for the coin list on the Cryptohopper config page
// @author       @ilcesko (based on work by coffeeneer)
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/coin-list-exporter.user.js
// @match        https://www.cryptohopper.com/config
// @icon         https://www.google.com/s2/favicons?domain=www.cryptohopper.com
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/12.%20Coin%20List%20Exporter.user.js
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function exportCoinList() {
    const base = jQuery('#collect_currency').val().toUpperCase();
    const coinPairs = jQuery('#allowed_coins')
      .val()
      .map((coin) => `${coin}/${base}`)
      .join(', ');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(coinPairs).then(() => {
        swal({ title: 'Success', text: 'Coinlist copied to clipboard!', type: 'success' });
      }).catch(() => {
        fallbackCopy(coinPairs);
      });
    } else {
      fallbackCopy(coinPairs);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      swal({ title: 'Success', text: 'Coinlist copied to clipboard!', type: 'success' });
    } catch (err) {
      swal({ title: 'Error', text: 'Could not copy to clipboard. Please copy manually: ' + text, type: 'error' });
    }

    document.body.removeChild(textarea);
  }

  function addElements() {
    const button = jQuery('<a href="#"><i class="fa fa-copy m-r-5"></i> Copy coinlist</a>');
    const listItem = jQuery('<li></li>');
    listItem.append(button);
    jQuery('.c-page-heading__actions .btn-group .dropdown-menu').append(listItem);
    button.on('click', (e) => {
      e.preventDefault();
      exportCoinList();
    });
  }

  jQuery(document).ready(() => addElements());
})();