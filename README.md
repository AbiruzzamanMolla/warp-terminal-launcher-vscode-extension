# Warp Terminal Launcher

Launch the **Warp terminal** directly from VS Code, with cross-platform support and integration into the terminal dropdown.

![Warp Terminal Launcher](https://via.placeholder.com/400x100.png?text=Warp+Terminal+Launcher)

---

## Features

- Launch Warp terminal from VS Code in the **current workspace folder**.
- **Cross-platform**: Works on Windows, macOS, and Linux.
- **Configurable Warp executable path** in VS Code settings.
- Adds Warp as a **terminal profile** in the dropdown list.
- **Status bar icon** for one-click Warp launch.
- **Command to set Warp as default terminal**.

---

## Installation

1. Install the `.vsix` package manually or search for **Warp Terminal Launcher** in the VS Code Marketplace.
2. Reload VS Code.

---

## Usage

- Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and search for:
  - `Launch Warp Terminal` → Opens Warp in the current workspace folder.
  - `Set Warp as Default Terminal` → Adds Warp to terminal dropdown and sets it as default.

- Click the **status bar icon** at the bottom left to launch Warp quickly.

---

## Configuration

Open **Settings → Extensions → Warp Terminal Launcher**:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `warpTerminalLauncher.path` | `string` | Auto-detected per OS | Full path to Warp executable. Leave empty to use default. |
| `warpTerminalLauncher.openInWorkspace` | `boolean` | `true` | Open Warp in the current VS Code workspace folder. |

**Default paths by OS:**

- **Windows:** `C:\Program Files\Warp\Warp.exe`
- **macOS:** `/Applications/Warp.app/Contents/MacOS/Warp`
- **Linux:** `/usr/bin/warp`

---

## Extension Commands

| Command | Description |
|---------|-------------|
| `Launch Warp Terminal` | Opens Warp in the current workspace folder. |
| `Set Warp as Default Terminal` | Adds Warp as terminal profile and sets it as default. |

---

## Contributing

Feel free to submit **issues** or **feature requests** on [GitHub](https://github.com/AbiruzzamanMolla/warp-terminal-launcher-vscode-extension/issues).

---

## License

MIT © [Azmolla](https://github.com/AbiruzzamanMolla)
