import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import Videos from "../components/Videos";
import Musicas from "../components/Musicas";
import { api } from "../lib/api";


export default function Home() {

    const [sec1,setSec1] = useState(true)
    const [sec2,setSec2] = useState(false)
    const [sec3,setSec3] = useState(false)
    const [nome,setNome] = useState('')
    const [midias,setMidias] = useState([])
    const [musicas,setMusicas] = useState([])
    const [videos,setVideos] = useState([])


    const navigate = useNavigate()

    function handleSec1() {
        setSec1(true)
        setSec2(false)
        setSec3(false)
    }

    function handleSec2() {
        setSec1(false)
        setSec2(true)
        setSec3(false)
    }

    function handleSec3() {
        setSec1(false)
        setSec2(false)
        setSec3(true)
    }

    function handleClickVideo(id) {
        console.log(id)
        localStorage.setItem("midia",id)
        navigate("/viewMidia")
    }

    function handleClickMusica(id) {
        console.log(id)
        localStorage.setItem("midia",id)
        navigate("/viewMidia")
    }

    function loadMidias() {
        api.get(`midias`)
        .then(async response => {
            setMidias(response.data);
            const musicasFiltradas = midias.filter((midia) => midia.tipo === 'musica');
            const videosFiltrados = midias.filter((midia) => midia.tipo === 'video');
            setMusicas(musicasFiltradas);
            setVideos(videosFiltrados);
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        const storedData = localStorage.getItem("user");
        const userData = JSON.parse(storedData);
        if (userData==null) {
            navigate('/')
        }
        setNome(userData.data.name); 
        loadMidias()
    },[musicas,videos, midias])

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

                {/* seccção */}
                <div className="flex w-40 gap-4 justify-between items-center mb-4">
                    <button onClick={handleSec1} className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Tudo</button>
                    <button onClick={handleSec2} className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Músicas</button>
                    <button onClick={handleSec3} className="border rounded-lg bg-gray-300 text-white text-center pl-3 pr-3 pb-0.5 pt-0.5 hover:text-black hover:bg-white">Vídeos</button>
                </div>

                {/* apresentação das mídias */}
                {sec1 ? (<div className="flex-col justify-center items-center border-gray-100 border-2 rounded-lg">
                    <div className="">
                        <div className="flex justify-center mt-4">Vídeos</div>
                        <div className="flex mt-6 ml-6 space-x-6">
                            {videos.map(video=>{ 
                                return(
                                    <div key={video.id} onClick={()=>handleClickVideo(video.id)} className="text-gray-100">
                                        <img src={video.capa}  alt={video.titulo} className="h-40 w-60 rounded-lg transition-transform duration-300 transform-gpu hover:scale-110" />
                                        <div>
                                            {video.titulo}
                                        </div>
                                        <div>
                                            {video.autor}
                                        </div>                                     
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <br />
                    <div>
                        <div className="flex justify-center">
                            Músicas
                        </div>
                        <div className="flex mt-6 ml-6 space-x-6 mb-4">
                            {musicas.map(musica=>{ 
                                return(
                                    <div key={musica.id} onClick={()=>handleClickMusica(musica.id)} className="text-gray-100">
                                        <img src={musica.capa} alt={musica.titulo} className="h-40 w-60 rounded-lg transition-transform duration-300 transform-gpu hover:scale-110"/>
                                        <div>
                                            {musica.titulo}
                                        </div>
                                        <div>
                                            {musica.autor}
                                        </div>                                     
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>) : sec2 ? <Musicas/> : <Videos/>}
                

            </div>
        </div>
    )
}