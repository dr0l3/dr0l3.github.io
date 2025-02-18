"use client";
import { useState, useEffect, useRef } from "react";

export default function LLMStyleAddition() {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [mode, setMode] = useState<"human" | "llm">("human");
  const [step, setStep] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [carries, setCarries] = useState<number[]>([0, 0, 0, 0, 0]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [partialSum, setPartialSum] = useState<(number)[]>([
  ]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate two random 5-digit numbers
  const generateNumbers = () => {
    setNum1(Math.floor(10000 + Math.random() * 90000));
    setNum2(Math.floor(10000 + Math.random() * 90000));
    setStep(0);
    setUserInput("");
    setCarries([0, 0, 0, 0, 0]);
    setIsCorrect(null);
    setPartialSum([]);
    setIsComplete(false);
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const getDigitAt = (num: number, rightToLeftPosition: number): number => {
    console.log("num", num);
    console.log("position", rightToLeftPosition);
    const digit = Math.floor((num / Math.pow(10, rightToLeftPosition)) % 10);
    console.log("digit", digit);
    return digit;
  };

  const calculateExpectedSum = (rightToLeftPosition: number): number => {
    const totalSum = num1 + num2;
    if (rightToLeftPosition === 4) {
      return Math.floor(totalSum / 10000);
    }
    return getDigitAt(totalSum, rightToLeftPosition);
  };

  const handleInputSubmit = () => {
    console.log("step", step);
    const rightToLeftPosition = mode === "llm" ? 4 - step : step;
    console.log("rightToLeftPosition", rightToLeftPosition);
    const expected = calculateExpectedSum(rightToLeftPosition);
    console.log("expected", expected);
    const correct = parseInt(userInput) === expected;
    console.log("correct", correct);
    setIsCorrect(correct);

    if (correct) {
      // Update partial sum
      let newPartialSum;
      if (mode === "human") {
        // Prepend for human mode
        newPartialSum = [expected, ...partialSum];
      } else {
        // Append for LLM mode
        newPartialSum = [...partialSum, expected];
      }
      setPartialSum(newPartialSum);

      setTimeout(() => {
        setUserInput("");
        setIsCorrect(null);
        if (step < 4) {
          setStep(step + 1);
        } else {
          setIsComplete(true);
        }
        inputRef.current?.focus();
      }, 1000);
    }
  };

  const resetGame = (newMode: "human" | "llm") => {
    setMode(newMode);
    setStep(0);
    setUserInput("");
    setCarries([0, 0, 0, 0, 0]);
    setIsCorrect(null);
    setPartialSum([]);
  };

  return (
    <div className="max-w-md mx-auto font-sans p-4">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-700 backdrop-blur-sm">
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👤</span>
            <button
              onClick={() => resetGame(mode === "human" ? "llm" : "human")}
              className={`w-14 h-7 rounded-full p-1 transition-all shadow-md ${
                mode === "human" ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-gradient-to-r from-gray-600 to-gray-700"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transform transition-transform shadow-sm ${
                  mode === "human" ? "translate-x-0" : "translate-x-7"
                }`}
              />
            </button>
            <span className="text-2xl">🤖</span>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-xl"></div>
          <pre className="font-mono text-2xl whitespace-pre bg-gradient-to-b from-gray-900 to-gray-950 px-8 py-6 rounded-xl shadow-inner border border-gray-800/50 text-right">
{`${num1.toString().padStart(5, '0').slice(0, mode === "human" ? 4 - step : step)}[${num1.toString().padStart(5, '0')[mode === "human" ? 4 - step : step]}]${num1.toString().padStart(5, '0').slice((mode === "human" ? 4 - step : step) + 1)}
+ ${num2.toString().padStart(5, '0').slice(0, mode === "human" ? 4 - step : step)}[${num2.toString().padStart(5, '0')[mode === "human" ? 4 - step : step]}]${num2.toString().padStart(5, '0').slice((mode === "human" ? 4 - step : step) + 1)}
───────────────
${mode === "human" ? partialSum.join('').padStart(7, ' ') : partialSum.join('')}`}
          </pre>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent mb-8"></div>

        <div className="flex flex-col items-center gap-6">
          {carries[step] > 0 && mode === "human" && (
            <p className="text-blue-300 font-medium text-lg">
              Don&apos;t forget the carry: {carries[step]}
            </p>
          )}
          <div className="flex gap-3 justify-center">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border border-gray-700 bg-gradient-to-b from-gray-900 to-gray-950 px-4 py-3 w-24 text-center rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-white text-2xl font-medium shadow-inner transition-all"
              maxLength={mode === "human" ? 2 : 2}
              onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
            />
            <button
              onClick={handleInputSubmit}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 transform hover:-translate-y-0.5 active:translate-y-0 transition-all border border-blue-400/20"
            >
              Submit
            </button>
          </div>
          <button
            onClick={generateNumbers}
            className={`${
              isComplete 
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 border-green-400/20 animate-pulse" 
                : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 active:from-gray-800 active:to-gray-900 border-gray-500/20"
            } text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all border`}
          >
            New Numbers
          </button>
          {isCorrect !== null && (
            <p className={`${isCorrect ? "text-green-300" : "text-red-300"} font-medium text-lg`}>
              {isCorrect ? "Correct!" : "Try again!"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
