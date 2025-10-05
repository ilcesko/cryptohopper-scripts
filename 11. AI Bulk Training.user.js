// ==UserScript==
// @name         CryptoHopper AI Bulk Training
// @namespace    https://github.com/ilcesko/cryptohopper-scripts
// @version      1.0
// @description  Add a bulk train option to Cryptohopper AI training page
// @author       @ilcesko (based on work by coffeeneer)
// @homepage     https://github.com/ilcesko/cryptohopper-scripts
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/ai-bulk-training.user.js
// @match        https://www.cryptohopper.com/strategies?edit_ai*
// @icon         https://www.google.com/s2/favicons?domain=www.cryptohopper.
// @updateURL    https://github.com/ilcesko/cryptohopper-scripts/raw/main/11.%20AI%20Bulk%20Training.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function trainCoinPairs(config, coinPairs, currentQueueSize) {
        if (coinPairs.length < 1) {
            swal({
                title: 'Success',
                text: 'All available coin pairs added to training queue!',
                type: 'success',
            });
            return finishTraining(currentQueueSize);
        }

        if (currentQueueSize >= max_trainings) {
            const pairsRemaining = coinPairs.join(', ');
            swal({
                title: 'Full queue',
                text: `Training queue filled up! Remaining coins: ${pairsRemaining}`,
                type: 'error',
            });
            return finishTraining(currentQueueSize);
        }

        const currentCoinPair = coinPairs.pop();

        doApiCall(
            'convertmarket',
            {
                exchange: config.exchange,
                market: currentCoinPair,
            },
            (result) => {
                doApiCall(
                    'trainai',
                    {
                        ...config,
                        pair: result.pair,
                    },
                    (_result) => {
                        refreshAITrainings();
                        setTimeout(
                            () => trainCoinPairs(config, coinPairs, currentQueueSize + 1),
                            1200
                        );
                    },
                    (error) => {
                        swal({ title: 'Error', text: error, timer: 4e3, type: 'error' });
                        finishTraining(currentQueueSize);
                    }
                );
            },
            (error) => {
                swal({ title: 'Error', text: error, timer: 4e3, type: 'error' });
                finishTraining(currentQueueSize);
            }
        );
    }

    function startTrainingCoinPairs(coinPairs) {
        const config = {};
        config.id = jQuery('#ai_id').val();
        if (config.id == 'new') {
            return swal({
                title: 'Error',
                text: 'You cannot train a new AI. Please save your AI first.',
                timer: 4e3,
                type: 'error',
            });
        }

        const button = jQuery('#learnAIButton');
        button.html('<i class="fa fa-refresh fa-spin m-r-5"></i>');
        button.prop('disabled', true);

        const strategy = jQuery('#selected_strategy_id option:selected');
        config.exchange = jQuery('#select_exchange').val();
        config.strategy_id = strategy.val();
        config.strategy_type = strategy.data('type');

        doApiCall(
            'loadaitraining',
            {
                id: config.id,
            },
            (result) => {
                const availablePairs = window
                    .jQuery('#select_market option')
                    .map(function () {
                        return jQuery(this).val();
                    })
                    .get();

                coinPairs = coinPairs.filter((coinPair) => {
                    const splitPair = coinPair.split('/');
                    return (
                        !!availablePairs.find((availablePair) => availablePair === coinPair) &&
                        !result.data.find(
                            (training) =>
                                training.strategy_id == config.strategy_id &&
                                training.exchange == config.exchange &&
                                training.pair.includes(splitPair[0]) &&
                                training.pair.includes(splitPair[1])
                        )
                    );
                });

                trainCoinPairs(config, coinPairs, result.total_trainings);
            },
            (error) => {
                swal({ title: 'Error', text: error, timer: 4e3, type: 'error' });
                jQuery('#learnAIButton').html('<i class="md md-android m-r-5"></i> Learn');
            }
        );
    }

    function finishTraining(currentQueueSize) {
        jQuery('#learnAIButton').html('<i class="md md-android m-r-5"></i> Learn');
        return setAILearnButton(currentQueueSize);
    }

    function promptCoinPairs() {
        swal({
            title: 'Bulk Add Coin Pairs',
            input: 'textarea',
            text: 'Input your coin pair list, comma separated',
            inputPlaceholder: 'BTC/USDT, ETH/USDT etc.',
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                const coinPairList = Array.from(
                    new Set(result.value.split(',').map((pair) => pair.trim())).values()
                );

                startTrainingCoinPairs(coinPairList);
            }
        });
    }

    function addElements() {
        const style = jQuery('<style>.swal2-popup .swal2-textarea { color: #4c5667; }</style>');
        const button = jQuery(
            '<button type="button" class="btn waves-effect waves-light btn-primary"><i class="md md-school m-r-5"></i> Bulk Learn</button>'
        );
        const buttonGroup = jQuery('<div class="btn-group m-t-5" style="display: none;"></div>');
        buttonGroup.append(button);

        jQuery('body').prepend(style);
        jQuery('#ai_designer_wrapper .btn-toolbar').append(buttonGroup);

        jQuery('#viewTrainingButton').on('click', () => {
            buttonGroup.show();
        });
        jQuery('#viewEditorButton, #viewResultsButton').on('click', () => {
            buttonGroup.hide();
        });
        button.on('click', () => promptCoinPairs());
    }

    jQuery(document).ready(() => addElements());
})();