import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { api } from "../lib/api"
import { BiTrash } from "react-icons/bi";

export default function Inicio({nome}) {

    const [midias,setMidias] = useState([])
    const [musicas,setMusicas] = useState([])
    const [videos,setVideos] = useState([])
    const [adm,setAdm] = useState()
    const [uId,setuId] = useState()

    const navigate = useNavigate()

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
        api.get(`/midias`)
        .then(async response => {
            setMidias(response.data);
            console.log(midias)
            const musicasFiltradas = midias.filter((midia) => midia.tipo === 'musica' && (adm=="true"));
            const videosFiltrados = midias.filter((midia) => midia.tipo === 'video'  && (adm=="true"));
            setMusicas(musicasFiltradas);
            setVideos(videosFiltrados);
        }).catch(error => {
            console.log(error)
        })
    }

    async function handleDelete(id) {
        await api.delete(`comments/${id}`)
        await api.delete(`midias/${id}`)
    }

    useEffect(()=>{
        const storedData = localStorage.getItem("user");
        const userData = JSON.parse(storedData);
        if (userData==null) {
            navigate('/')
        }
        setuId(userData.data.id)
        setAdm(userData.data.admin)
        loadMidias()
        
    },[midias])

    return(
        <><div className="flex-col h-screen justify-center bg-gray-700 items-center border-gray-100">
            <div className="">
            <div className="flex justify-center mt-4">Vídeos</div>
            <div className="flex mt-6 ml-6 space-x-6">
                {videos.map(video => {
                    return (
                        <div key={video.id} className="text-gray-100">
                            <img src={video.capa} onClick={() => handleClickVideo(video.id)} alt={video.titulo} className="h-40 w-60 rounded-lg transition-transform duration-300 transform-gpu hover:scale-110" />
                            <div className="flex items-center justify-between">
                                {video.titulo}
                                <BiTrash onClick={()=>handleDelete(video.id)} size={20}/>
                            </div>
                            <div onClick={() => handleClickVideo(video.id)}>
                                {video.autor}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div><br /><div>
                <div className="flex justify-center ml-4 mt-4">
                    Músicas
                </div>
                <div className="flex mt-6 ml-6 space-x-6 mb-4">
                    {musicas.map(musica => {
                        return (
                            <div key={musica.id} className="text-gray-100">
                                <img src={musica.capa} onClick={()=>handleClickMusica(musica.id)} alt={musica.titulo} className="h-40 w-60 rounded-lg transition-transform duration-300 transform-gpu hover:scale-110" />
                                <div className="flex items-center justify-between">
                                    {musica.titulo}
                                    <BiTrash onClick={()=>handleDelete(musica.id)} size={20}/>
                                </div>
                                <div onClick={()=>handleClickMusica(musica.id)}>
                                    {musica.autor}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div></>)
}