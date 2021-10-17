const gridContainer = document.getElementsByClassName(
	'grid-container'
)[0] as HTMLDivElement;
const grids: HTMLDivElement[] = [];
// resetting
const resetButton = document.getElementsByClassName('reset-button')[0];
const resetPopUp = document.getElementsByClassName(
	'reset-popup'
)[0] as HTMLDivElement;
const resetForm = resetPopUp.getElementsByTagName('form')[0];
const formInput = document.querySelector(
	'input[type="number"]'
) as HTMLInputElement;

const gridSize = 500;

const createGrid = (dimensions: number = 16) => {
	const quantity = dimensions * dimensions;
	for (let i = 0; i < quantity; i++) {
		const grid = document.createElement('div');
		grid.setAttribute('class', 'grid');
		gridContainer.appendChild(grid);
		grid.addEventListener('mouseover', paintGrid);
		grids.push(grid);
	}
	const sizeForEveryGrid = gridSize / dimensions;
	gridContainer.style.gridTemplateColumns = `repeat(${dimensions}, ${sizeForEveryGrid}px)`;
	gridContainer.style.gridTemplateRows = `repeat(${dimensions}, ${sizeForEveryGrid}px)`;
};

const paintGrid = (event: MouseEvent) => {
	const target = event.target as HTMLDivElement;
	const targetStyles = target.style;
	if (targetStyles.background && !targetStyles.filter) {
		target.style.filter = 'brightness(90%)';
	} else if (targetStyles.background && targetStyles.filter) {
		let filterAmount =
			Number(
				targetStyles.filter.slice(
					targetStyles.filter.indexOf('(') + 1,
					targetStyles.filter.length - 2
				)
			) - 10;
		if (filterAmount >= 0) {
			target.style.filter = `brightness(${filterAmount}%)`;
		}
	} else {
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);
		target.style.background = `#${randomColor}`;
	}
};

const removeGrids = () => {
	grids.forEach((grid) => {
		grid.removeEventListener('mouseover', paintGrid);
		grid.remove();
	});
};

resetButton.addEventListener('click', () => {
	resetPopUp.style.display = 'block';
});
resetForm.addEventListener('submit', (event) => {
	const newGridSize = Number(formInput.value);
	event.preventDefault();
	removeGrids();
	createGrid(newGridSize);
	formInput.value = '';
	resetPopUp.style.display = 'none';
});

createGrid();
