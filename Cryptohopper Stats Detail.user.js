// ==UserScript==
// @name         Cryptohopper Stats Detail
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.0
// @description  Adds additional profit detail and base currency balance to the stats box
// @author       @ilcesko (based on work by @falcontx)
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @match        https://www.cryptohopper.com/dashboard
// @icon         https://www.google.com/s2/favicons?domain=cryptohopper.com
// @grant        none
// ==/UserScript==

try {
  if (["/dashboard"].includes(window.location.pathname))
    (function () {
      "use strict";
      var base = collect_currency;

      function statsDetail() {
        jQuery(
          "#statsinfo > div > div:nth-child(1) > div.col-xs-10 > p.text-muted.m-b-5.font-13.text-uppercase.pull-left"
        ).contents()[0].nodeValue = "Profit (gross + positions = current):  ";
        jQuery("#statsinfo > div > div:nth-child(1) > div.col-xs-10 > h4").prop(
          "id",
          "original"
        );
        jQuery("#original")
          .clone()
          .insertAfter("#original")
          .prop("id", "gross");
        jQuery("#original").hide();
        jQuery("#gross").clone().insertAfter("#gross").prop("id", "positions");
        jQuery("#positions")
          .clone()
          .insertAfter("#positions")
          .prop("id", "net");
        jQuery("#positions")
          .addClass("text-inverse")
          .css("border-bottom", "1px solid #555")
          .css("display", "inline-block");
        jQuery("#gross > strong > #stats_total_returns").prop(
          "id",
          "detail_total_gross"
        );
        jQuery("#positions > strong > #stats_total_returns").prop(
          "id",
          "detail_total_positions"
        );
        jQuery("#net > strong > #stats_total_returns").prop(
          "id",
          "detail_total_net"
        );
        jQuery("#gross > #stats_percent_change").prop(
          "id",
          "detail_percent_gross"
        );
        jQuery("#positions > #stats_percent_change").prop(
          "id",
          "detail_percent_positions"
        );
        jQuery("#net > #stats_percent_change").prop("id", "detail_percent_net");
        jQuery("#statsinfo > div > div:nth-child(3) > div.col-xs-10").prop(
          "id",
          "basetotal"
        );
        jQuery("#basetotal").append('<hr class="m-b-15">');
        jQuery("#basetotal").append(
          `<p class="text-muted m-b-5 font-13 text-uppercase">${base} available on exchange:</p><h4 class="m-t-0 m-b-5 counter text-inverse"><strong><span id="val_baseavail"></span></strong> <span id="val_baseavail_percent_change_wrapper" style="display: inline;">(<span id="val_baseavail_percent_change"></span>%)</span></h4>`
        );
        updateValues();
      }

      function updateValues() {
        var positions = parseFloat(jQuery("#stats_total_positions").text());
        var startBalance = parseFloat(String(hopper_start_balance).replace(/,/g, ""));
        var totalBalance = parseFloat(String(current_hopper_balance).replace(/,/g, ""));
        var netProfit = totalBalance - startBalance;
        var grossProfit = netProfit - positions;
        var netProfitPct = (netProfit / startBalance) * 100;
        var positionsPct = (positions / startBalance) * 100;
        var grossProfitPct = (grossProfit / startBalance) * 100;

        var baseAvailText = $('#total_allowed_buy').text().trim();
        var baseAvail = parseFloat(baseAvailText.replace(/,/g, ''));
        var baseAvailPct = (baseAvail / totalBalance) * 100;

        jQuery("#detail_total_gross").text(grossProfit.toFixed(2));
        jQuery("#detail_percent_gross").text(grossProfitPct.toFixed(2));
        jQuery("#detail_total_positions").text(positions.toFixed(2));
        jQuery("#detail_percent_positions").text(positionsPct.toFixed(2));
        jQuery("#detail_total_net").text(netProfit.toFixed(2));
        jQuery("#detail_percent_net").text(netProfitPct.toFixed(2));

        if (typeof jQuery("#val_totalbalance").attr("class") != "undefined") {
          jQuery("#net").attr(
            "class",
            "m-t-0 m-b-5 " + jQuery("#val_totalbalance").attr("class")
          );
        } else {
          jQuery("#net").attr(
            "class",
            jQuery("#val_totalbalance").parent().parent().attr("class")
          );
        }

        if (grossProfit >= 0) {
          jQuery("#gross").attr("class", "m-t-0 m-b-5 text-success");
        } else {
          jQuery("#gross").attr("class", "m-t-0 m-b-5 text-danger");
        }

        jQuery("#val_baseavail").text(baseAvail.toFixed(2));
        jQuery("#val_baseavail_percent_change").text(baseAvailPct.toFixed(4));
      }

      function watchStatsData() {
        statsDetail();
        jQuery(document).ajaxComplete(updateValues);
      }

      jQuery(() => {
        watchStatsData();
      });
    })();
} catch (err) {
  console.log(
    `Error in script stats-detail.user.js: ${err.name}: ${err.message}`
  );
}