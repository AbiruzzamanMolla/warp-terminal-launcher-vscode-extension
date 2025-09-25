import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as os from 'os';

function getDefaultWarpPath(): string {
    switch (process.platform) {
        case 'win32': return "C:\\Program Files\\Warp\\Warp.exe";
        case 'darwin': return "/Applications/Warp.app/Contents/MacOS/Warp";
        case 'linux': return "/usr/bin/warp";
        default: return "";
    }
}

export function activate(context: vscode.ExtensionContext) {

    // Launch Warp command
    const launchDisposable = vscode.commands.registerCommand('warp-terminal-launcher.launch', () => {
        let warpPath = vscode.workspace.getConfiguration('warpTerminalLauncher').get<string>('path') || getDefaultWarpPath();
        if (!warpPath) {
            vscode.window.showErrorMessage('Warp path not found. Set warpTerminalLauncher.path in settings.');
            return;
        }

        const folder = vscode.workspace.workspaceFolders?.[0].uri.fsPath || os.homedir();

        const warpProcess = spawn(warpPath, [], { cwd: folder, detached: true, stdio: 'ignore' });
        warpProcess.unref();
    });

    context.subscriptions.push(launchDisposable);

    // Status bar icon
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.text = '$(terminal) Warp';
    statusBarItem.command = 'warp-terminal-launcher.launch';
    statusBarItem.tooltip = 'Open Warp Terminal';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Command to set Warp as default terminal
    const setDefaultDisposable = vscode.commands.registerCommand('warp-terminal-launcher.setDefault', async () => {
        try {
            await vscode.workspace.getConfiguration('terminal.integrated').update(
                `defaultProfile.${process.platform}`,
                'warp',  // matches terminal id in package.json
                vscode.ConfigurationTarget.Global
            );
            vscode.window.showInformationMessage('Warp terminal set as default!');
        } catch (err) {
            vscode.window.showErrorMessage('Failed to set Warp as default terminal: ' + err);
        }
    });

    context.subscriptions.push(setDefaultDisposable);
}

export function deactivate() {}
