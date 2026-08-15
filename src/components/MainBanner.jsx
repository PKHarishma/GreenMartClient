import { assets } from "../assets/assest";
import { Link } from "react-router-dom";
const MainBanner=()=>{
    return(
        <div className="relative">
            <img src={assets.mainBanner} alt="mainbanner" className="hidden sm:block w-full"/>
            <img src={assets.mainBanner_sm} alt="mainbanner" className="block sm:hidden w-full" />
            <div className="absolute top-1/2 sm:top-1/4 px-10 sm:px-20  cl text-primary">
                <h1 className="text-3xl sm:text-6xl">Freshness You Can Trust,</h1>
                <h1 className="text-3xl sm:text-6xl  mb-5">Savings you will Love</h1>
                <Link to='/products' className="bg-primary text-white border rounded-full px-4 py-2 text-2xl my-6">Shop Now</Link>
            </div>
        </div>
    )
}
export default MainBanner;