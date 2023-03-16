# astyle-format

This extension facilitates the use of Artistic Style (Astyle) within VSC to format code.

https://marketplace.visualstudio.com/items?itemName=callanb.astyle-format.

## Astyle

Astyle can be found at http://astyle.sourceforge.net/.

## Use

There three ways to use this extension:
1. Run the command 'Astyle Format Document' from the Command Palette (F1)
2. Use the default provided keybinding  __CTRL+ALT+L__, which is shortcut for 'Astyle Format Document' command
3. Use builtin format function command __ALT+SHIFT+F__ and/or select 'Astyle' from the list of formatters. 

## Configuration

This extension contributes the following settings:

* `astyle-format.path`: path to astyle executable. \
**(OPTIONAL)**. __If not set, the extension will attempt to find astyle in the system PATH.__
* `astyle-format.args`: arguments passed to astyle

## Note

This extension is a minimal implementation that places the majority of configuration on the user. The two following existing repositories may or may not be more suitable depending on intended application:
https://github.com/astyle-format/vscode-format
https://github.com/welkineins/vscode-astyle
