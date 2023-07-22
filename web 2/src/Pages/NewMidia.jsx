import { useState   } from "react"
import { useEffect } from "react";
import { BiImageAdd } from "react-icons/bi";
import { api } from "../lib/api";
import { BiSolidArrowToBottom } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import MediaPicker from "../components/mediaPicker";
import { MediaAudioPicker } from "../components/mideaAudioPicker";
import { MediaVideoPicker } from "../components/mideaVideoPicker";

export default function NewMidia() {

    const [titulo,setTitulo] = useState()
    const [autor,setAutor] = useState()
    const [historia,setHistoria] = useState()
    const [grupo,setGrupo] = useState()
    const [compo,setCompo] = useState()
    const [editor,setEditor] = useState()
    const [tipo,setTipo] = useState()
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [state,setState] = useState('')
    const [user,setUser] = useState()


    const navigate = useNavigate()

    const handleTitle = (event) => {
        setTitulo(event.target.value)
    }

    const handleAutor = (event) => {
        setAutor(event.target.value)
    }

    const handleCompo = (event) => {
        setCompo(event.target.value)
    }

    const handleHistory = (event) => {
        setHistoria(event.target.value)
    }

    const handleEditor = (event) => {
        setEditor(event.target.value)
    }

    const handleGroup = (event) => {
        setGrupo(event.target.value)
    }

    const handleCheckbox1 = () => {
        setCheckbox2(checkbox1);
        setCheckbox1(!checkbox1);
        setTipo('musica')
    };

    const handleCheckbox2 = () => {
        setCheckbox1(checkbox2);
        setCheckbox2(!checkbox2);
        setTipo('video')
    };

    function handleCancel() {
        navigate('/perfil')
    }

    useEffect(()=>{
        const storedData = localStorage.getItem("user");
        const userData = JSON.parse(storedData);
        if (userData==null) {
            navigate('/')
        }
        setUser(userData.data.id)
    },[])

    async function handleCreateMedia(event) {
        event.preventDefault();

        setState("Aguarde enquanto a sua mídia é carregada")

        const formData = new FormData(event.target);
        
        const imleToUpload = formData.get('capa')
        let coverUrl = ''

        if (imleToUpload) {
        const uploadFormData = new FormData()

        uploadFormData.set('capa', imleToUpload)

        const uploadResponse = await api.post('/upload', uploadFormData)

        coverUrl = uploadResponse.data.fileUrl
        }

        let a = ''

        if (tipo==="video") {
            a = "video"
        }
        else
            a = "audio"

        const fileToUpload = formData.get(a)

        let fileUrl = ''

        if (fileToUpload) {
        const uploadFormData = new FormData()

        uploadFormData.set('file', fileToUpload)

        const uploadResponse = await api.post('/upload', uploadFormData)

        fileUrl = uploadResponse.data.fileUrl
        }

        await api.post('midias',
        {
          capa: coverUrl,
          path: fileUrl,
          titulo: formData.get('titulo'),
          autor: formData.get('autor'),
          grupo: formData.get('grupo'),
          compositor: formData.get('compositor'),
          editora: formData.get('editor'),
          historia: formData.get('historia'),
          tipo: tipo,
          userId: user
        })
        setState("Upload Completo")
        
        // Definir o atraso para 30 segundos (30000 milissegundos)
        const delayInMilliseconds = 60000;

        // Agendar a execução da próxima instrução após 15 segundos
        const timerId = setTimeout(navigate('/perfil'), delayInMilliseconds);

        // Lembre-se de limpar o timer ao desmontar o componente para evitar vazamentos de memória
        return () => clearTimeout(timerId);

    }

    

    return(
        <>
        <div className=" h-screen bg-gray-700 flex justify-center items-center">
            <form onSubmit={handleCreateMedia}>
            <div className="flex justify-center p-[50px] space-x-3 border-gray-100 border-2 rounded-lg">
                <div className="">
                    <label htmlFor="capa" className="flex h-10 w-10 bg-gray-200 justify-center items-center hover:bg-gray-100">
                    <BiImageAdd size={40}/>
                    </label>
                    <MediaPicker/>
                </div>
                
                <div className="flex-col">
                    <div>
                    <label
                    htmlFor="titulo">
                    </label>
                        <input name="titulo" required onChange={handleTitle} type="text" value={titulo} placeholder="Título *" className="w-[100%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                    </div>
                    <div>
                        <label
                        htmlFor="autor">
                        </label>
                        <input name="autor" required onChange={handleAutor} type="text" value={autor} placeholder="Autor *" className="w-[100%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                    </div>
                    <div>
                    <label
                    htmlFor="grupo">
                    </label>
                        <input name="grupo" onChange={handleGroup} type="text" value={grupo} placeholder="Grupo" className="w-[100%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                    </div>
                    <div>
                    <label
                    htmlFor="compositor">
                    </label>
                        <input name="compositor" onChange={handleCompo} type="text" value={compo} placeholder="Compositor(a)" className="w-[100%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                    </div>
                    <div>
                        <label
                        htmlFor="editor">
                        </label>
                        <input name="editor" onChange={handleEditor} type="text" value={editor} placeholder="Editor(a)" className="w-[100%] rounded-md pl-2 h-10 mb-4 outline-none"/>
                    </div>
                    <div>
                        <label
                        htmlFor="historia">
                        </label>
                        <textarea name="historia" rows="5" cols="50" onChange={handleHistory} value={historia} placeholder="História" className="w-[100%] rounded-md pl-2 h-20 mb-4 outline-none"></textarea>
                    </div>
                    <div className="space-x-4">
                        <label className="bg-white rounded-lg p-2">
                            <input className="mr-2" type="checkbox" id="checkbox1" onClick={handleCheckbox1} checked={checkbox1}/>
                            Música
                        </label>
                        <label className="bg-white rounded-lg p-2">
                            <input className="mr-2" type="checkbox" id="checkbox2" onClick={handleCheckbox2} checked={checkbox2}/>
                            Vídeo
                        </label>
                    </div>
                    <div className="mt-6">
                        {checkbox1 ? 
                            (<div>
                                <label htmlFor="audio" className="text-gray-100 border-gray-100 border-2 rounded-lg p-3 flex space-x-2 w-64 justify-center hover:border-green-600 hover:text-gray-50">Adicione aqui a sua música <BiSolidArrowToBottom size={20}/></label>
                                <MediaAudioPicker/>
                            </div>) 
                            :
                            (<div>
                                <label htmlFor="video" className="text-gray-100 border-gray-100 border-2 rounded-lg p-3 flex space-x-2 w-64 justify-center hover:border-green-600 hover:text-gray-50">Adicione aqui o seu vídeo    <BiSolidArrowToBottom size={20}/></label>
                                <MediaVideoPicker/>
                            </div>) }    
                    </div>
                    <div className="space-x-2">
                        <button className="text-gray-100 border-2 border-gray-200 rounded-xl w-[40%] p-2 hover:border-green-600 hover:text-green-600" type="submit" onClick={handleCancel}> Cancelar </button>
                        <button className="text-gray-100 border-2 border-gray-200 rounded-xl w-[40%] p-2 hover:border-green-600 hover:text-green-600" type="submit"> Criar mídia </button>
                    </div>
                    <div className="mt-2 text-gray-100">
                        {state}
                    </div>
                    <div className="text-gray-100 mt-3">
                        Att: os campo com * são obrigatórios!
                    </div>

            </div>
            </div>
            </form>
        </div>
        </>
    )
}