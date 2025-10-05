# Cryptohopper Scripts

A collection of userscripts to enhance the Cryptohopper trading platform experience.

## 📋 Script List

| Script | Version | Description | Page |
|--------|---------|-------------|------|
| [Absolute Values](Cryptohopper Absolute Values.user.js) | 1.2 | Adds absolute profit/loss values to open positions | Dashboard |
| [Panic Button Remover](panic-button-remover.user.js) | 1.1 | Hides the panic button from dashboard | Dashboard |
| [Position Targets](position-targets.user.js) | 1.1 | Adds visual indicators for buy/sell targets | Dashboard |
| [Target Restore](target-restore.user.js) | 1.1 | Shows active and inactive trading targets | Dashboard |
| [Latest Sells Absolute Values](latest-sells-absolute.user.js) | 1.1 | Adds absolute profit/loss to latest sells widget | Dashboard |
| [Trade History Absolute Values](trade-history-absolute.user.js) | 1.1 | Adds absolute profit/loss to trade history | Trade History |
| [TradingView Chart Mods](chart-mods.user.js) | 1.0 | Adds buy indicators and position lines to charts | Charts |
| [Chat Assistant Removal](chat-assistant-removal.user.js) | 1.0 | Removes Hoppie mascot and Intercom widget | All Pages |
| [Export Saved Trade History](export-saved-trade-history.user.js) | 1.0 | One-click export with saved settings | Trade History |
| [Stats Detail](stats-detail.user.js) | 1-0 | Enhanced profit breakdown and base currency info | Dashboard |
| [AI Bulk Training](ai-bulk-training.user.js) | 1.0 | Bulk train AI strategies with multiple pairs | AI Strategies |
| [Coin List Exporter](coin-list-exporter.user.js) | 1.0 | Export coin list to clipboard | Config |

## 🚀 Installation

### Prerequisites
- Install a userscript manager:
  - **Chrome/Edge**: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
  - **Firefox**: [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
  - **Safari**: [Tampermonkey](https://apps.apple.com/app/tampermonkey/id1482490089)
  - **Opera**: [Tampermonkey](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)

### Installing Scripts
1. Click on the script file you want to install
2. Click the "Raw" button on GitHub
3. Your userscript manager will prompt you to install
4. Click "Install" to confirm

### Automatic Updates
All scripts include `@updateURL` tags for automatic updates via your userscript manager.

## 📖 Script Details

### Dashboard Scripts

#### Absolute Values
Displays absolute profit/loss amounts next to percentage values in open positions table. Works with all base currencies (USDC, USDT, EUR, etc.) and handles different pair formats (BTC/USDC, BTCUSDC).

#### Panic Button Remover
Removes the panic button widget to prevent emotional trading decisions.

#### Position Targets
Adds colored icons after coin names:
- 🟢 Green: Buy target active
- 🔴 Red: Sell target active

#### Target Restore
Restores the old target display functionality, showing both active (green) and inactive (yellow) targets.

#### Latest Sells Absolute Values
Adds absolute profit/loss calculations to the "Latest 5 Sells" widget using the formula:
```
Absolute Profit = Total × (Percentage ÷ (100 + Percentage))
```

#### Stats Detail
Enhanced stats box showing:
- Gross profit breakdown
- Net profit calculation  
- Base currency available with 4-decimal precision percentage

### Trade History Scripts

#### Trade History Absolute Values
Adds absolute profit/loss values to all sell transactions in the trade history table.

#### Export Saved Trade History
Adds three buttons to export dialog:
- **Save Settings**: Save export configuration
- **Load Settings**: Load saved configuration
- **Export Saved**: One-click export with saved settings

### Chart & AI Scripts

#### TradingView Chart Mods
Enhances TradingView charts with:
- Buy indicator at entry point
- Average cost position line
- Take profit and stop loss levels

#### AI Bulk Training
Adds "Bulk Learn" button to train multiple coin pairs simultaneously. Prevents duplicate training and respects queue limits.

### Utility Scripts

#### Chat Assistant Removal
Removes visual clutter:
- Hoppie mascot animations
- Intercom chat widget

#### Coin List Exporter
Adds "Copy coinlist" option to config dropdown menu. Exports coins in `COIN/BASE` format (e.g., `BTC/USDC, ETH/USDC`).

## 🔧 Compatibility

- **Platform**: Cryptohopper.com
- **Browsers**: Chrome, Firefox, Edge, Safari, Opera
- **Userscript Managers**: Tampermonkey, Greasemonkey, Violentmonkey
- **Last Tested**: October 2025

## 🤝 Contributing

Contributions are welcome! Please:
1. Test your changes thoroughly
2. Follow the existing code style
3. Update version numbers appropriately
4. Document any new features in this README

## 📝 Credits

Original authors and contributors:
- @eatsleepcoderepeat-gl
- @markrickert
- @henrygarle
- @falcontx
- coffeeneer

Maintained and enhanced by @ilcesko

## ⚠️ Disclaimer

These scripts are provided as-is. Use at your own risk. Always verify calculations and double-check before executing trades. The authors are not responsible for any trading losses.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details
