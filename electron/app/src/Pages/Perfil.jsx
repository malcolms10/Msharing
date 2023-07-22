import {  BiSolidUser, BiCaretRight } from "react-icons/bi";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Upload from "../components/Upload";
import About from "../components/About";
import Menu from "../components/Menu";
import { useState } from "react";
import Inicio from "../components/Inicio";
import Playlist from "../components/createPlaylist";

export default function Perfil() {

    const [sec1,setSec1] = useState(true)
    const [sec2,setSec2] = useState(false)
    const [sec3,setSec3] = useState(false)
    const [sec4,setSec4] = useState(false)
    const [nome,setNome] = useState('')
    const [id,setId] = useState()
    const [email,setEmail] = useState('')
    const [about,setAbout] = useState('')

    const navigate = useNavigate()

    function handleSec1() {
        setSec1(true)
        setSec2(false)
        setSec3(false)
        setSec4(false)
    }

    function handleSec2() {
        setSec1(false)
        setSec2(true)
        setSec3(false)
        setSec4(false)
    }

    function handleSec3() {
        setSec1(false)
        setSec2(false)
        setSec3(true)
        setSec4(false)
    }

    function handleSec4() {
        setSec1(false)
        setSec2(false)
        setSec3(false)
        setSec4(true)
    }

    useEffect(()=>{
        const storedData = localStorage.getItem("user");
        const userData = JSON.parse(storedData);
        if (userData==null) {
            navigate('/')
        }
            setNome(userData.data.name); 
            setEmail(userData.data.email)
            setAbout(userData.data.about)
            setId(userData.data.id)
    },[])

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
                {/* apresentação */}
                <div className="flex items-center space-x-8">
                    <div className="ml-8 mb-4 rounded-full w-24 justify-center items-center">
                        <BiSolidUser className="" size={100}/>
                    </div>
                    <div>
                        <p className="text-2xl">{nome}</p>
                        <p className="text-gray-100 text-sm">{email}</p>
                        <button onClick={handleSec4}>
                            <div className="flex items-center">
                            <p className="text-gray-100 hover:text-gray-50">mais sobre mim </p><BiCaretRight/>
                            </div>
                        </button>  
                    </div>
                </div>
                

                {/* seccção */}
                <div className="flex w-40 gap-4 justify-between items-center mb-4">
                    <button onClick={handleSec1} className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Início</button>
                    <button onClick={handleSec2} className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Upload</button>
                    <button onClick={handleSec3} className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Playlists</button>
                    <button onClick={handleSec4} className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Sobre</button>
                </div>

                {/* apresentação das mídias */}
                <div className="overflow-auto max-h-screen flex border-gray-100 border-2 rounded-lg">
                    {sec1 ? <Inicio nome={nome}/> : sec2 ? <Upload/> : sec3 ? <Playlist id={id}/> : <About text={about}/>}
                    
                </div>

            </div>
        </div>
    )
}