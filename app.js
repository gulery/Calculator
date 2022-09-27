const display = document.querySelector(".current-display");
const buttons = document.querySelector(".buttons-container");
const ustDisplay = document.querySelector(".previous-display");

displayValue = "0";
operator = "";
sayi1 = "";
operator1 = "";
ilkdeger = false;
deger = false;

buttons.addEventListener("click", function (e) {
  const element = e.target;
  if (!element.matches(".button")) return;
  // ulasdigimiz elementin button olup olmadigini kontrol ediyor. tikladigimiz yer buton degilse, dön dedik.

  if (
    element.classList.contains("num") &&
    !element.classList.contains("decimal")
  ) {
    if (operator != "" && !ilkdeger) {
      displayValue = "0";
      ilkdeger = true;
      operator1 = operator;
      operator = "";
    }

    if (displayValue === "0" || deger == true) {
      displayValue = element.innerText;
      deger = false;
    } else {
      displayValue = displayValue + element.innerText;
    }
  }

  if (element.classList.contains("ac")) {
    init();
  }

  if (element.classList.contains("pm")) {
    if (displayValue != "0") {
      displayValue =
        displayValue.slice(0, 1) === "-"
          ? displayValue.slice(1)
          : "-" + displayValue;
      // console.log(displayValue.slice(0, 1));
    }
  }

  if (element.classList.contains("decimal")) {
    if (displayValue.indexOf(".") == -1) {
      displayValue = displayValue + ".";
    }
  }

  if (element.classList.contains("percent")) {
    displayValue = sayiyaDonder(displayValue) / 100;
    displayValue = displayValue + "";
  }
  if (element.classList.contains("equal")) {
    displayValue = islem(
      parseFloat(sayi1),
      parseFloat(displayValue),
      operator1
    );

    operator = "";
    sayi1 = "";
    ilkdeger = false;
    operator1 = "";
    deger = true;
  }

  if (element.classList.contains("operator")) {
    if (operator1 != "") {
      displayValue = islem(
        parseFloat(sayi1),
        parseFloat(displayValue),
        operator1
      );
      operator1 = operator;
      ilkdeger = false;
    }

    sayi1 = displayValue;
    if (element.classList.contains("division")) {
      operator = "/";
    }
    if (element.classList.contains("multiplication")) {
      operator = "*";
    }
    if (element.classList.contains("subtraction")) {
      operator = "-";
    }
    if (element.classList.contains("addition")) {
      operator = "+";
    }
  }
  display.innerHTML = displayValue.slice(0, 10);
  let ekle = operator1 != "" ? operator1 : operator;
  ustDisplay.innerHTML = sayi1 + " " + ekle;
});

function islem(sayi1, sayi2, operator) {
  let sonuc = "";
  if (operator === "+") {
    sonuc = sayi1 + sayi2;
  } else if (operator === "-") {
    sonuc = sayi1 - sayi2;
  } else if (operator === "*") {
    sonuc = sayi1 * sayi2;
  } else {
    sonuc = sayi1 / sayi2;
  }
  return "" + sonuc;
}

function init() {
  displayValue = "0";
  operator = "";
  sayi1 = "";
  ilkdeger = false;
  operator1 = "";
}

function sayiyaDonder(str) {
  return parseFloat(str);
}
