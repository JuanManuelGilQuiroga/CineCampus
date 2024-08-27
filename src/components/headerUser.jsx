import "../../css/style.css"
export function HeaderUser () {
    return (
        <div className="flex items-center justify-start h-[7vh] w-[70vw]">
            <aside className=" h-[70%]">
                <img className="rounded-[100%] h-[100%]" src="../../storage/perfil.png" alt="" />
            </aside>
            <div className="flex flex-col justify-evenly h-[80%] p-2">
                <p className="text-white">Hi, {import.meta.env.VITE_MONGO_USER}!</p>
                <strong className="text-white">Lets watch a movie together!</strong>
            </div>
        </div>
    )
}
