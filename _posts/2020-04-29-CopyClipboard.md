---
layout: post
title: JS snippet to Copy from CLipboard
---

```js
const copyButton = document.querySelector("#copyButton")

if (navigator.clipboard) {
    copyButton.addEventListener("click", async () => {

      const someText = document.getElementById("to-copy").value;

      await navigator.clipboard.writeText(someText);

      const target = document.getElementById("clipboard");

      target.textContent = await navigator.clipboard.readText();

      inputToCopy.value = "";
  })
 }
```

```js
document.execCommand("copy");
target.document.execCommand('paste')
```
