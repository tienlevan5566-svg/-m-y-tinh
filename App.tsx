
import React, { useState } from 'react';
import CalculatorButton from './components/CalculatorButton';

const App: React.FC = () => {
    const [displayValue, setDisplayValue] = useState<string>('0');
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

    const inputDigit = (digit: string) => {
        if (waitingForSecondOperand) {
            setDisplayValue(digit);
            setWaitingForSecondOperand(false);
        } else {
            setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForSecondOperand) {
            setDisplayValue('0.');
            setWaitingForSecondOperand(false);
            return;
        }
        if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
        }
    };

    const clearAll = () => {
        setDisplayValue('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    const toggleSign = () => {
        setDisplayValue(String(parseFloat(displayValue) * -1));
    };

    const inputPercent = () => {
        const currentValue = parseFloat(displayValue);
        setDisplayValue(String(currentValue / 100));
    };

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(displayValue);

        if (operator && waitingForSecondOperand) {
            setOperator(nextOperator);
            return;
        }

        if (firstOperand === null) {
            setFirstOperand(inputValue);
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            const resultString = String(parseFloat(result.toPrecision(15)));
            setDisplayValue(resultString);
            setFirstOperand(result);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (first: number, second: number, op: string): number => {
        switch (op) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    };

    const handleEquals = () => {
        const inputValue = parseFloat(displayValue);
        if (operator && firstOperand !== null) {
            const result = calculate(firstOperand, inputValue, operator);
            const resultString = String(parseFloat(result.toPrecision(15)));
            setDisplayValue(resultString);
            setFirstOperand(null);
            setOperator(null);
            setWaitingForSecondOperand(true);
        }
    };

    const formatDisplayValue = (value: string) => {
        if (value.length > 9) {
            return parseFloat(value).toExponential(3);
        }
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 20
        }).format(Number(value));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-xs sm:max-w-sm">
                <div className="bg-calc-dark rounded-3xl shadow-2xl p-4 sm:p-6 space-y-4">
                    <div className="bg-calc-dark text-white text-6xl sm:text-7xl font-light text-right p-4 rounded-lg break-all">
                        {formatDisplayValue(displayValue)}
                    </div>
                    <div className="grid grid-cols-4 gap-3 sm:gap-4">
                        <CalculatorButton label="AC" onClick={clearAll} variant="light-gray" />
                        <CalculatorButton label="+/-" onClick={toggleSign} variant="light-gray" />
                        <CalculatorButton label="%" onClick={inputPercent} variant="light-gray" />
                        <CalculatorButton label="÷" onClick={() => performOperation('/')} variant="operator" />

                        <CalculatorButton label="7" onClick={() => inputDigit('7')} />
                        <CalculatorButton label="8" onClick={() => inputDigit('8')} />
                        <CalculatorButton label="9" onClick={() => inputDigit('9')} />
                        <CalculatorButton label="×" onClick={() => performOperation('*')} variant="operator" />

                        <CalculatorButton label="4" onClick={() => inputDigit('4')} />
                        <CalculatorButton label="5" onClick={() => inputDigit('5')} />
                        <CalculatorButton label="6" onClick={() => inputDigit('6')} />
                        <CalculatorButton label="-" onClick={() => performOperation('-')} variant="operator" />

                        <CalculatorButton label="1" onClick={() => inputDigit('1')} />
                        <CalculatorButton label="2" onClick={() => inputDigit('2')} />
                        <CalculatorButton label="3" onClick={() => inputDigit('3')} />
                        <CalculatorButton label="+" onClick={() => performOperation('+')} variant="operator" />

                        <CalculatorButton label="0" onClick={() => inputDigit('0')} className="col-span-2" />
                        <CalculatorButton label="." onClick={inputDecimal} />
                        <CalculatorButton label="=" onClick={handleEquals} variant="operator" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
