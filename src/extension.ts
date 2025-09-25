import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as os from 'os';

function getDefaultWarpPath(): string {
    switch (process.platform) {
        case 'win32':
            return "C:\\Program Files\\Warp\\Warp.exe";
        case 'darwin':
            return "/Applications/Warp.app/Contents/MacOS/Warp";
        case 'linux':
            return "/usr/bin/warp";
        default:
            return "";
    }
}

export function activate(context: vscode.ExtensionContext) {  // <-- type added here
    let disposable = vscode.commands.registerCommand('warp-terminal-launcher.launch', () => {
        let warpPath = vscode.workspace.getConfiguration('warpTerminalLauncher').get<string>('path');

        if (!warpPath) {
            warpPath = getDefaultWarpPath();
        }

        if (!warpPath) {
            vscode.window.showErrorMessage('Warp path not found. Set warpTerminalLauncher.path in settings.');
            return;
        }

        const folder = (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath) || os.homedir();

        const warpProcess = spawn(warpPath, [], {
            cwd: folder,
            detached: true,
            stdio: 'ignore'
        });

        warpProcess.unref();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
