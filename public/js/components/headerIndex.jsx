import { HeaderUser } from "./headerUser";

export function HeaderIndex () {
    return (
        <div className="flex items-center justify-evenly h-[60%]">
            <HeaderUser />
            <div className="flex items-center border-[1px] rounded-[10px] border-gray-600 p-1.5">
                <i class='bx bx-bell' style={{ color: 'white', fontSize: "20px" }}></i>
            </div>
        </div>
    )
}