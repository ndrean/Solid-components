---
layout: post
title: JS snippet to Copy from CLipboard
---

```js
inputToCopy = document.getElementById("to-copy");

const clip = () => {
  copyButton = document.getElementById("copy-btn");

  /* version with Clipboard API */
  if (navigator.clipboard) {
    copyButton.addEventListener("click", () => {
      const val = document.getElementById("to-copy").value;
      navigator.clipboard.writeText(val).then(() => {
        navigator.clipboard.readText().then(text => {
          const target = document.getElementById("clipboard");
          target.textContent = text;
        });
        inputToCopy.value = "";
      });
    });
  } else {
    /* version avec document.execCommand  si clipboard API not supported*/
    copyButton.addEventListener("click", () => {
      inputToCopy.select();
      document.execCommand("copy");
      const target = document.getElementById("ajax-form");
      //target.document.execCommand('paste')
      navigator.clipboard.readText().then(text => {
        target.textContent = text;
        inputToCopy.value = ""; // reset the input
      });
    });
  }
};

if (inputToCopy) {
  clip();
}

```
