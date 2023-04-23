import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import generatePassword from './GeneratePassword';
import getStrength from './getStrength';
interface FormData {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

function App() {
  const [inputValues, setInputValues] = useState<FormData>({
    length: 5,
    lowercase: false,
    numbers: false,
    symbols: false,
    uppercase: false,
  });
  const [passwordGenerated, setPasswordGenerated] = useState('');
  const [alert, setAlert] = useState({boolean: false, text: ''});
  const [strength, setStrength] = useState<number[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.target.type === 'checkbox') {
      setInputValues({...inputValues, [e.target.name]: e.target.checked});
      return;
    }
    setInputValues({...inputValues, [e.target.name]: e.target.value});
  };
  const onCopy = () => {
    navigator.clipboard.writeText(passwordGenerated);
    setAlert({boolean: true, text: 'Contraseña copiada'});
    const timeOut = setTimeout(() => {
      setAlert({boolean: false, text: ''});
    }, 3000);
    // return clearTimeout(timeOut);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(inputValues);
    setPasswordGenerated(generatePassword(inputValues));
  }
  useEffect(() => {
    setStrength(getStrength(inputValues));
  }, [inputValues]);

  return (
    <div className="bg-gray-950 h-screen grid items-center justify-center ">
      <div className="bg-gray-900 p-3 py-5 w-80 rounded flex flex-col items-center text-white">
        <h1 className="text-gray-500">Password Generator</h1>
        <div className="w-full relative">
          <p className="bg-gray-700  w-full rounded px-2 py-1 min-h-[32px] text-green-500 font-semibold text-lg">
            {passwordGenerated}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            onClick={onCopy}
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute right-3 top-1 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="bg-gray-700 p-3 mt-4 rounded w-full ">
          <div className="flex flex-col mt-3">
            <div className="flex justify-between">
              <label htmlFor="input-length">Character length</label>
              <h3 className="text-green-500">{inputValues.length}</h3>
            </div>
            <input
              id="input-length"
              type="range"
              max={10}
              min={1}
              step={1}
              name="length"
              value={inputValues.length}
              onChange={(e) => handleChange(e)}
              className="appearance-none bg-transparent [&::-webkit-slider-thumb]:border-8 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:hover:bg-black   my-4"
            />
            <div className="flex flex-col gap-1 my-3">
              <div>
                <input
                  type="checkbox"
                  name="uppercase"
                  id="uppercase"
                  onChange={(e) => handleChange(e)}
                  className="h-3 w-3 mr-3 p-2  appearance-none rounded-sm border   checked:bg-green-500 hover:ring hover:ring-gray-300 focus:outline-none "
                />
                <label htmlFor="uppercase">Include uppercase letters</label>
              </div>
              {/* <div>
                <input
                  type="checkbox"
                  name="lowercase"
                  id="lowercase"
                  onChange={(e) => handleChange(e)}
                  className="h-3 w-3 mr-3 p-2  appearance-none rounded-sm border   checked:bg-green-500 hover:ring hover:ring-gray-300 focus:outline-none "
                />
                <label htmlFor="lowercase">Include lowercase letters</label>
              </div> */}
              <div>
                <input
                  type="checkbox"
                  name="numbers"
                  id="numbers"
                  onChange={(e) => handleChange(e)}
                  className="h-3 w-3 mr-3 p-2  appearance-none rounded-sm border   checked:bg-green-500 hover:ring hover:ring-gray-300 focus:outline-none "
                />
                <label htmlFor="numbers">Include numbers</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="symbols"
                  onChange={(e) => handleChange(e)}
                  id="symbols"
                  className="h-3 w-3 mr-3 p-2  appearance-none rounded-sm border   checked:bg-green-500 hover:ring hover:ring-gray-300 focus:outline-none "
                />
                <label htmlFor="symbols">Include symbols</label>
              </div>
            </div>
            <div className="bg-gray-900/50 my-3 p-3 flex justify-between items-center">
              <h3 className="text-gray-400">STRENGTH</h3>
              {strength.map((number, index) => (
                <div
                  key={index}
                  className={`border-2 w-5 h-10 border-neutral-200 ${
                    number === 0 ? 'bg-green-500' : 'bg-transparent'
                  }`}
                >
                  {' '}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-green-500 p-5 text-black font-medium flex justify-center gap-5 rounded-lg"
            >
              Generate{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div
        className={`absolute top-5  bg-green-500 p-5 flex items-center  gap-3 transition-all duration-500 rounded-lg ${
          alert.boolean ? 'right-9 opacity-1' : '-right-72 opacity-0'
        }`}
      >
        <h2 className="text-base font-semibold">{alert.text}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
    </div>
  );
}

export default App;
