import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { api } from "../lib/api";

export default function Signin() {


  const[password, setPassword] = useState("")
  const[vPass,setPass] = useState("")
  const[email, setEmail] = useState('')
  const[name,setName] = useState('')
  const[isError, setIsError] = useState('')

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^\d{8}@isptec\.co\.ao$/;
    return regex.test(email);
  };

  async function submit(e){

    e.preventDefault()

    if (!validateEmail(email)) {
      setIsError('E-mail ou Palavra-passe inválido')
      return
    }
    else if (password!==vPass) {
      setIsError('As palavras passe devem ser iguais')
      return
    }
    else {
      const data =  { name: name,email: email,passe: password,admin: "false", about:""}
      const response  = await api.post(`user`, data)
      .then(response => {
        console.log(response);
        setIsError('')
        setEmail('')
        setName('')
        setPass('')
        setPassword('')
        localStorage.setItem("user", JSON.stringify(response));
        navigate('/home')
      })
      .catch(function (error) {
        console.log(error);
        setIsError('Este E-mail já existe!')
      });
      
    }

  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const handleVPassChange = (event) => {
    setPass(event.target.value);
  };

  return (

      <div className="h-screen w-screen bg-black flex items-center justify-center">
          <div className="flex-col p-[5%] items-center justify-center rounded-lg w-[65%] bg-gray-600">
                    <h1 className="text-center text-3xl text-white mb-8">Faça já o seu cadastro no Mshare</h1>
                    <br />
                    <form className="flex-col items-center justify-center">
                        <div className="flex justify-center items-center">
                          <input required onChange={handleNameChange} type="text" value={name} placeholder="Nome" className="w-[60%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                        </div>
                        <div className="flex justify-center items-center">
                          <input required onChange={handleEmailChange} type="e-mail" value={email} placeholder="E-mail" className="w-[60%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                        </div>
                        <div className="flex justify-center items-center">
                        <input required onChange={handlePassChange} type="password" value={password} placeholder="Palavra-Passe" className="w-[60%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                        </div>
                        <div className="flex justify-center items-center">
                        <input required onChange={handleVPassChange} type="password" value={vPass} placeholder="Confirmar Palavra-Passe" className="w-[60%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                        </div>
                        <div className="flex justify-center text-gray-100 mb-2">{isError}</div>
                        
                        <div className="flex justify-center items-center">
                          <button className='text-white border-2 text-center w-80 rounded-lg h-10 hover:text-green-600 hover:border-green-600' type="submit" onClick={submit}>Criar Conta</button>
                        </div>

                    </form>
                    <br />
                    
                    <br />
          </div>
      </div>
  )
}
