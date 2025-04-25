const vscode = require('vscode');

const defaultTailwindOrder = [
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
        let text = editor.document.getText(selection);

        if (text.trim()) {
            // Hay selección: ordenar solo la selección
            const orderedText = orderTailwindClasses(text);
            editor.edit(editBuilder => {
                editBuilder.replace(selection, orderedText);
            });
        } else {
            // No hay selección: buscar todas las clases en el documento
            const fullText = editor.document.getText();
            const classRegex = /(class|className)\s*=\s*"([^"]*)"/g;
            let match;
            const edits = [];

            while ((match = classRegex.exec(fullText)) !== null) {
                const fullMatch = match[0]; // class="..."
                const attrName = match[1];   // class o className
                const classContent = match[2]; // contenido de las clases
                const orderedClasses = orderTailwindClasses(classContent);

                const startPos = editor.document.positionAt(match.index);
                const endPos = editor.document.positionAt(match.index + fullMatch.length);

                edits.push({ range: new vscode.Range(startPos, endPos), newText: `${attrName}="${orderedClasses}"` });
            }

            await editor.edit(editBuilder => {
                edits.forEach(edit => {
                    editBuilder.replace(edit.range, edit.newText);
                });
            });
        }

        vscode.window.showInformationMessage('Clases Tailwind ordenadas ✅');
    });

    context.subscriptions.push(disposable);
}

function orderTailwindClasses(text) {
    const customOrder = vscode.workspace.getConfiguration('tworder').get('customOrder') || defaultTailwindOrder;

    return text
        .split(/\s+/)
        .sort((a, b) => {
            const aIndex = customOrder.findIndex(prefix => a.startsWith(prefix));
            const bIndex = customOrder.findIndex(prefix => b.startsWith(prefix));
            return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
        })
        .join(' ');
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};