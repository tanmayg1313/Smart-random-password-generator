import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*_+-=";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  const getPasswordStrength = () => {
    let strength = 0;
    if (length >= 8) strength += 1;
    if (numberAllowed) strength += 1;
    if (charAllowed) strength += 1;
    return strength;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Password Generator
        </h1>
        
        <div className="relative">
          <input
            type="text"
            value={password}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              copied
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={copyPasswordToClipboard}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-white text-sm font-medium">Password Length: {length}</label>
            <input
              type="range"
              min={6}
              max={15}
              value={length}
              className="w-48 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-white text-sm">Include Numbers</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-white text-sm">Include Special Characters</span>
            </label>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Password Strength:</span>
              <span className="font-medium">
                {getPasswordStrength() === 0 && "Weak"}
                {getPasswordStrength() === 1 && "Medium"}
                {getPasswordStrength() === 2 && "Strong"}
                {getPasswordStrength() === 3 && "Very Strong"}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  getPasswordStrength() === 0
                    ? "w-0 bg-red-500"
                    : getPasswordStrength() === 1
                    ? "w-1/3 bg-yellow-500"
                    : getPasswordStrength() === 2
                    ? "w-2/3 bg-blue-500"
                    : "w-full bg-green-500"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
