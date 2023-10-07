const fontSelect = document.getElementById("font-family");

const fontOptions = [
  "Arial, sans-serif",
  "Helvetica, sans-serif",
  "Verdana, sans-serif",
  "Georgia, serif",
  "Times New Roman, serif",
  "Courier New, monospace",
  "Impact, fantasy",
];

fontOptions.forEach((optionValue) => {
  const option = document.createElement("option");
  option.value = optionValue;
  option.textContent = optionValue;
  fontSelect.appendChild(option);
});

fontSelect.addEventListener("change", function () {
  const selectedOption = this.options[this.selectedIndex];
  const font = selectedOption.value;
  const text = selectedOption.textContent;

  selectedOption.style.fontFamily = font;
  selectedOption.textContent = text;

  const selectedCell = document.querySelector(".selected-cell");
  if (selectedCell) {
    selectedCell.style.fontFamily = font;
  }
});

fontSelect.options[fontSelect.selectedIndex].style.fontFamily =
  fontSelect.options[fontSelect.selectedIndex].value;

//   Table printing--------------------

function generateAlphabetColumns() {
  const tableHeaderRow = document.querySelector("#header-row");
  for (let i = 0; i < 27; i++) {
    if (i == 0) {
      const th = document.createElement("th");
      th.textContent = "";
      tableHeaderRow.appendChild(th);
    } else {
      const letter = String.fromCharCode(96 + i);
      const th = document.createElement("th");
      th.textContent = letter.toUpperCase();
      th.classList.add("column-header");
      tableHeaderRow.appendChild(th);
    }
  }
}


const ROWS = 100;
const COLS = 27;
const cellData = [];

function generateRows() {
  const tableBody = document.querySelector("tbody");
  for (let row = 1; row <= ROWS; row++) {
    const newRow = document.createElement("tr");
    const rowData = [];
    for (let col = 0; col < COLS; col++) {
      const newCell = document.createElement("td");
      if (col === 0) {
        newCell.textContent = row;
      } else {
        newCell.contentEditable = "true";
        newCell.addEventListener("input", function () {
          rowData[col] = newCell.textContent;
          document.getElementById("cell-input").value = newCell.textContent;
        });
      }
      newRow.appendChild(newCell);
      rowData.push(newCell.textContent || "");
    }
    tableBody.appendChild(newRow);
    cellData.push(rowData);
  }
}

generateRows();
generateAlphabetColumns();


// Function to update font color
// Font Color Picker
document.getElementById("font-color-picker").addEventListener("click", function () {
  const selectedCell = document.querySelector(".selected-cell");
  if (selectedCell) {
      // Initialize the Spectrum Colorpicker for font color
      $(selectedCell).spectrum({
          type: "color",
          showInput: true,
          change: function (color) {
              selectedCell.style.color = color.toHexString();
          },
      });
  }
});

// Background Color Picker
document.getElementById("background-color-picker").addEventListener("click", function () {
  const selectedCell = document.querySelector(".selected-cell");
  if (selectedCell) {
      // Initialize the Spectrum Colorpicker for background color
      $(selectedCell).spectrum({
          type: "color",
          showInput: true,
          change: function (color) {
              selectedCell.style.backgroundColor = color.toHexString();
          },
      });
  }
});




// Text updating in the input bar and text align------------------------------------------------
document.querySelector("table").addEventListener("click", function (event) {
  const clickedElement = event.target;

  if (clickedElement.tagName === "TD") {
    const columnIndex = clickedElement.cellIndex;
    const rowIndex = clickedElement.parentElement.rowIndex;
    const columnLetter = String.fromCharCode(64 + columnIndex);
    const cellNumber = columnLetter + rowIndex;

    document.getElementById("cell-input").value = clickedElement.textContent;
    document.getElementById("cell-number").value = cellNumber;

    const selectedCells = document.querySelectorAll(".selected-cell");
    selectedCells.forEach((cell) => {
      cell.classList.remove("selected-cell");
    });

    clickedElement.classList.add("selected-cell");
  }
});

// align-right,left,center-----------------------------------

document.querySelectorAll(".fas.fa-align-left").forEach((icon) => {
  icon.addEventListener("click", function (event) {
    const selectedCell = document.querySelector(".selected-cell");
    if (selectedCell) {
      selectedCell.style.textAlign = "left";
    }
  });
});

document.querySelectorAll(".fas.fa-align-center").forEach((icon) => {
  icon.addEventListener("click", function (event) {
    const selectedCell = document.querySelector(".selected-cell");
    if (selectedCell) {
      selectedCell.style.textAlign = "center";
    }
  });
});

document.querySelectorAll(".fas.fa-align-right").forEach((icon) => {
  icon.addEventListener("click", function (event) {
    const selectedCell = document.querySelector(".selected-cell");
    if (selectedCell) {
      selectedCell.style.textAlign = "right";
    }
  });
});

// Bold,Italic, Underline-----------------------------

// Font style icons
const boldIcon = document.getElementById("bold-icon");
const italicIcon = document.getElementById("italic-icon");
const underlineIcon = document.getElementById("underline-icon");

// Event listeners for font style icons
boldIcon.addEventListener("click", function () {
  const selectedCell = document.querySelector(".selected-cell");
  if (selectedCell) {
    if (selectedCell.style.fontWeight === "bold") {
      selectedCell.style.fontWeight = "normal";
    } else {
      selectedCell.style.fontWeight = "bold";
    }
  }
});

