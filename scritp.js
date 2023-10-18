const body = document.querySelector('body');

const showTitle = () => {
  const title = document.createElement('h1');
  title.id = 'title';
  title.innerText = 'Paleta de Cores';
  body.appendChild(title);
};

const background = () => {
  const scenery = 'background/background02.jpeg';
  const wallpaper = document.createElement('img');
  wallpaper.id = 'landscape';
  wallpaper.src = scenery;
  body.appendChild(wallpaper);
};

const colorPalette = () => {
  const selectColor = document.createElement('div');
  selectColor.id = 'color-palette';
  body.appendChild(selectColor);

  for (let index = 1; index <= 4; index += 1) {
    const creatColor = document.createElement('div');
    creatColor.className = 'color';
    creatColor.id = `color${index}`;
    selectColor.appendChild(creatColor);
  }
};

const matriz = (size) => {
  const block = document.createElement('div');
  block.id = 'pixel-board';
  body.appendChild(block);
  for (let hor = 1; hor <= size; hor += 1) {
    const row = document.createElement('div');
    row.id = `row${hor}`;
    for (let ver = 1; ver <= size; ver += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      row.appendChild(pixel);
    }
    block.appendChild(row);
  }
};

const selectPalette = () => {
  const block = document.querySelectorAll('.color');
  for (let index = 0; index < block.length; index += 1) {
    const currentBlock = block[index];
    currentBlock.addEventListener('click', (event) => {
      const select = document.querySelector('.selected');
      if (select) {
        select.classList.remove('selected');
      }
      event.target.classList.add('selected');
    });
  }
};

const changeColor = () => {
  const elements = document.querySelectorAll('.pixel');
  for (let index = 0; index < elements.length; index += 1) {
    elements[index].addEventListener('click', (event) => {
      const switchItem = document.querySelector('.selected');
      if (switchItem) {
        const salveStyle = window.getComputedStyle(switchItem);
        const newColor = salveStyle.getPropertyValue('background-color');
        event.target.style.backgroundColor = newColor;
      }
    });
  }
};

const resetMatriz = () => {
  const elements = document.querySelectorAll('.pixel');
  for (let index = 0; index < elements.length; index += 1) {
    elements[index].style.backgroundColor = 'rgb(255, 255, 255)';
  }
};

const clearMatriz = () => {
  const button = document.createElement('button');
  button.id = 'clear-board';
  button.innerText = 'Limpar';
  body.appendChild(button);
  button.addEventListener('click', resetMatriz);
};

const radomValue = () => Math.random() * 255;

const radomColor = () => {
  const button = document.createElement('button');
  button.id = 'button-random-color';
  button.innerText = 'Cores aleatórias';
  body.appendChild(button);
  button.addEventListener('click', () => {
    const makingColor = [0, 0, 0];
    const selectPaletteColors = document.querySelectorAll('.color');
    for (let index = 0; index < selectPaletteColors.length; index += 1) {
      const currentColor = document.querySelector(`#color${index + 1}`);
      for (let num = 1; num <= 3; num += 1) {
        makingColor[num] = radomValue();
      }
      const newColor = `rgb(${makingColor[1]}, ${makingColor[2]}, ${makingColor[3]})`;
      currentColor.style.backgroundColor = newColor;
    }
  });
};

const saveInformationLocalStorage = () => {
  const saveInformation = [];
  const elements = document.querySelectorAll('.pixel');
  for (let index = 0; index < elements.length; index += 1) {
    elements[index].addEventListener('click', (event) => {
      const switchItem = document.querySelector('.selected');
      if (switchItem) {
        const salveStyle = window.getComputedStyle(switchItem);
        const newColor = salveStyle.getPropertyValue('background-color');
        event.target.style.backgroundColor = newColor;
        saveInformation[index] = newColor;
        localStorage.setItem('pixelBoard', JSON.stringify(saveInformation));
      }
    });
  }
};

const loadInformationLocalStorage = () => {
  const elements = document.querySelectorAll('.pixel');
  if (localStorage.getItem('pixelBoard')) {
    const loadColor = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let index = 0; index < elements.length; index += 1) {
      elements[index].style.backgroundColor = loadColor[index];
    }
  }
};

// const addSizeOfMatriz = () => {
//   const inputData = document.createElement('div');
//   inputData.id = 'elementPosition';
//   body.appendChild(inputData);
//   const inputValue = document.createElement('input');
//   inputValue.id = 'board-size';
//   inputValue.type = 'number';
//   inputValue.min = 1;
//   inputValue.placeholder = 'Insira um valor';
//   inputData.appendChild(inputValue);
//   const anotherButton = document.createElement('button');
//   anotherButton.id = 'generate-board';
//   anotherButton.innerText = 'VQV';
//   inputData.appendChild(anotherButton);
// };

// const generateMatriz = () => {
//   const inputValue = document.querySelector('#board-size');
//   const anotherButton = document.querySelector('#generate-board');
//   anotherButton.addEventListener('click', () => {
//     if (inputValue >= 5 && inputValue <= 10) {
//       matriz(inputValue);
//       const elements = document.querySelectorAll('.pixel');
//       for (let index = 0; index < elements.length; index += 1) {
//         elements[index].style.backgroundColor = 'rgb(255, 255, 255)';
//       }
//     }
//     alert('Board inválido!');
//   });
// };

background();
showTitle();
colorPalette();
// addSizeOfMatriz();
// generateMatriz();
clearMatriz();
resetMatriz();
matriz(5);
selectPalette();
changeColor();
radomValue();
radomColor();
saveInformationLocalStorage();
loadInformationLocalStorage();
