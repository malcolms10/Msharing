import {  BiSolidUser, BiCaretRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import About from "../components/About";
import Menu from "../components/Menu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function OtherPerfil() {

    const navigate = useNavigate()

    function getUser(id) {
        api.get(`/dadouser/${id}`).
        then(response=>{
            console.log(response.data)
        }).
        catch(erro=>{
            console.log(erro)
        })
    }

    useEffect(()=>{
        const storedData = localStorage.getItem("user");
        const userData = JSON.parse(storedData);
        const storedDataO = localStorage.getItem("other");
        const userDataO = JSON.parse(storedData);
        if (userData==null) {
            navigate('/')
        }
    },[])

    return(
        <div className="flex bg-gray-700 text-white">
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
                        <Link to={'/perfil'}> Malcolm </Link>
                    </div>
                </div>
                {/* apresentação */}
                <div className="flex items-center space-x-8">
                    <div className="ml-8 mb-4 rounded-full w-24 justify-center items-center">
                        <BiSolidUser className="" size={100}/>
                    </div>
                    <div>
                        <p className="text-2xl">Malcolm</p>
                        <p className="text-gray-100 text-sm">20191329@isptec.co.ao</p>
                        <button className="">
                            <div className="flex items-center">
                            <p className="text-gray-100 hover:text-gray-50">mais sobre mim </p><BiCaretRight/>
                            </div>
                        </button>  
                    </div>
                </div>
                

                {/* seccção */}
                <div className="flex w-40 gap-4 justify-between items-center mb-4">
                    <button className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Início</button>
                    <button className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Playlists</button>
                    <button className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Sobre</button>
                    <button className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Verificar</button>
                </div>

                {/* apresentação das mídias */}
                <div className="overflow-auto flex border-gray-100 border-2 rounded-lg">
                    <About/>
                </div>

            </div>
        </div>
    )
}