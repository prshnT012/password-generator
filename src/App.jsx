import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [moreClick, setMoreClick] = useState(false);
  // useRef hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    const copyElement = document.getElementById('copyPasswordID')
    copyElement.innerText = "Copied!"
    copyElement.style.backgroundColor = "rgb(77 124 15)"
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pswd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$^&*()_~";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pswd += str.charAt(char);
    }

    setPassword(pswd);
    const copyElement = document.getElementById('copyPasswordID')
    copyElement.innerText = "Copy"
    copyElement.style.backgroundColor = "rgb(29 78 216 / var(--tw-bg-opacity))"
  }, [length, numberAllowed, charAllowed, setPassword]);

    
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, moreClick, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md shadow-md rounded-lg px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-800">
        <h1 className=" text-white text-center my-3 font-bold">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            id="copyPasswordID"
            className="outline-none bg-blue-700 text-white w-20 px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={25}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onClick={(e) => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onClick={(e) => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
        <button
          className="w-full outline-none bg-blue-700 hover:bg-blue-500 text-white px-3 py-1 my-3 rounded-lg shrink-0"
          onClick={(e) => {
            setMoreClick((prev) => !prev);
          }}
        >
          Get More
        </button>
      </div>
    </>
  );
}

export default App;
