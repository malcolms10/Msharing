import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function Videos() {

    const [midias,setMidias] = useState([])
    const [videos,setVideos] = useState([])

    const navigate = useNavigate()

    function loadMidias() {
        api.get(`midias`)
        .then(async response => {
            setMidias(response.data);
            const videosFiltrados = midias.filter((midia) => midia.tipo === 'video');
            setVideos(videosFiltrados);
        }).catch(error => {
            console.log(error)
        })
    }

    function handleClickVideo(id) {
        console.log(id)
        localStorage.setItem("midia",id)
        navigate("/viewMidia")
    }

    useEffect(()=>{
        loadMidias()
    },[videos])

    return(
        <div className="">
            <div className="flex justify-center mt-4">Vídeos</div>
            <div className="flex mt-6 ml-6 space-x-6">
                {videos.map(video=>{ 
                    return(
                        <div key={video.id} onClick={()=>handleClickVideo(video.id)} className="text-gray-100">
                            <img src={video.capa} alt={video.titulo} className="h-40 w-60 rounded-lg transition-transform duration-300 transform-gpu hover:scale-110" />
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
    )
}