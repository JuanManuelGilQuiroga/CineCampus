import { Link } from 'react-router-dom';
import "../../css/style.css";

export function Header ({titulo}) {
    return (
        <div className="bg-transparent flex items-center justify-around w-full h-[8vh]">
                <Link to={titulo == "Ticket" ? `/`: -1} className='bg-transparent'>
                    <i className='bx bxs-chevron-left' style={{color: "#9CA3AF", background: "transparent"}}></i>
                </Link>
                <strong className="text-custom-gray-9CA3AF bg-transparent">{titulo}</strong>
                <i className='bx bx-dots-vertical-rounded' style={{color: "#9CA3AF", background: "transparent"}}></i>
        </div>
    )
}