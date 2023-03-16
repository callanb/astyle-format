const vscode = require('vscode');
const child = require('child_process');

const COMMAND_FORMAT = "astyle-format.format"; // keep same as in package.json

function activate(context) {
    
    const disposable = vscode.commands.registerCommand(COMMAND_FORMAT, function() {
        const config = vscode.workspace.getConfiguration('astyle-format'),
            file = vscode.window.activeTextEditor.document,
            path = file.fileName;

        file.save().then(() => {
            if (config.path) {
                let command = config.path + ' ';
                if (config.args) command += config.args;
                command += ' \"' + path + '\"';
                child.exec(command, (error, out, errstr) => {
                    if (error) {
                        vscode.window.showErrorMessage('astyle-format error: ' + errstr);
                    }
                });
            } else {
                vscode.window.showErrorMessage('astyle-format error: No path specified.')
            }
        });
    });

    vscode.languages.getLanguages().then(list => {
        for(const language of list){
            const disposable = vscode.languages.registerDocumentFormattingEditProvider(language, {
                provideDocumentFormattingEdits(document){
                    vscode.commands.executeCommand(COMMAND_FORMAT);
                    return [];
                }
            });
            context.subscriptions.push(disposable);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
