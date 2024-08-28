import "../../css/style.css"

export function FooterIndex () {
    return (
        <div className="flex fixed bottom-0 items-center justify-around w-full h-[12vh] bg-custom-black-232323 rounded-tl-3xl rounded-tr-3xl">
            <div className="flex flex-col items-center bg-transparent">
                <i className='bx bxs-home' style={{ color: '#FE0000', fontSize: "20px", background: "transparent" }}></i>
                <span className="text-custom-red bg-transparent">Home</span>
            </div>
            <div className="flex flex-col items-center bg-transparent">
                <i class='bx bx-search' style={{ color: 'white', fontSize: "20px", background: "transparent" }}></i>
                <span className="text-white bg-transparent">Search</span>
            </div>
            <div className="flex flex-col items-center bg-transparent">
                <i class='bx bxs-coupon' style={{ color: 'white', fontSize: "20px", background: "transparent" }}></i>
                <span className="text-white bg-transparent">Tickets</span>
            </div>
            <div className="flex flex-col items-center bg-transparent">
                <i class='bx bxs-user-circle' style={{ color: 'white', fontSize: "20px", background: "transparent" }}></i>
                <span className="text-white bg-transparent">Profile</span>
            </div>
        </div>
    )
}