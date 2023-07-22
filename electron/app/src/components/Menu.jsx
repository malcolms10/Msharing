import { useNavigate } from "react-router-dom";
import { BiHomeAlt2, BiLogOutCircle, BiCollection, BiRadio } from "react-icons/bi";

export default function Menu() {

    const navigate = useNavigate()

    function goHome() {
        navigate('/home')
    }

    function goPlaylist() {
        navigate('/playlists')
    }

    function goRadio() {
        navigate('/Radio')
    }

    function logOut() {
        localStorage.removeItem('user')
        localStorage.removeItem('midia')
        navigate('/')
    }

    return(
        <div className="flex-col w-20 space-y-8 justify-between mt-1 border-2 border-gray-100 rounded-lg">
                <div className="flex-col  space-y-8">
                    <button onClick={goHome}>
                        <div className="ml-4 mt-2">
                            <BiHomeAlt2 className="ml-2" size={25}/>
                            Início
                        </div>
                    </button>
                    <button onClick={goPlaylist}>
                        <div className="ml-2" >
                            <BiCollection className="ml-4" size={25}/>
                            Playlists
                        </div>
                    </button>
                    <button onClick={goRadio}>
                        <div className="ml-4">
                            <BiRadio className="ml-2" size={25}/>
                            Rádio
                        </div>
                    </button>

                </div>
                <button onClick={logOut}>
                    <div className="self-end ml-5">
                        <BiLogOutCircle className="" size={25}/>
                        Sair
                    </div>
                </button>
                
            </div>
    )
}