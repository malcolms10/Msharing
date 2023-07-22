import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import RadioC from "./Radio/RadioC";


export default function Home() {

    const [nome,setNome] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        const storedData = localStorage.getItem("user");
        const userData = JSON.parse(storedData);
        if (userData==null) {
            navigate('/')
        }
        setNome(userData.data.name); 
    },[])

    return(
        <div className="grid grid-cols-12 min-h-screen bg-gray-700 text-white">
            {/* Esquerdo */}
            <Menu/>

            {/* Direito */}
            <div className="col-span-11 ml-2 mr-2 mt-2">

                {/* NavBar */}
                <div className="flex justify-between items-center mt-1 mr-6 mb-4">
                    <div className="ml-4">
                        <img src={logo} alt="logo" className="rounded-full w-14 h-14"/>
                    </div>
                    <div className="flex-row">
                        <input type="text" placeholder="Pesquisa" className="h-10 rounded-2xl outline-none pl-4 bg-transparent border-gray-200 border-2 w-[600px] rounded-r-none"/>
                        <button className="rounded-l-none h-10 rounded-2xl p-1 bg-gray-500 border-gray-300 border-2 border-l-0 hover:bg-gray-200">Pesquisar</button>
                    </div>
                    <div>
                        <Link to={'/perfil'}> {nome} </Link>
                    </div>
                </div>

                {/* apresentação das Estações */}
                
                <RadioC/>  
                

            </div>
        </div>
    )
}