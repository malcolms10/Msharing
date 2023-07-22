import { BiSolidUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Upload() {

    const navigate = useNavigate();

    function handleCreate() {
        navigate('/createMidia')
    }

    return(
        <div className="h-screen flex-col ml-[35%] mb-[10%] mt-[10%] w-full">
            <BiSolidUser size={90}/>
            <div className="text-2xl justify-center">Carregue uma mídia para começar</div>
            <div>Comece a partilhar a sua história e a estabelecer laços com os visitantes.</div>
            <div className="mb-4">As mídias que carregar aparecem aqui.</div>
            <button onClick={handleCreate} className="bg-green-600 hover:bg-green-100 text-black rounded-full p-2">
                Carregar mídia
            </button>
        </div>
    )
}