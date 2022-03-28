// #region Theme Switcher
function setGlobalTheme(theme) {
  document.body.classList.remove('theme-dark', 'theme-light', 'theme-contrast');
  document.body.classList.add(`theme-${theme || 'dark'}`);
}

function enableThemeSwitcher() {
  const switcher = document.getElementById('theme-switcher');
  const themeMap = {
    1: 'dark',
    2: 'light',
    3: 'contrast',
  };

  switcher.addEventListener('input', (event) => {
    console.log(event.target.value);
    setGlobalTheme(themeMap[event.target.value]);
  });

  setGlobalTheme(themeMap[switcher.value]);
}
// #endregion

// #region Calculator
class Calculator {
  #resultNode;
  #numberNodes;
  #operatorNodes;
  #controlNodes;

  #operator = null;
  #leftOperand = 0;
  #rightOperand = 0;

  constructor(node) {
    this.#resultNode = node.querySelector('[data-result]');
    this.#numberNodes = node.querySelectorAll('[data-number]');
    this.#controlNodes = node.querySelectorAll('[data-control]');
    this.#operatorNodes = node.querySelectorAll('[data-operator]');

    this.#attachListeners();
    this.#render();
  }

  #attachListeners() {
    this.#numberNodes.forEach(
      (node) => node.addEventListener('click', (e) => this.#onNumberInput(e)),
    );

    this.#controlNodes.forEach(
      (node) => node.addEventListener('click', (e) => this.#onControlInput(e)),
    );

    this.#operatorNodes.forEach(
      (node) => node.addEventListener('click', (e) => this.#onOperatorInput(e)),
    );
  }

  #render() {
    console.dir({
      operator: this.#operator,
      leftOperand: this.#leftOperand,
      rightOperand: this.#rightOperand,
    });
    this.#resultNode.textContent = this.#rightOperand;
  }

  // #region event handlers
  #onNumberInput(event) {
    const input = event.target.dataset.number;

    if (isNaN(input)) {
      throw new Error('Operand value must be a number!');
    }

    if (this.#rightOperand) {
      this.#rightOperand = Number(`${this.#rightOperand}${input}`);
    } else {
      this.#rightOperand = Number(input);
    }

    this.#render();
  }

  #onControlInput(event) {
    switch(event.target.dataset.control) {
      case 'reset': 
        this.#onResetControl();
        break;
      case 'delete':
        this.#onDeleteControl();
        break;
      case 'calculate': 
        this.#onCalculateControl();
        break;
      default: 
        break;
    }
  }

  #onOperatorInput(event) {
    const input = event.target.dataset.operator;

    if (
      input !== '+' &&
      input !== '-' &&
      input !== '/' &&
      input !== '*'
    ) {
      throw new Error('Calculator supports only +, -, / and * operators');
    }

    this.#operator = input;

    if (this.#rightOperand) {
      this.#leftOperand = this.#rightOperand;
      this.#rightOperand = 0;
      this.#render();
    }
  }
  // #endregion

  // #region controls
  #onResetControl() {
    this.#operator = null;
    this.#leftOperand = 0;
    this.#rightOperand = 0;

    this.#render();
  }

  #onDeleteControl() {
    this.#rightOperand = Number(this.#rightOperand.toString().slice(0, -1)) || 0;

    this.#render();
  }

  #onCalculateControl() {
    let result;

    // todo: convert operands to null so 5 += 10
    // todo: handle errors and max numbers

    switch (this.#operator) {
      case '+':
        result = this.#leftOperand + this.#rightOperand;
        break;
      case '-':
        result = this.#leftOperand - this.#rightOperand;
        break;
      case '/':
        result = this.#leftOperand / this.#rightOperand;
        break;
      case '*':
        result = this.#leftOperand * this.#rightOperand;
        break;
      default:
        return;
    }

    this.#rightOperand = result;
    this.#render();
  }
  // #endregion
}

function enableCalculator() {
  new Calculator(document.getElementById('calculator'));
}
// #endregion

window.addEventListener('load', function() {
  enableThemeSwitcher();
  enableCalculator();
});