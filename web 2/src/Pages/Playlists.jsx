import {  BiSolidUser } from "react-icons/bi";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Menu from "../components/Menu";
import { useState } from "react";
import { api } from "../lib/api";

export default function Plalyst() {

    const [nome,setNome] = useState('')
    const [id,setId] = useState()
    const [playlists,setPlaylists] = useState([])

    const navigate = useNavigate()

    async function loadPlaylists() {
        
        await api.get('/playlists/pub')
        .then(async reply =>{
            setPlaylists(reply.data)
        })
    }

    useEffect(()=>{
        const storedData = localStorage.getItem("user");
        const userData = JSON.parse(storedData);
        if (userData==null) {
            navigate('/')
        }
            setNome(userData.data.name); 
            setId(userData.data.id)
            loadPlaylists()
    },[playlists])

    return(
        <div className="flex bg-gray-700 text-white ">
            {/* Esquerdo */}
            <Menu/>

            {/* Direito */}
            <div className="w-full ml-2 mr-2 mt-2">

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

                {/* apresentação das playlists */}
                <div className="h-screen flex-col border-gray-100 border-2 rounded-lg">
                    <div className="ml-[40%] mt-2">Playlists públicas</div>
                    {playlists.map(playlist=>{ 
                        return(
                            <div key={playlist.id} className="text-gray-100 flex">
                                <div className="ml-4 pl-2 mt-2 border-b-2 hover:border-gray-50">
                                    {playlist.nome}
                                </div>                                    
                            </div>
                        )
                    })
                    }
                    
                </div>

            </div>
        </div>
    )
}