italicIcon.addEventListener("click", function () {
  const selectedCell = document.querySelector(".selected-cell");
  if (selectedCell) {
    if (selectedCell.style.fontStyle === "italic") {
      selectedCell.style.fontStyle = "normal";
    } else {
      selectedCell.style.fontStyle = "italic";
    }
  }
});

underlineIcon.addEventListener("click", function () {
  const selectedCell = document.querySelector(".selected-cell");
  if (selectedCell) {
    if (selectedCell.style.textDecoration === "underline") {
      selectedCell.style.textDecoration = "none";
    } else {
      selectedCell.style.textDecoration = "underline";
    }
  }
});

// Font-size---------------
const fontSizeSelector = document.getElementById("fontSizeSelector");

fontSizeSelector.addEventListener("change", function () {
  const selectedCell = document.querySelector(".selected-cell");
  if (selectedCell) {
    selectedCell.style.fontSize = fontSizeSelector.value;
  }
});

// Function to copy selected cell data to clipboard
function copyCellData() {
  const selectedCell = document.querySelector(".selected-cell");
  if (selectedCell) {
    const cellValue = selectedCell.textContent;
    navigator.clipboard.writeText(cellValue).then(() => {
      console.log("Cell data copied to clipboard:", cellValue);
    });
  }
}

document.getElementById("copy-icon").addEventListener("click", copyCellData);

// Function to cut selected cell data to clipboard
function cutCellData() {
  const selectedCell = document.querySelector(".selected-cell");
  if (selectedCell) {
    const cellValue = selectedCell.textContent;
    navigator.clipboard.writeText(cellValue).then(() => {
      selectedCell.textContent = "";
      console.log("Cell data cut and copied to clipboard:", cellValue);
    });
  }
}

document.getElementById("cut-icon").addEventListener("click", cutCellData);

// Function to paste clipboard data into the selected cell
function pasteCellData() {
  const selectedCell = document.querySelector(".selected-cell");
  if (selectedCell) {
    navigator.clipboard.readText().then((clipText) => {
      selectedCell.textContent = clipText;
      console.log("Clipboard data pasted into the selected cell:", clipText);
    });
  }
}

document.getElementById("paste-icon").addEventListener("click", pasteCellData);

// ----------------------------------------------------------------------------------------

function tableToCSV() {
  const csvData = [];

  for (let i = 0; i < ROWS; i++) {
    const rowData = [];
    for (let j = 1; j < COLS; j++) {
      rowData.push(`"${cellData[i][j]}"`);
    }
    csvData.push(rowData.join(","));
  }

  return csvData.join("\n");
}

function downloadCSV() {
  const csvContent = tableToCSV();
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "table_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

document
  .querySelector("ion-icon[name='cloud-download']")
  .addEventListener("click", downloadCSV);

// Function to handle the uploaded CSV file-----------------------
function handleUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const csvData = e.target.result;
    populateTableFromCSV(csvData);
  };

  reader.readAsText(file);
}

document
  .getElementById("upload-input")
  .addEventListener("change", handleUpload);

function openFileUpload() {
  document.getElementById("upload-input").click();
}

document
  .getElementById("upload-icon")
  .addEventListener("click", openFileUpload);



// Adding sheets-----------------------------------------------------------------

const sheetsSection = document.querySelector(".sheets");
let sheetKeys = [];

function renderSheet(sheetData) {
  const newSheetDiv = document.createElement("div");
  newSheetDiv.classList.add("sheet-added");
  newSheetDiv.dataset.id = sheetData.id;

  const sheetTitle = document.createElement("h5");
  sheetTitle.textContent = sheetData.title;

  const closeIcon = document.createElement("ion-icon");
  closeIcon.setAttribute("name", "close-outline");
  closeIcon.classList.add("close-button");

  newSheetDiv.appendChild(sheetTitle);
  newSheetDiv.appendChild(closeIcon);

  sheetsSection.appendChild(newSheetDiv);

  closeIcon.addEventListener("click", function () {
    const sheetId = sheetData.id;
    const key = `sheet-${sheetId}`;

    localStorage.removeItem(key);

    const index = sheetKeys.indexOf(key);
    if (index !== -1) {
      sheetKeys.splice(index, 1);
    }

    newSheetDiv.remove();
  });
}

function displayDefaultSheet() {
  const sheetId = Date.now();

  const sheetData = {
    title: "Sheet-1",
    id: sheetId,
  };

  localStorage.setItem(`sheet-${sheetId}`, JSON.stringify(sheetData));
  sheetKeys.push(`sheet-${sheetId}`);
  renderSheet(sheetData);
}

document.getElementById("add-sheet").addEventListener("click", function () {
  const sheetId = Date.now();

  const sheetData = {
    title: "Sheet-" + (sheetKeys.length + 1),
    id: sheetId,
  };

  localStorage.setItem(`sheet-${sheetId}`, JSON.stringify(sheetData));
  sheetKeys.push(`sheet-${sheetId}`);
  sheetKeys.sort();

  renderSheet(sheetData);
});

window.addEventListener("load", function () {
  sheetKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("sheet-")) {
      const sheetData = JSON.parse(localStorage.getItem(key));
      if (sheetData) {
        sheetKeys.push(key);
      }
    }
  }

  sheetKeys.sort();

  if (sheetKeys.length === 0) {
    displayDefaultSheet();
  } else {
    sheetKeys.forEach(function (key) {
      const sheetData = JSON.parse(localStorage.getItem(key));
      if (sheetData) {
        renderSheet(sheetData);
      }
    });
  }
});
