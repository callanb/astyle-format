const vscode = require('vscode');
const child = require('child_process');

const COMMAND_FORMAT = "astyle-format.format"; // keep same as in package.json

function activate(context) {
    let aStyleExistInPath;

    try {
        aStyleExistInPath = child.execSync('astyle --version').toString().indexOf('Artistic Style') > -1;
    } catch (exception) {
        aStyleExistInPath = false;
    }

    const disposable = vscode.commands.registerCommand(COMMAND_FORMAT, function() {
        const config = vscode.workspace.getConfiguration('astyle-format'),
            file = vscode.window.activeTextEditor.document,
            path = file.fileName;
    
        const programPath = config.path || (aStyleExistInPath ? 'astyle' : null);
        if (!programPath) { 
            vscode.window.showErrorMessage('astyle-format error: Program not found. Please specify the path to astyle in the settings or add astyle to your PATH environment variable (Requires restart).');
            return;
        }

        file.save().then(() => {
            let command = programPath + ' ';
            if (config.args) command += config.args;
            command += ' \"' + path + '\"';
            child.exec(command, (error, out, errstr) => {
                if (error) {
                    vscode.window.showErrorMessage('astyle-format error: ' + errstr);
                }
            });
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
