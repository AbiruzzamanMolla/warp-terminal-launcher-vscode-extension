# Changelog

## [0.0.3] - 2025-10-02
### Added
- New commands: “Open Warp Terminal in New Tab” and “Open Warp Terminal in New Window”.
- Context menu integration in Explorer and Editor for the new commands.
- URI mode support for Warp: opens Warp using `warp://` or `warppreview://` schemes.
- Config option `warpTerminalLauncher.warpVersion` to select Warp stable or preview version.
- Commands respect the current selection:
  - Folder → opens Warp in that folder.
  - File → opens Warp in parent folder.
  - No selection → opens Warp in workspace root or home directory.

### Improved
- Combined spawn-based and URI-based launchers in a single extension.
- More flexible workflow for users: integrated VS Code terminal support and external Warp URI mode.

---

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
