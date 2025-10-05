// ==UserScript==
// @name         Cryptohopper Export Saved Trade History
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.0
// @description  Adds single-click export functionality to the trade history page using saved settings, and allows for saving and loading export settings
// @author       @ilcesko (based on work by @eatsleepcoderepeat-gl)
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/export-saved-trade-history.user.js
// @match        https://www.cryptohopper.com/trade-history
// @icon         https://www.google.com/s2/favicons?domain=cryptohopper.com
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/10.%20Export%20Saved%20Trade%20History.user.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

try {
  if (["/trade-history"].includes(window.location.pathname))
    (function () {
      "use strict";

      const EXPORT_KEY = "export-trade-history-settings";
      const EXPORT_BUTTON_NAME = "#export-saved-trade-history";
      const SAVE_BUTTON_NAME = "#save-export-settings";
      const LOAD_BUTTON_NAME = "#load-export-settings";
      const BUTTON_PRIMARY_CLASS = "btn btn-primary waves-effect waves-light";
      const BUTTON_SECONDARY_CLASS = "btn btn-default waves-effect";
      var buttonsAdded = false;

      function loadSavedSettings() {
        var exportSettings = JSON.parse(GM_getValue(EXPORT_KEY));

        $("#export_type").val(exportSettings.format);
        $("#check_buys").prop("checked", exportSettings.buys);
        $("#check_sells").prop("checked", exportSettings.sells);
        $("#export_daterange").val(exportSettings.daterange);
      }

      function setStyles() {
        GM_addStyle(`
        button${EXPORT_BUTTON_NAME},
        button${SAVE_BUTTON_NAME} {
          margin-right: 3px;
        }
        button${LOAD_BUTTON_NAME} {
          margin-right: 2px;
        }
      `);
      }

      function exportButtonHandler() {
        if (
          !$(EXPORT_BUTTON_NAME).length &&
          GM_getValue(EXPORT_KEY, false) !== false
        ) {
          $(`button[onclick="jQuery('#exportDiv').toggle()"]`).before(
            `<button type="button" id="${EXPORT_BUTTON_NAME.replace(
              "#",
              ""
            )}" class="${BUTTON_PRIMARY_CLASS}"><i class="fa fa-download m-r-5"></i> Export Saved</button>`
          );

          $(EXPORT_BUTTON_NAME).on("click", function () {
            loadSavedSettings();
            startExport();
          });

          buttonsAdded = true;
        }
      }

      function saveSettingsButtonHandler() {
        if ($(SAVE_BUTTON_NAME).length) return;

        $('button[onclick="startExport()"]').before(
          `<button type="button" id="${SAVE_BUTTON_NAME.replace(
            "#",
            ""
          )}" class="${BUTTON_PRIMARY_CLASS}">Save Settings</button>`
        );

        $(SAVE_BUTTON_NAME).on("click", function () {
          var format = $("#export_type").val();
          var buys = $("#check_buys").prop("checked");
          var sells = $("#check_sells").prop("checked");
          var daterange = $("#export_daterange").val();

          GM_setValue(
            EXPORT_KEY,
            JSON.stringify({
              format: format,
              buys: buys,
              sells: sells,
              daterange: daterange,
            })
          );

          if (!buttonsAdded) {
            exportButtonHandler();
            loadSettingsButtonHandler();
          }
        });
      }

      function loadSettingsButtonHandler() {
        if (
          !$(LOAD_BUTTON_NAME).length &&
          GM_getValue(EXPORT_KEY, false) !== false
        ) {
          $(SAVE_BUTTON_NAME).before(
            `<button type="button" id="${LOAD_BUTTON_NAME.replace(
              "#",
              ""
            )}" class="${BUTTON_SECONDARY_CLASS}">Load Settings</button>`
          );

          $(LOAD_BUTTON_NAME).on("click", loadSavedSettings);

          buttonsAdded = true;
        }
      }

      jQuery(() => {
        setStyles();
        exportButtonHandler();

        setTimeout(() => {
          saveSettingsButtonHandler();
          loadSettingsButtonHandler();
        }, 500);
      });
    })();
} catch (err) {
  console.log(
    `Error in script export-saved-trade-history.user.js: ${err.name}: ${err.message}`
  );
}