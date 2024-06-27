import { useState, useCallback, useEffect,useRef } from 'react'

function App() {
  const [length, setlength] = useState(8);
  const [num, setnum] = useState(false);
  const [char, setchar] = useState(false);
  const [Password, setpassword] = useState("");

// useref
const passwordRef= useRef(null)

  const PasswordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (num) { str += "0987654321"; }
    if (char) { str += "!@#$%^&*()_+{}><?:'";}
    for (let i = 1; i<= length; i++) {
      let val =Math.floor(Math.random()*str.length+1);
      pass +=str.charAt(val);
    }
    setpassword(pass);
  }, [length, num, char,setpassword]);
 
  // const copypasstoclipboard=useCallback(()=>{
  //   window.navigator.clipboard.writeText(Password)
  // },[Password])
  const copypasstoclipboard=()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
    // alert("password copied!");
  }
  useEffect(()=>{
    PasswordGenerator()
  },[length,char,PasswordGenerator,num])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1>PASSWORD GENERATOR</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={Password}
            className='outline-none w-full py-1 px-3'
            readOnly
            ref={passwordRef} />
          <button className=' bg-red-800 text-white' onClick={copypasstoclipboard}>copy</button>
        </div>

        <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => { setlength(e.target.value) }}
        />
        <label>length:{length}</label>

        <input type="checkbox"
          defaultChecked={num}
          id="number-inp"
          onChange={() => setnum((prev) => !prev)} />
        <label >Numbers</label>


        <input type="checkbox"
          defaultChecked={char}
          id="char-inp"
          onChange={() => setchar((pre) => !pre)} />
        <label>Character</label>
      </div>
    </>
  )
}

export default App
