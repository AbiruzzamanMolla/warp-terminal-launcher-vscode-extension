import * as vscode from "vscode";
import { spawn } from "child_process";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";

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

function getWarpUri(action: "new_window" | "new_tab", cwd: string): string {
    const config = vscode.workspace.getConfiguration("warpTerminalLauncher");
    const warpVersion = config.get<string>("warpVersion", "stable");
    const scheme = warpVersion === "preview" ? "warppreview://" : "warp://";
    return `${scheme}action/${action}?path=${encodeURIComponent(cwd)}`;
}

function resolveFolderFromUri(uri?: vscode.Uri): string {
    if (uri && uri.scheme === "file") {
        if (fs.statSync(uri.fsPath).isDirectory()) {
            return uri.fsPath;
        }
        return path.dirname(uri.fsPath);
    }
    return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || os.homedir();
}

export function activate(context: vscode.ExtensionContext) {
    // Register Warp terminal profile
    const setProfileDisposable = vscode.commands.registerCommand(
        "warp-terminal-launcher.setProfile",
        async () => {
            try {
                const config = vscode.workspace.getConfiguration("warpTerminalLauncher");
                const warpPath = config.get<string>("path") || getDefaultWarpPath();
                const setAsDefault = config.get<boolean>("setAsDefault") ?? true;

                const platformKey =
                    process.platform === "win32" ? "windows" :
                    process.platform === "darwin" ? "osx" : "linux";

                const terminalProfilesKey = `terminal.integrated.profiles.${platformKey}`;
                const defaultProfileKey = `terminal.integrated.defaultProfile.${platformKey}`;

                const currentProfiles =
                    (vscode.workspace.getConfiguration().get(terminalProfilesKey) as any) || {};

                currentProfiles["warp"] = { path: warpPath, args: [] };

                await vscode.workspace.getConfiguration().update(
                    terminalProfilesKey,
                    currentProfiles,
                    vscode.ConfigurationTarget.Global
                );

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

    // Spawn-based launcher
    const launchDisposable = vscode.commands.registerCommand(
        "warp-terminal-launcher.launch",
        (uri?: vscode.Uri) => {
            const warpPath =
                vscode.workspace.getConfiguration("warpTerminalLauncher").get<string>("path") ||
                getDefaultWarpPath();

            const folder = resolveFolderFromUri(uri);

            const warpProcess = spawn(warpPath, [], {
                cwd: folder,
                detached: true,
                stdio: "ignore",
            });
            warpProcess.unref();
        }
    );
    context.subscriptions.push(launchDisposable);

    // URI-based launcher: New Window
    const newWindowDisposable = vscode.commands.registerCommand(
        "warp-terminal-launcher.openInNewWindow",
        async (uri?: vscode.Uri) => {
            const folder = resolveFolderFromUri(uri);
            const warpUri = getWarpUri("new_window", folder);
            const success = await vscode.env.openExternal(vscode.Uri.parse(warpUri));
            if (!success) {
                vscode.window.showErrorMessage("Failed to open Warp in new window. Make sure Warp supports URI schemes.");
            }
        }
    );
    context.subscriptions.push(newWindowDisposable);

    // URI-based launcher: New Tab
    const newTabDisposable = vscode.commands.registerCommand(
        "warp-terminal-launcher.openInNewTab",
        async (uri?: vscode.Uri) => {
            const folder = resolveFolderFromUri(uri);
            const warpUri = getWarpUri("new_tab", folder);
            const success = await vscode.env.openExternal(vscode.Uri.parse(warpUri));
            if (!success) {
                vscode.window.showErrorMessage("Failed to open Warp in new tab. Make sure Warp supports URI schemes.");
            }
        }
    );
    context.subscriptions.push(newTabDisposable);

    // Status bar icon
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.text = "$(terminal) Warp";
    statusBarItem.command = "warp-terminal-launcher.launch";
    statusBarItem.tooltip = "Open Warp Terminal";
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Auto-register profile on activation
    vscode.commands.executeCommand("warp-terminal-launcher.setProfile");
}

export function deactivate() {}
