'use strict';

// Capturando elementos
const inputElement = document.querySelector('.input');
const outputOperationElement = document.querySelector('.operation .value');
const outputResultElement = document.querySelector('.result .value');

// Variáveis
const OPERATORS = ['+', '-', '*', '/'];
const POWER = 'POWER(',
	FACTORIAL = 'FACTORIAL';
let data = {
	operation: [],
	formula: [],
};
let ans = 0;

// Botões da Calculadora
let calculatorBtns = [
	{
		name: 'rad',
		symbol: 'Rad',
		formula: false,
		type: 'key',
	},
	{
		name: 'deg',
		symbol: 'Deg',
		formula: false,
		type: 'key',
	},
	{
		name: 'square-root',
		symbol: '√',
		formula: 'Math.sqrt',
		type: 'math_function',
	},
	{
		name: 'square',
		symbol: 'x²',
		formula: POWER,
		type: 'math_function',
	},
	{
		name: 'open-parenthesis',
		symbol: '(',
		formula: '(',
		type: 'number',
	},
	{
		name: 'close-parenthesis',
		symbol: ')',
		formula: ')',
		type: 'number',
	},
	{
		name: 'clear',
		symbol: 'C',
		formula: false,
		type: 'key',
	},
	{
		name: 'delete',
		symbol: '⌫',
		formula: false,
		type: 'key',
	},
	{
		name: 'pi',
		symbol: 'π',
		formula: 'Math.PI',
		type: 'number',
	},
	{
		name: 'cos',
		symbol: 'cos',
		formula: 'trigo(Math.cos,',
		type: 'trigo_function',
	},
	{
		name: 'sin',
		symbol: 'sin',
		formula: 'trigo(Math.sin,',
		type: 'trigo_function',
	},
	{
		name: 'tan',
		symbol: 'tan',
		formula: 'trigo(Math.tan,',
		type: 'trigo_function',
	},
	{
		name: '7',
		symbol: 7,
		formula: 7,
		type: 'number',
	},
	{
		name: '8',
		symbol: 8,
		formula: 8,
		type: 'number',
	},
	{
		name: '9',
		symbol: 9,
		formula: 9,
		type: 'number',
	},
	{
		name: 'division',
		symbol: '÷',
		formula: '/',
		type: 'operator',
	},
	{
		name: 'e',
		symbol: 'e',
		formula: 'Math.E',
		type: 'number',
	},
	{
		name: 'acos',
		symbol: 'acos',
		formula: 'invTrigo(Math.acos,',
		type: 'trigo_function',
	},
	{
		name: 'asin',
		symbol: 'asin',
		formula: 'invTrigo(Math.asin,',
		type: 'trigo_function',
	},
	{
		name: 'atan',
		symbol: 'atan',
		formula: 'invTrigo(Math.atan,',
		type: 'trigo_function',
	},
	{
		name: '4',
		symbol: 4,
		formula: 4,
		type: 'number',
	},
	{
		name: '5',
		symbol: 5,
		formula: 5,
		type: 'number',
	},
	{
		name: '6',
		symbol: 6,
		formula: 6,
		type: 'number',
	},
	{
		name: 'multiplication',
		symbol: '×',
		formula: '*',
		type: 'operator',
	},
	{
		name: 'factorial',
		symbol: '×!',
		formula: FACTORIAL,
		type: 'math_function',
	},
	{
		name: 'exp',
		symbol: 'exp',
		formula: 'Math.exp',
		type: 'math_function',
	},
	{
		name: 'ln',
		symbol: 'ln',
		formula: 'Math.log',
		type: 'math_function',
	},
	{
		name: 'log',
		symbol: 'log',
		formula: 'Math.log10',
		type: 'math_function',
	},
	{
		name: '1',
		symbol: 1,
		formula: 1,
		type: 'number',
	},
	{
		name: '2',
		symbol: 2,
		formula: 2,
		type: 'number',
	},
	{
		name: '3',
		symbol: 3,
		formula: 3,
		type: 'number',
	},
	{
		name: 'subtraction',
		symbol: '–',
		formula: '-',
		type: 'operator',
	},
	{
		name: 'power',
		symbol: 'x<span>y</span>',
		formula: POWER,
		type: 'math_function',
	},
	{
		name: 'ANS',
		symbol: 'ANS',
		formula: 'ans',
		type: 'number',
	},
	{
		name: 'percent',
		symbol: '%',
		formula: '/100',
		type: 'number',
	},
	{
		name: 'comma',
		symbol: '.',
		formula: '.',
		type: 'number',
	},
	{
		name: '0',
		symbol: 0,
		formula: 0,
		type: 'number',
	},
	{
		name: 'calculate',
		symbol: '=',
		formula: '=',
		type: 'calculate',
	},
	{
		name: 'addition',
		symbol: '+',
		formula: '+',
		type: 'operator',
	},
];

