const vscode = require('vscode');

const tailwindOrder = [
	'static', 'fixed', 'absolute', 'relative', 'sticky',
	'flex', 'inline-flex', 'block', 'inline-block', 'grid', 'inline-grid',
	'float-left', 'float-right', 'clear-both',
	'mt', 'mb', 'ml', 'mr', 'pt', 'pb', 'pl', 'pr', 'p', 'm',
	'w', 'h', 'min-w', 'max-w', 'min-h', 'max-h',
	'bg', 'text', 'border', 'rounded',
	'shadow', 'ring', 'opacity',
	'z', 'gap', 'space', 'justify', 'items', 'content', 'self',
	'overflow', 'transition', 'duration', 'ease',
	'hover', 'focus', 'active', 'disabled',
];


function activate(context) {
	let disposable = vscode.commands.registerCommand('tworder.orderTailwindClasses', async function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No editor is active.');
			return;
		}
	
		const selection = editor.selection;
		const text = editor.document.getText(selection);
	
		if (!text) {
			vscode.window.showErrorMessage('No text selected.');
			return;
		}
	
		// Ordenar clases
		const orderedText = text
			.split(/\s+/)
			.sort((a, b) => {
				const aIndex = tailwindOrder.findIndex(prefix => a.startsWith(prefix));
				const bIndex = tailwindOrder.findIndex(prefix => b.startsWith(prefix));
				return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
			})
			.join(' ');
	
		// Reemplazar selección
		editor.edit(editBuilder => {
			editBuilder.replace(selection, orderedText);
		});
	
		vscode.window.showInformationMessage('Clases Tailwind ordenadas ✅');
	});
	

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
