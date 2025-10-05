// ==UserScript==
// @name         Cryptohopper TradingView Chart Mods
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.0
// @description  Adds extra features to TradingView charts like average buy rate and indicator on your last buy
// @author       @ilcesko (based on work by @markrickert)
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/chart-mods.user.js
// @match        https://www.cryptohopper.com/chart/chart.php*
// @icon         https://www.google.com/s2/favicons?domain=cryptohopper.com
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/08.%20TradingView%20Chart%20Mods.user.js
// ==/UserScript==

try {
  if (["/chart/chart.php"].includes(window.location.pathname))
    (function () {
      "use strict";

      const buyRate = parseFloat(getParameterByName("buy_rate"));
      const buyTime = parseInt(getParameterByName("buy_time"));
      const tpRate = getParameterByName("tp_rate");
      const slRate = getParameterByName("sl_rate");

      function mod_createBuyMoment(buyRate, buyTime) {
        widget
          .chart()
          .createExecutionShape()
          .setText("BUY")
          .setTextColor("#29c79e")
          .setArrowColor("#29c79e")
          .setArrowSpacing(5)
          .setArrowHeight(10)
          .setDirection("buy")
          .setTime(buyTime)
          .setPrice(parseFloat(buyRate));
      }

      function mod_createPositionLine(buyRate, tpRate, slRate) {
        createPositionLine("Avg Cost", buyRate, 0, tpRate, slRate);
      }

      function initChartMods() {
        widget.onChartReady(function () {
          if (buyRate && widget) {
            mod_createPositionLine(buyRate, tpRate, slRate);
            mod_createBuyMoment(buyRate, buyTime);
          }
        });
      }

      window.onload = function (e) {
        initChartMods();
      };
    })();
} catch (err) {
  console.log(
    `Error in script chart-mods.user.js: ${err.name}: ${err.message}`
  );
}