// ==UserScript==
// @name         Cryptohopper Target Restore
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.1
// @description  Replicates old target functionality but marks any targets that would otherwise be hidden as "inactive" and displays them in the platform's warning color
// @author       @ilcesko (based on work by @henrygarle)
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @match        https://www.cryptohopper.com/dashboard*
// @icon         https://www.google.com/s2/favicons?domain=cryptohopper.com
// ==/UserScript==

(function() {
    'use strict';

    function processResponse(event, xhr, settings) {
        if (!settings.url.includes('currenttargets')) return;

        try {
            const response = JSON.parse(xhr.responseText);

            if (response.data && response.data.ta_values) {
                const { new_target, ta_values } = response.data;

                let targets = {};

                for (const target in ta_values) {
                    if (ta_values[target].signals == "buy") {
                        targets[target] = false;
                    }
                }

                if (new_target) {
                    const activeTargets = typeof new_target === "string" ? [new_target] : new_target;
                    activeTargets.forEach((target) => {
                        targets[target] = true;
                    });
                }

                let targetKeys = Object.keys(targets);

                if (targetKeys.length > 0) {
                    let inactiveTargets = [];
                    let activeTargets = [];

                    targetKeys.forEach((target) => {
                        if (targets[target]) {
                            activeTargets.push(target);
                        } else {
                            inactiveTargets.push(target);
                        }
                    });

                    const output = activeTargets.join(", ") +
                        (activeTargets.length && inactiveTargets.length ? ", " : "") +
                        (inactiveTargets.length ?
                            `<span class="text-warning">${inactiveTargets.join(", ")}</span>` : "");

                    let spinnerClass = activeTargets.length ? "text-success" : "text-warning";

                    jQuery("#current_target_coin")
                        .fadeOut(100)
                        .removeClass("text-inverse")
                        .addClass("text-success")
                        .html(output)
                        .fadeIn(100);

                    jQuery("#searching_target_spinner")
                        .fadeOut(100)
                        .removeClass("fa fa-refresh fa-spin md-location-searching")
                        .addClass(`md md-gps-fixed ${spinnerClass}`)
                        .css("margin-top", "-10px")
                        .fadeIn(100);
                } else {
                    jQuery("#searching_target_spinner").removeClass("text-warning text-success");
                }
            }
        } catch (err) {
            // Silently handle errors
        }
    }

    function monitorTargetRequest() {
        if (typeof jQuery !== 'undefined') {
            jQuery(document).ajaxComplete(processResponse);
        }
    }

    if (typeof jQuery !== 'undefined') {
        jQuery(monitorTargetRequest);
    } else {
        setTimeout(monitorTargetRequest, 1000);
    }

})();