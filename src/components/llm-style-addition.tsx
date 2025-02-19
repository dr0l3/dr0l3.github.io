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
      <div className="bg-[#2B2D42] rounded-2xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-[#4A90E2]/30 backdrop-blur-sm">
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👤</span>
            <button
              onClick={() => resetGame(mode === "human" ? "llm" : "human")}
              className={`w-14 h-7 rounded-full p-1 transition-all shadow-md ${
                mode === "human" ? "bg-gradient-to-r from-[#4A90E2] to-[#357ABD]" : "bg-gradient-to-r from-[#3A3C5A] to-[#252739]"
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#4A90E2]/5 to-transparent rounded-xl"></div>
          <pre className="font-mono text-2xl whitespace-pre bg-[#1E1E2F] px-8 py-6 rounded-xl shadow-inner border border-[#3A3C5A] text-right text-white">
{`${num1.toString().padStart(5, '0').slice(0, mode === "human" ? 4 - step : step)}[${num1.toString().padStart(5, '0')[mode === "human" ? 4 - step : step]}]${num1.toString().padStart(5, '0').slice((mode === "human" ? 4 - step : step) + 1)}
+ ${num2.toString().padStart(5, '0').slice(0, mode === "human" ? 4 - step : step)}[${num2.toString().padStart(5, '0')[mode === "human" ? 4 - step : step]}]${num2.toString().padStart(5, '0').slice((mode === "human" ? 4 - step : step) + 1)}
───────────────
${mode === "human" ? partialSum.join('').padStart(7, ' ') : partialSum.join('')}`}
          </pre>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#4A90E2]/20 to-transparent mb-8"></div>

        <div className="flex flex-col items-center gap-6">
          {carries[step] > 0 && mode === "human" && (
            <p className="text-[#B0B0C3] font-medium text-lg">
              Don&apos;t forget the carry: {carries[step]}
            </p>
          )}
          <div className="flex gap-3 justify-center">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border border-[#3A3C5A] bg-[#252739] px-4 py-3 w-24 text-center rounded-xl focus:ring-2 focus:ring-[#4A90E2]/50 focus:border-[#4A90E2] outline-none text-white text-2xl font-medium shadow-inner transition-all"
              maxLength={mode === "human" ? 2 : 2}
              onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
            />
            <button
              onClick={handleInputSubmit}
              className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-[#357ABD] hover:to-[#2A6298] active:from-[#2A6298] active:to-[#1F4A78] transform hover:-translate-y-0.5 active:translate-y-0 transition-all border border-[#4A90E2]/20"
            >
              Submit
            </button>
          </div>
          <button
            onClick={generateNumbers}
            className={`${
              isComplete 
                ? "bg-gradient-to-r from-[#9A5BFF] to-[#B388FF] hover:from-[#B388FF] hover:to-[#9A5BFF] active:from-[#8A4BEF] active:to-[#7A3BDF] border-[#9A5BFF]/20 animate-pulse" 
                : "bg-gradient-to-r from-[#3A3C5A] to-[#4A4C6A] hover:from-[#4A4C6A] hover:to-[#5A5C7A] active:from-[#2A2C4A] active:to-[#3A3C5A] border-[#3A3C5A]/20"
            } text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all border`}
          >
            New Numbers
          </button>
          {isCorrect !== null && (
            <p className={`${isCorrect ? "text-[#B388FF]" : "text-red-300"} font-medium text-lg`}>
              {isCorrect ? "Correct!" : "Try again!"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
