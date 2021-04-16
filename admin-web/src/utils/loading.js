export function btnLoading(btnObj) {
  btnObj.loading = true;
  btnObj.type = "info";
  btnObj.disabled = true;
  btnObj.text = "";
}

export function btnLoadingClose(btnObj, text) {
  btnObj.loading = false;
  btnObj.type = "primary";
  btnObj.disabled = false;
  btnObj.text = text;
}

export function countdownButton(btnObj, second, endTxt) {
  btnObj.loading = false;
  btnObj.text = second + 's';
  let timer = setInterval(() => {
    second = second - 1;
    if (second < 0) {
      btnObj.text = endTxt;
      btnObj.disabled = false;
      btnObj.type = "primary";
      clearInterval(timer);
    } else btnObj.text = second + "s";
  }, 1000)
}