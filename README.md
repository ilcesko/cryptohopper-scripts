# Cryptohopper Scripts

A collection of userscripts to enhance the Cryptohopper trading platform experience.

## 📋 Script List

| Script | Version | Description | Page |
|--------|---------|-------------|------|
| [Absolute Values](01.%20Absolute%20Values.user.js) | 1.2 | Adds absolute profit/loss values to open positions | Dashboard |
| [Latest Sells Absolute Values](02.%20Latest%20Sells%20Absolute%20Values.user.js) | 1.1 | Adds absolute profit/loss to latest sells widget | Dashboard |
| [Trade History Absolute Values](03.%20Trade%20History%20Absolute%20Values.user.js) | 1.1 | Adds absolute profit/loss to trade history | Trade History |
| [Stats Detail](04.%20Stats%20Detail.user.js) | 1.0 | Enhanced profit breakdown and base currency info | Dashboard |
| [Position Targets](05.%20Position%20Targets.user.js) | 1.1 | Adds visual indicators for buy/sell targets | Dashboard |
| [Panic Button Remover](06.%20Panic%20Button%20Remover.user.js) | 1.1 | Hides the panic button from dashboard | Dashboard |
| [Target Restore](07.%20Target%20Restore.user.js) | 1.1 | Shows active and inactive trading targets | Dashboard |
| [TradingView Chart Mods](08.%20TradingView%20Chart%20Mods.user.js) | 1.0 | Adds buy indicators and position lines to charts | Charts |
| [Chat Assistant Removal](09.%20Chat%20Assistant%20Removal.user.js) | 0.5 | Removes Hoppie mascot and Intercom widget | All Pages |
| [Export Saved Trade History](10.%20Export%20Saved%20Trade%20History.user.js) | 1.0 | One-click export with saved settings | Trade History |
| [AI Bulk Training](11.%20AI%20Bulk%20Training.user.js) | 1.0 | Bulk train AI strategies with multiple pairs | AI Strategies |
| [Coin List Exporter](12.%20Coin%20List%20Exporter.user.js) | 1.0 | Export coin list to clipboard | Config |

## 🚀 Installation

### Prerequisites
- Install a userscript manager:
  - **Chrome/Edge**: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
  - **Firefox**: [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
  - **Safari**: [Tampermonkey](https://apps.apple.com/app/tampermonkey/id1482490089)
  - **Opera**: [Tampermonkey](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)

### Installing Scripts
1. Click on the script file you want to install from the table above
2. Click the "Raw" button on GitHub
3. Your userscript manager will prompt you to install
4. Click "Install" to confirm

### Automatic Updates
Scripts with `@updateURL` tags support automatic updates via your userscript manager.

## 📖 Script Details

### Dashboard Scripts

#### 01. Absolute Values
Displays absolute profit/loss amounts next to percentage values in open positions table. Works with all base currencies (USDC, USDT, EUR, etc.) and handles different pair formats (BTC/USDC, BTCUSDC).
![Absolute Values feature](images/01-01.png)

#### 02. Latest Sells Absolute Values
Adds absolute profit/loss calculations to the "Latest 5 Sells" widget using the formula: Absolute Profit = Total × (Percentage ÷ (100 + Percentage))

#### 03. Trade History Absolute Values
Adds absolute profit/loss values to all sell transactions in the trade history table.

#### 04. Stats Detail
Enhanced stats box showing:
- Gross profit breakdown
- Net profit calculation  
- Base currency available with 4-decimal precision percentage

#### 05. Position Targets
Adds colored icons after coin names:
- 🟢 Green: Buy target active
- 🔴 Red: Sell target active

#### 06. Panic Button Remover
Removes the panic button widget to prevent emotional trading decisions.

#### 07. Target Restore
Restores the old target display functionality, showing both active (green) and inactive (yellow) targets.

#### 08. Export Saved Trade History
Adds three buttons to export dialog:
- **Save Settings**: Save export configuration
- **Load Settings**: Load saved configuration
- **Export Saved**: One-click export with saved settings

#### 09. Chat Assistant Removal
Removes visual clutter:
- Hoppie mascot animations
- Intercom chat widget

#### 10. TradingView Chart Mods
Enhances TradingView charts with:
- Buy indicator at entry point
- Average cost position line
- Take profit and stop loss levels

#### 11. AI Bulk Training
Adds "Bulk Learn" button to train multiple coin pairs simultaneously. Prevents duplicate training and respects queue limits.

#### 12. Coin List Exporter
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

MIT License - see [LICENSE](license_mit.txt) file for details