// Criando botões da calculadora
function createCalculatorButtons() {
	const btnsPerRow = 8;
	let addedBtns = 0;

	calculatorBtns.forEach((btn) => {
		if (addedBtns % btnsPerRow == 0) {
			inputElement.innerHTML += `<div class="row"></div>`;
		}

		const row = document.querySelector('.row:last-child');
		row.innerHTML += `<button id="${btn.name}">${btn.symbol}</button>`;
		addedBtns++;
	});
}

createCalculatorButtons();

// Radiano e Grau
let RADIAN = true;

const radBtn = document.getElementById('rad');
const degBtn = document.getElementById('deg');

radBtn.classList.add('active-angle');

function angleToggler() {
	radBtn.classList.toggle('active-angle');
	degBtn.classList.toggle('active-angle');
}

// Ouvintes de Clique
inputElement.addEventListener('click', (event) => {
	const targetBtn = event.target;

	calculatorBtns.forEach((btn) => {
		if (btn.name == targetBtn.id) {
			calculator(btn);
		}
	});
});

// Calculadora
function calculator(btn) {
	if (btn.type == 'operator') {
		data.operation.push(btn.symbol);
		data.formula.push(btn.formula);
	} else if (btn.type == 'number') {
		data.operation.push(btn.symbol);
		data.formula.push(btn.formula);
	} else if (btn.type == 'trigo_function') {
		data.operation.push(btn.symbol + '(');
		data.formula.push(btn.formula);
	} else if (btn.type == 'math_function') {
		let symbol, formula;

		if (btn.name == 'factorial') {
			symbol = '!';
			formula = btn.formula;

			data.operation.push(symbol);
			data.formula.push(formula);
		} else if (btn.name == 'power') {
			symbol = '^(';
			formula = btn.formula;

			data.operation.push(symbol);
			data.formula.push(formula);
		} else if (btn.name == 'square') {
			symbol = '^(';
			formula = btn.formula;

			data.operation.push(symbol);
			data.formula.push(formula);

			data.operation.push('2)');
			data.formula.push('2)');
		} else {
			symbol = btn.symbol + '(';
			formula = btn.formula + '(';
			data.operation.push(symbol);
			data.formula.push(formula);
		}
	} else if (btn.type == 'key') {
		if (btn.name == 'clear') {
			data.operation = [];
			data.formula = [];

			updateOutputResult(0);
		} else if (btn.name == 'delete') {
			data.operation.pop();
			data.formula.pop();
		} else if (btn.name == 'rad') {
			RADIAN = true;
			angleToggler();
		} else if (btn.name == 'deg') {
			RADIAN = false;
			angleToggler();
		}
	} else if (btn.type == 'calculate') {
		let formulaStr = data.formula.join('');

		let POWER_SEARCH_RESULT = search(data.formula, POWER);
		let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);

		const BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT);

		BASES.forEach((base) => {
			let toReplace = base + POWER;
			let replacement = 'Math.pow(' + base + ',';
			formulaStr = formulaStr.replace(toReplace, replacement);
		});

		const NUMBERS = factorialNumberGetter(
			data.formula,
			FACTORIAL_SEARCH_RESULT
		);

		NUMBERS.forEach((factorial) => {
			formulaStr = formulaStr.replace(
				factorial.toReplace,
				factorial.replacement
			);
		});

		let result;
		try {
			result = eval(formulaStr);
		} catch (error) {
			if (error instanceof SyntaxError) {
				result = 'Syntax Error!';
				updateOutputResult(result);
				return;
			}
		}

		// Salvando resultado para usar depois
		ans = result;
		data.formula = [result];
		data.operation = [result];
		updateOutputResult(result);
		return;
	}

	updateOutputOperation(data.operation.join(''));
}

