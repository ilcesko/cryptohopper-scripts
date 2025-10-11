// ==UserScript==
// @name         Cryptohopper Panic Button Remover Mobile
// @namespace    cryptohopper
// @version      1.1-mobile
// @description  Hide panic button - Firefox Android Optimized
// @author       @ilcesko
// @match        https://www.cryptohopper.com/dashboard*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    console.log("🎯 PANIC REMOVER MOBILE (Firefox) ATTIVO");

    function hidePanicButton() {
        const selectors = [
            "#panic-button",
            "#panic-button-active",
            "div.card-box.widget-icon:has(#panic-button)",
            "div.card-box.widget-icon.redesign-portlet:has(#panic-button)"
        ];

        let hidden = 0;

        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (el && el.style.display !== "none") {
                        el.style.display = "none";
                        hidden++;
                        console.log(`✅ Nascosto: ${selector}`);
                    }
                });
            } catch(e) {
                console.warn(`⚠️ Selector fallito: ${selector}`, e);
            }
        });

        // Fallback: cerca panic button e nascondi parent container
        const panicButton = document.getElementById("panic-button");
        if (panicButton && panicButton.style.display !== "none") {
            let parent = panicButton.parentElement;
            let depth = 0;
            
            while (parent && depth < 6) {
                if (parent.classList.contains('card-box') || 
                    parent.classList.contains('widget-icon') ||
                    parent.classList.contains('redesign-portlet')) {
                    parent.style.display = "none";
                    hidden++;
                    console.log(`✅ Nascosto parent container (depth: ${depth})`);
                    break;
                }
                parent = parent.parentElement;
                depth++;
            }
        }

        if (hidden > 0) {
            console.log(`✅ Totale elementi nascosti: ${hidden}`);
        }

        return hidden > 0;
    }

    // Esecuzione multipla per gestire caricamento dinamico
    const timings = [0, 500, 1000, 2000, 3000];
    timings.forEach(delay => {
        setTimeout(() => {
            hidePanicButton();
        }, delay);
    });

    // MutationObserver per elementi aggiunti dopo
    const observer = new MutationObserver((mutations) => {
        const hasPanicButton = document.getElementById("panic-button");
        if (hasPanicButton) {
            hidePanicButton();
        }
    });

    // Aspetta che il body sia disponibile
    function startObserving() {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log("👁️ MutationObserver attivato");
        } else {
            setTimeout(startObserving, 100);
        }
    }

    startObserving();

    // Gestione visibilità pagina (quando torni dall'app)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            setTimeout(hidePanicButton, 500);
        }
    });

})();
