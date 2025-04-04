import { HeaderIndex } from "../components/headerIndex";
import { NowPlaying } from "../components/nowPlaying";
import { CoomingSoon } from "../components/coomingSoon";
import { FooterIndex } from "../components/footerIndex";

export function Index () {
    return (
        <>
            <div className="w-[80vw] h-[15vh] flex flex-col justify-between">
                <HeaderIndex />
                <div className="border-[1px] border-white rounded-[10px] flex items-center p-4">
                    <i className='bx bx-search' style={{color: "white", fontSize: "20px"}}></i>
                    <input type="text" placeholder="Search movie, cinema, gender..." className="px-2 border-none focus:outline-none"/>
                </div>
            </div>
            <NowPlaying />
            <CoomingSoon />
            <FooterIndex />
        </>
    )
}