## Required

Prettier - Code formatter

```shell
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
```

Configure automatic code formatting

```shell
1 - Ctrl+Shift+P
2 - Language specific editor settings
3 - Javascript
4 - USER SETTINGS
{
  "editor.formatOnSave": true,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "window.zoomLevel": 1,
  "files.autoSave": "off",
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "[javascriptreact]": {
    "editor.formatOnSave": true
  }
}
```