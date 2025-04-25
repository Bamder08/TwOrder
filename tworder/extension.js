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

		// Leer configuración personalizada del usuario
		const config = vscode.workspace.getConfiguration('tworder');
		const customOrder = config.get('classOrder');

		const order = Array.isArray(customOrder) && customOrder.length > 0 ? customOrder : tailwindOrder;

		let selection = editor.selection;
		let text = editor.document.getText(selection);

		// Si no hay selección, tomar todo el documento
		if (selection.isEmpty) {
			const firstLine = editor.document.lineAt(0);
			const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
			selection = new vscode.Selection(firstLine.range.start, lastLine.range.end);
			text = editor.document.getText(selection);
		}

		const classRegex = /(class|className)=["']([^"']*)["']/g;
		let match;
		let replacedText = text;

		while ((match = classRegex.exec(text)) !== null) {
			const fullMatch = match[0];
			const attrName = match[1];
			const classValue = match[2];

			const orderedClassValue = classValue
				.split(/\s+/)
				.sort((a, b) => {
					const aIndex = order.findIndex(prefix => a.startsWith(prefix));
					const bIndex = order.findIndex(prefix => b.startsWith(prefix));
					return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
				})
				.join(' ');

			const orderedFullMatch = `${attrName}="${orderedClassValue}"`;
			replacedText = replacedText.replace(fullMatch, orderedFullMatch);
		}

		if (replacedText === text) {
			vscode.window.showErrorMessage('No se encontraron atributos class o className para ordenar.');
			return;
		}

		await editor.edit(editBuilder => {
			editBuilder.replace(selection, replacedText);
		});

		// Formatear automáticamente el documento
		await vscode.commands.executeCommand('editor.action.formatDocument');

		vscode.window.showInformationMessage('Clases Tailwind ordenadas y documento formateado ✅');
	});

	context.subscriptions.push(disposable);
}



function deactivate() {}

module.exports = {
  activate,
  deactivate
};
