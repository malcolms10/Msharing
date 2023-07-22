import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import logo from '../assets/logo.png'
import Menu from "../components/Menu";
import { api, baseURL } from "../lib/api"; 
import { BiMessageSquareAdd } from "react-icons/bi";

export default function ViewMidia() {

    const navigate = useNavigate

    const [titulo,setTitulo] = useState()
    const [autor,setAutor] = useState()
    const [historia,setHistoria] = useState()
    const [grupo,setGrupo] = useState()
    const [compo,setCompo] = useState()
    const [editor,setEditor] = useState()
    const [tipo,setTipo] = useState()
    const [capa,setCapa] = useState()
    const [path,setPath] = useState()
    const [coment,setComent] = useState()
    const [mId,setMid] = useState()
    const [uId,setUid] = useState()
    const [name,setName] = useState()
    const [coments,setComents] = useState([])
    const [midias,setMidias] = useState([])

    async function loadMidia(str) {
        await api.get(`midias/${str}`).
        then(async response => {

            const [c, d] = response.data.path.split("uploads/");

            setPath(d)
            setCapa(response.data.capa)
            setTitulo(response.data.titulo);
            setAutor(response.data.autor);
            setTipo(response.data.tipo);
            setGrupo(response.data.grupo);
            setCompo(response.data.compo);
            setEditor(response.data.editor);
            setHistoria(response.data.historia);
            setMid(response.data.id);
        }).catch(error => {
            console.log(error)
        })
    }

    function loadAllMidias() {
        api.get(`midias`)
        .then(async response => {
            setMidias(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    async function handleClickMidia(id) {
        await api.get(`midias/${id}`).
        then(async response => {

            const [c, d] = response.data.path.split("uploads/");

            setPath(d)
            setCapa(response.data.capa)
            setTitulo(response.data.titulo);
            setAutor(response.data.autor);
            setTipo(response.data.tipo);
            setGrupo(response.data.grupo);
            setCompo(response.data.compo);
            setEditor(response.data.editor);
            setHistoria(response.data.historia);
            setMid(response.data.id);
        }).catch(error => {
            console.log(error)
        })
    }

    async function loadComents(str) {
        await api.get(`comments/${str}`).
        then(async response => {
            setComents(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const handleComentChange = (event) => {
        setComent(event.target.value);
    };

    async function handleCreateComent() {
        const data = { coment: coment, userId: uId, midiaId: mId }
        await api.post(`/coments`,data)
        setComent('')
        navigate('/viewMidia')
    }

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        const userData = JSON.parse(storedUser);
        if (userData==null) {
            navigate('/')
        }
        setName(userData.data.name)
        setUid(userData.data.id)
        const storedMidia = localStorage.getItem("midia")
        setMid(storedMidia)
        loadMidia(storedMidia)
        loadAllMidias()
        loadComents(storedMidia)
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
                        <Link to={'/perfil'}> {name} </Link>
                    </div>
                </div>

                {/* apresentação da mídia */}
                <div className="flex border-gray-100 border-2 rounded-lg">
                    <div className="w-[70%] ml-4">
                        {tipo == "video" ? (
                        <div className="">
                            <video src={`${baseURL}/uploads/${path}`} controls className="w-[800px] h-[500px]" />
                        </div>) : (<div>
                            <img src={capa} className="w-[760px] rounded-lg mt-2 h-[400px] mb-2" />
                            <audio src={`${baseURL}/uploads/${path}`} controls className="w-[750px] bg-transparent"></audio>
                        </div>) 
                        }
                        
                        <div className="mt-4 mb-4 "> 
                            <p className="text-xl">{titulo}</p>
                            <p>{autor}</p>
                            <p>{tipo}</p>
                        </div>
                        <div>
                            Secção de comentários
                            <div className="flex items-center space-x-1">
                                <input onChange={handleComentChange} type="text" value={coment} className="rounded-lg w-[80%] bg-transparent border-b-2 border-t-2 border-gray-100 outline-none pl-2 mb-2 mt-4" />
                                <BiMessageSquareAdd onClick={handleCreateComent} size={30}/>
                            </div>
                            <div className="mb-2">
                            {coments.map(comment=>{ 
                                return(
                                    <div key={comment.id} className="text-gray-100">
                                        <div>
                                            {comment.coment}
                                        </div>                                    
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                    <div className="flex-col mt-5">
                    {midias.map(midia=>{ 
                        return(
                                
                                <ol key={midia.id} onClick={()=>handleClickMidia(midia.id)} className="mb-3">
                                    <li><img src={midia.capa} alt="logo" className="w-[180px] h-[90px] rounded-lg transition-transform duration-300 transform-gpu hover:scale-110"/>{midia.titulo}</li>
                                </ol>
                        )
                        }
                    )}  
                    </div>
                </div>
            </div>
        </div>
    )
}