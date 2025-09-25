# Warp Terminal Launcher

Launch Warp terminal directly from VS Code in the current workspace folder.

## Features

- Cross-platform: Windows, macOS, Linux
- Automatically opens Warp in the current workspace folder
- Configurable Warp executable path in VS Code settings
- Command palette integration: "Launch Warp Terminal"

## Configuration

- `warpTerminalLauncher.path`: Full path to Warp executable. Leave empty to use default per OS.
- `warpTerminalLauncher.openInWorkspace`: Boolean. Open Warp in the current workspace folder.

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type `Launch Warp Terminal`
3. Warp will open in the current workspace folder
