# Changelog

## [0.0.2] - 2025-10-02
### Added
- Ability to launch Warp terminal directly in the location of the selected file or folder.
- Context menu integration: right-click in Explorer or Editor to open Warp in that directory.
- Command adapts automatically:
  - If a folder is selected, Warp opens in that folder.
  - If a file is selected, Warp opens in its parent folder.
  - If no selection, falls back to workspace root or home directory.

### Improved
- More consistent path detection for different scenarios (Explorer, Editor, Command Palette).
- Clearer error handling when resolving paths.

---

## [0.0.1] - 2025-09-25
### Added
- Initial release of Warp Terminal Launcher.
- Launch Warp terminal from VS Code workspace.
- Cross-platform support (Windows, macOS, Linux).
- Configurable Warp path via settings.
- Status bar icon for one-click launch.
- Register Warp as terminal profile.
- Optional command to set Warp as default terminal.
