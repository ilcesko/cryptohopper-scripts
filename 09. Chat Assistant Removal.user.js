// ==UserScript==
// @name         Cryptohopper Chat Assistant Removal
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      0.5
// @description  Removes the Hoppie mascot and Intercom chat widget from all pages
// @author       @ilcesko (based on work by @markrickert)
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/chat-assistant-removal.user.js
// @match        https://www.cryptohopper.com/*
// @icon         https://www.google.com/s2/favicons?domain=cryptohopper.com
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/09.%20Chat%20Assistant%20Removal.user.js
// @grant        GM_addStyle
// ==/UserScript==

try {
  (function () {
    "use strict";

    function removeHoppie() {
      GM_addStyle(`
        img.hoppie-paperclip,
        img.hoppiePaperclipAnimation,
        div.hoppie-speech-container,
        div.intercom-lightweight-app,
        div.intercom-launcher,
        iframe#intercom-frame {
          display: none !important;
        }
      `);
    }

    jQuery(() => removeHoppie());
  })();
} catch (err) {
  console.log(
    `Error in script chat-assistant-removal.user.js: ${err.name}: ${err.message}`
  );
}