function factorialNumberGetter(formula, factorialIndexes) {
	let factNumbers = [];
	let factSequence = 0;

	factorialIndexes.forEach((factIndex) => {
		let number = [];
		let nextIndex = factIndex + 1;
		let nextInput = formula[nextIndex];

		if (nextInput == FACTORIAL) {
			factSequence++;
			return;
		}

		let firstFactIndex = factIndex - factSequence;
		let previousIndex = firstFactIndex - 1;
		let parenthesisCount = 0;

		while (previousIndex >= 0) {
			if (formula[previousIndex] == '(') parenthesisCount--;
			if (formula[previousIndex] == ')') parenthesisCount++;

			let isOperator = false;
			OPERATORS.forEach((operator) => {
				if (formula[previousIndex] == operator) isOperator = true;
			});

			if (isOperator && parenthesisCount == 0) break;

			number.unshift(formula[previousIndex]);
			previousIndex--;
		}

		let numberStr = number.join('');
		const factorial = 'factorial(';
		const clsoeParenthesis = ')';
		let times = factSequence + 1;

		let toReplace = numberStr + FACTORIAL.repeat(times);
		let replacement =
			factorial.repeat(times) +
			numberStr +
			clsoeParenthesis.repeat(times);

		factNumbers.push({
			toReplace: toReplace,
			replacement: replacement,
		});

		factSequence = 0;
	});
	return factNumbers;
}

function powerBaseGetter(formula, powerIndexes) {
	let powerBases = [];

	powerIndexes.forEach((powerIndex) => {
		let base = [];
		let previousIndex = powerIndex - 1;
		let parenthesisCount = 0;

		while (previousIndex >= 0) {
			if (formula[previousIndex] == '(') parenthesisCount--;
			if (formula[previousIndex] == ')') parenthesisCount++;

			let isOperator = false;
			OPERATORS.forEach((operator) => {
				if (formula[previousIndex] == operator) isOperator = true;
			});

			let isPower = formula[previousIndex] == POWER;

			if ((isOperator && parenthesisCount == 0) || isPower) break;

			base.unshift(formula[previousIndex]);
			previousIndex--;
		}
		powerBases.push(base.join(''));
	});
	return powerBases;
}

// Buscar um array
function search(array, keyword) {
	let searchResult = [];
	array.forEach((element, index) => {
		if (element == keyword) {
			searchResult.push(index);
		}
	});
	return searchResult;
}

// Atualizar saída
function updateOutputOperation(operation) {
	outputOperationElement.innerHTML = operation;
}

function updateOutputResult(result) {
	outputResultElement.innerHTML = result;
}

// Função Fatorial
function factorial(n) {
	if (n % 1 != 0) return gamma(n + 1);
	if (n == 0 || n == 1) return 1;
	let res = 1;
	for (let i = 1; i <= n; i++) {
		res *= i;
		if (res === Infinity) return Infinity;
	}
	return res;
}

// Função gama
function gamma(n) {
	// precisão de cerca de 15 casas decimais
	//algumas constantes mágicas
	var g = 7, // g representa a precisão desejada, p são os valores de p[i] para inserir na fórmula de Lancz
		p = [
			0.99999999999980993, 676.5203681218851, -1259.1392167224028,
			771.32342877765313, -176.61502916214059, 12.507343278686905,
			-0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
		];
	if (n < 0.5) {
		return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
	} else {
		n--;
		var x = p[0];
		for (var i = 1; i < g + 2; i++) {
			x += p[i] / (n + i);
		}
		var t = n + g + 0.5;
		return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
	}
}

// Função trigonométrica
function trigo(callback, angle) {
	if (!RADIAN) {
		angle = (angle * Math.PI) / 180;
	}
	return callback(angle);
}

function invTrigo(callback, value) {
	let angle = callback(value);

	if (!RADIAN) {
		angle = (angle * 180) / Math.PI;
	}

	return angle;
}
