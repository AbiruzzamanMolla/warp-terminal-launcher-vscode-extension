import * as vscode from "vscode";
import { spawn } from "child_process";
import * as os from "os";

function getDefaultWarpPath(): string {
    switch (process.platform) {
        case "win32":
            return "C:\\Program Files\\Warp\\Warp.exe";
        case "darwin":
            return "/Applications/Warp.app/Contents/MacOS/Warp";
        case "linux":
            return "/usr/bin/warp";
        default:
            return "";
    }
}

export function activate(context: vscode.ExtensionContext) {
    // Command to register/update Warp terminal profile
    const setProfileDisposable = vscode.commands.registerCommand(
        "warp-terminal-launcher.setProfile",
        async () => {
            try {
                const config = vscode.workspace.getConfiguration("warpTerminalLauncher");
                const warpPath = config.get<string>("path") || getDefaultWarpPath();
                const setAsDefault = config.get<boolean>("setAsDefault") ?? true;

                // Determine profile config key by OS
                const platformKey = process.platform === "win32"
                    ? "windows"
                    : process.platform === "darwin"
                    ? "osx"
                    : "linux";

                const terminalProfilesKey = `terminal.integrated.profiles.${platformKey}`;
                const defaultProfileKey = `terminal.integrated.defaultProfile.${platformKey}`;

                const currentProfiles = (vscode.workspace.getConfiguration().get(terminalProfilesKey) as any) || {};

                // Add/Update Warp profile
                currentProfiles["warp"] = { path: warpPath, args: [] };

                await vscode.workspace.getConfiguration().update(
                    terminalProfilesKey,
                    currentProfiles,
                    vscode.ConfigurationTarget.Global
                );

                // Optionally set as default
                if (setAsDefault) {
                    await vscode.workspace.getConfiguration().update(
                        defaultProfileKey,
                        "warp",
                        vscode.ConfigurationTarget.Global
                    );
                }

                vscode.window.showInformationMessage("Warp terminal profile registered successfully!");
            } catch (error) {
                vscode.window.showErrorMessage("Failed to register Warp terminal profile: " + error);
            }
        }
    );

    context.subscriptions.push(setProfileDisposable);

    // Command to launch Warp
    const launchDisposable = vscode.commands.registerCommand("warp-terminal-launcher.launch", () => {
        const warpPath = vscode.workspace.getConfiguration("warpTerminalLauncher").get<string>("path") || getDefaultWarpPath();
        const folder = vscode.workspace.workspaceFolders?.[0].uri.fsPath || os.homedir();

        const warpProcess = spawn(warpPath, [], { cwd: folder, detached: true, stdio: "ignore" });
        warpProcess.unref();
    });

    context.subscriptions.push(launchDisposable);

    // Status bar icon
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.text = "$(terminal) Warp";
    statusBarItem.command = "warp-terminal-launcher.launch";
    statusBarItem.tooltip = "Open Warp Terminal";
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Optionally run setProfile automatically on activation
    vscode.commands.executeCommand("warp-terminal-launcher.setProfile");
}

export function deactivate() {}
