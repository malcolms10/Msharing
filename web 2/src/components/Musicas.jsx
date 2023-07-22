import { useEffect } from "react";
import { useState } from "react";
import { api } from "../lib/api";

export default function Musicas() {

    const [midias,setMidias] = useState([])
    const [musicas,setMusicas] = useState([])

    function loadMidias() {
        api.get(`midias`)
        .then(async response => {
            setMidias(response.data);
            const musicasFiltradas = midias.filter((midia) => midia.tipo === 'musica');
            setMusicas(musicasFiltradas);
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        loadMidias()
    },[musicas])


    return(
        <div>
            <div className="flex justify-center">
                Músicas
            </div>
            <div className="flex mt-6 ml-6 space-x-6 mb-4">
                {musicas.map(musica=>{ 
                    return(
                        <div key={musica.id} className="text-gray-100">
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
    )
}