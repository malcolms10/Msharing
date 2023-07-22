import { useEffect, useState } from "react"
import { api } from "../lib/api"

export default function Playlist({id}) {

    const [playlists,setPlaylists] = useState([])
    const [nome,setNome] = useState()
    const [checkbox1, setCheckbox1] = useState(false);


    async function loadPlaylists(id) {
        
        await api.get(`playlist/${id}`)
        .then(async reply =>{
            console.log(reply.data)
            setPlaylists(reply.data)
        })
    }

    const handleNome = (event) => {
        setNome(event.target.value)
    }

    const handleCheckbox1 = () => {
        setCheckbox1(!checkbox1);
    };

    const handleCreate = async () =>{
        const data = {
            userId: id, nome: nome, visibility: String(checkbox1)
        }
        await api.post(`/playlist`,data)
        setCheckbox1(!checkbox1)
        setNome('')
    }

    useEffect(()=>{

        loadPlaylists(id)

    },[playlists])

    return(
        <div className="h-screen">
            <div className="mt-3 ml-[500px]">Playlists</div>
            <div className="ml-4 mt-2">
                    <label
                    htmlFor="titulo" className="text-black">
                    
                    <input name="nome" required onChange={handleNome} type="text" value={nome} placeholder="Nome da Plalyst *" className="w-[100%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                    </label>
                    <label className="bg-white text-black rounded-lg p-2 mr-4">
                            <input className="mr-2" type="checkbox" id="checkbox1" onClick={handleCheckbox1} checked={checkbox1}/>
                            Tornar playlist pública
                    </label>
                    <button className="text-gray-100 border-2 border-gray-200 rounded-xl w-[40%] p-2 hover:border-green-600 hover:text-green-600" onClick={handleCreate}> Criar playlist </button>

            </div>
            <div className="mt-4 mb-2 ml-8">Minhas Playlists</div>
            {playlists.map(playlist=>{ 
                return(
                    <div key={playlist.id} className="text-gray-100">
                        <div className="ml-4 pl-2 mt-2 border-2">
                            {playlist.nome}
                        </div>                                    
                    </div>
                )
                })
            }
        </div>
    )
}