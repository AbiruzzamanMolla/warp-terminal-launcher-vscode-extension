# Warp Terminal Launcher

Launch the **Warp terminal** directly from VS Code with full **cross-platform support** and terminal integration.

![Warp Terminal Launcher](https://raw.githubusercontent.com/AbiruzzamanMolla/warp-terminal-launcher-vscode-extension/refs/heads/master/icon.webp)

---

## Features

- Launch Warp terminal in the **current workspace folder**, or in the folder of a selected file/folder.
- **Cross-platform**: Windows, macOS, and Linux.
- Configurable Warp executable path via VS Code settings.
- Automatically registers Warp as a **terminal profile** in VS Code.
- **Set Warp as default terminal** with a single command.
- **Status bar icon** for one-click Warp launch.
- **Right-click context menu** support in Explorer and Editor.
- **URI mode**: Open Warp in a **new tab** or **new window** using Warp's `warp://` or `warppreview://` schemes.

---

## Installation

Install directly from the VS Code Marketplace:

[**Warp Terminal Launcher on Marketplace**](https://marketplace.visualstudio.com/items?itemName=azmolla.warp-terminal-launcher)

Or, install the `.vsix` package manually and reload VS Code.

---

## Usage

- Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and search for:

  - `Launch Warp Terminal` → Opens Warp in the current folder or workspace.
  - `Open Warp Terminal in New Tab` → Opens Warp in a new tab using URI mode.
  - `Open Warp Terminal in New Window` → Opens Warp in a new window using URI mode.
  - `Register Warp Terminal Profile` → Registers Warp in terminal profiles.
  - `Set Warp as Default Terminal` → Adds Warp to terminal dropdown and sets it as default.

- Right-click a folder or file in Explorer or the editor to see:

  - `Launch Warp Terminal`
  - `Open Warp Terminal in New Tab`
  - `Open Warp Terminal in New Window`

- Click the **status bar icon** at the bottom left to launch Warp quickly.

---

## Configuration

Open **Settings → Extensions → Warp Terminal Launcher**:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `warpTerminalLauncher.path` | `string` | Auto-detected per OS | Full path to the Warp executable. Leave empty to use the default. |
| `warpTerminalLauncher.setAsDefault` | `boolean` | `true` | Automatically set Warp as the default terminal. |
| `warpTerminalLauncher.warpVersion` | `string` | `stable` | Warp version to use in URI mode (`stable = warp://`, `preview = warppreview://`). |

**Default Warp paths per OS:**

- **Windows:** `C:\Program Files\Warp\Warp.exe`
- **macOS:** `/Applications/Warp.app/Contents/MacOS/Warp`
- **Linux:** `/usr/bin/warp`

---

## Commands

| Command | Description |
|---------|-------------|
| `Launch Warp Terminal` | Opens Warp in the current folder or workspace. |
| `Open Warp Terminal in New Tab` | Opens Warp in a new tab using URI scheme. |
| `Open Warp Terminal in New Window` | Opens Warp in a new window using URI scheme. |
| `Register Warp Terminal Profile` | Registers Warp in terminal profiles. |
| `Set Warp as Default Terminal` | Sets Warp as the default integrated terminal. |

---

## Contributing

Submit issues or feature requests on [GitHub](https://github.com/AbiruzzamanMolla/warp-terminal-launcher-vscode-extension/issues).

---

## License

MIT © [Azmolla](https://github.com/AbiruzzamanMolla)

---

## Marketplace

You can install the extension directly from the VS Code Marketplace:

[**Warp Terminal Launcher**](https://marketplace.visualstudio.com/items?itemName=azmolla.warp-terminal-launcher)
