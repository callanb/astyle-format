const vscode = require('vscode');
const child = require('child_process');

function activate(context) 
{
	let disposable = vscode.commands.registerCommand('astyle-format.format', function() 
	{
		const config = vscode.workspace.getConfiguration('astyle-format'),
		    file = vscode.window.activeTextEditor.document,
			path = file.fileName;

		file.save().then(() => {
			if (config.path) 
			{
				let command = config.path + ' ';
				if (config.args) command += config.args;
				command += ' ' + path;
				child.exec(command, (error, out, errstr) => {
					if (error) {
						vscode.window.showErrorMessage('astyle-format error: ' + errstr);
					}
				});
			} 
			else 
			{
				vscode.window.showErrorMessage('astyle-format error: No path specified.')
			}
		});
	});
	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}