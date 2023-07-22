import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { api } from "../lib/api";

export default function Login() {


  const[password, setPassword] = useState("")
  const[email, setEmail] = useState('')
  const[isError, setIsError] = useState('')

  const navigate = useNavigate();
  
  async function submit(e){
    e.preventDefault()
    await api.get(`user/${email}`)
    .then(response => {
      console.log(response);
      if (password!=response.data.passe) {
        setIsError('E-mail ou Palavra-passe inválido')
      } 
      else{
        setEmail('')
        setPassword('')
        setIsError('')
        localStorage.setItem("user", JSON.stringify(response));
        navigate('/home')
      }
    })
    .catch(function (error) {
      console.log(error);
      setIsError('E-mail ou Palavra-passe inválido')
    });
    
  }

  function createAccount() {
    navigate('/Signin')
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
          <div className="flex-col p-[5%] items-center justify-center rounded-lg w-[65%] bg-gray-600">
                    <h1 className="text-center text-3xl text-white mb-8">Bem-vindo ao Mshare</h1>
                    <br />
                    <form className="flex-col items-center justify-center" onSubmit={submit}>
                        <div className="flex justify-center items-center">
                          <input required onChange={handleEmailChange} type="e-mail" value={email} placeholder="E-mail" className="w-[60%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                        </div>
                        <div className="flex justify-center items-center">
                        <input required onChange={handlePassChange} type="password" value={password} placeholder="Palavra-Passe" className="w-[60%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                            
                        </div>
                        <div className="text-white text-center mb-2">{isError}</div>
                        
                        <div className="flex justify-center items-center">
                          <button className='text-white border-2 text-center w-80 rounded-lg h-10 hover:text-green-600 hover:border-green-600' type="submit">Entrar</button>
                        </div>

                    </form>
                    <br />
                    <div className="flex justify-end">
                      <button onClick={createAccount} className='text-white justify-end hover:text-green-600' >Criar uma conta</button>
                    </div>
                    <br />
          </div>
      </div>
  )
}
