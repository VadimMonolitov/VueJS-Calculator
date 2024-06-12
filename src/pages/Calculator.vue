<template>
  <div class="calculator">
    <table cellspacing="25">
      <tr>
        <td colspan="4">
          <input type="text" v-model="currentCalculate" disabled>
          <div class="result-label">Результат: <span style="color: orange">{{ result }}</span></div>
        </td>
      </tr>
      <tr>
        <td class="button grey" @click="inputValue(7)">7</td>
        <td class="button grey" @click="inputValue(8)">8</td>
        <td class="button grey" @click="inputValue(9)">9</td>
        <td class="button orange" @click="inputValue('*')">X</td>
      </tr>
      <tr>
        <td class="button grey" @click="inputValue(4)">4</td>
        <td class="button grey" @click="inputValue(5)">5</td>
        <td class="button grey" @click="inputValue(6)">6</td>
        <td class="button orange" @click="inputValue('-')">-</td>
      </tr>
      <tr>
        <td class="button grey" @click="inputValue(1)">1</td>
        <td class="button grey" @click="inputValue(2)">2</td>
        <td class="button grey" @click="inputValue(3)">3</td>
        <td class="button orange" @click="inputValue('+')">+</td>
      </tr>
      <tr>
        <td class="button0 grey" @click="inputValue(0)" colspan="2">0</td>
        <td class="button orange" @click="equal">=</td>
        <td class="button orange" @click="inputValue('/')">/</td>
      </tr>
    </table>
    <router-link to="/history" class="history">История вычислений</router-link>
  </div>
</template>

<script>
import { useHistoryStore } from '@/stores/history';

export default {
  data() {
    return {
      currentCalculate: '0',
      result: '',

    };
  },
  methods: {
    inputValue(value) {

      const operators = ['+', '-', '*', '/'];
      const lastChar = this.currentCalculate.slice(-1);

      if (this.currentCalculate === '0') {
        this.currentCalculate = '';
      }

      if (operators.includes(value)) {
        if (operators.includes(lastChar)) {
          this.currentCalculate = this.currentCalculate.slice(0, -1) + value;
        } else {
          this.currentCalculate += value;
        }
      } else {
        this.currentCalculate += value;
      }
    },
    calculate(expression) {
      const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
      };

      const toRPN = (expr) => {
        const outputQueue = [];
        const operatorStack = [];
        const tokens = expr.match(/\d+|\+|\-|\*|\//g);

        if (tokens[0] === '-') {
          tokens[1] = '-' + tokens[1];
          tokens.shift();
        }

        tokens.forEach((token) => {
          if (!isNaN(token)) {
            outputQueue.push(token);
          } else if (precedence[token]) {
            while (
              operatorStack.length &&
              precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]
            ) {
              outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
            console.log(operatorStack);
            console.log(outputQueue);
          }
        });

        while (operatorStack.length) {
          outputQueue.push(operatorStack.pop());
        }
        return outputQueue;
      };

      const evaluateRPN = (rpn) => {
        const stack = [];

        rpn.forEach((token) => {
          if (!isNaN(token)) {
            stack.push(Number(token));
          } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
              case '+':
                stack.push(a + b);
                break;
              case '-':
                stack.push(a - b);
                break;
              case '*':
                stack.push(a * b);
                break;
              case '/':
                stack.push(a / b);
                break;
            }
          }
        });
        return stack.pop();
      };

      const rpn = toRPN(expression);
      return evaluateRPN(rpn);
    },

    equal() {
      this.result = this.calculate(this.currentCalculate);
      const historyStore = useHistoryStore();
      historyStore.addToHistory(this.currentCalculate, this.result);
    },

    clear() {
      this.currentCalculate = '0'
      this.lastOperation = '0'
    },

    handleKeyup(event) {
      if (event.key === 'Backspace') {
        this.clear();
      }
    },
  },
  mounted() {
    document.addEventListener('keyup', this.handleKeyup);
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: "Inter", sans-serif;
}


.calculator {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  align-items: center;
  border: 1px solid black;
  border-radius: 20px;
  max-width: 400px;
  margin: 10px auto auto auto;
}

input {
  display: block;
  font-size: 60px;
  width: 100%;
  height: 75px;
  padding: 5px 20px 0;
  border: none;
  border-bottom: 1px solid black;
  background-color: white;
  text-align: right;
}

.button {
  font-size: 24px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  text-align: center;
  cursor: pointer;
}

.button0 {
  font-size: 24px;
  padding-left: 24px;
  border-radius: 120px;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.grey {
  background-color: #E3E3E3;
}

.orange {
  background-color: #FF9900;
  font-weight: bold;
}

.result-label {
  font-size: 24px;
  padding-bottom: 25px;
}

.history {
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color: #1D6AFF;
  text-decoration: none;
}
</style>
