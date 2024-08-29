import "../../css/style.css";
import { Link } from 'react-router-dom';

export function Header ({titulo}) {
    return (
        <div className="flex items-center justify-around w-full h-[8vh]">
                <Link to={-1}>
                    <i className='bx bxs-chevron-left' style={{color: "white"}}></i>
                </Link>
                <strong className="text-white">{titulo}</strong>
                <i className='bx bx-dots-vertical-rounded' style={{color: "white"}}></i>
        </div>
    )
}