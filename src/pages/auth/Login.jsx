import { Link } from "react-router-dom";

export default function Login(){
    return(
        <>
            <main className="bg-white w-full h-screen max-h-screen flex">
                {/* Left Section */}
                <div className="flex relative flex-col justify-center items-center w-full gap-6 bg bg-[url(../public/assets/login-bg.png)] bg-contain bg-no-repeat bg-center z-0">
                    <Link to="/" className="left-4 top-4 absolute"><img src="../public/assets/logo-sidoarjo.png" className="w-11  " alt="" /></Link>

                    <div className="flex flex-col justify-center items-center gap-7">
                        <p className="text-6xl font-semibold text-[#0C4834]">Log in</p>
                        <p className="text-xl text-slate-800">Login with registered Account</p>
                    </div>
                    <form className="w-2/3 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-slate-800">Email</label>
                            <input type="text" className="py-2 pl-1 rounded-md bg-white border text-slate-800" />
                        </div>
                        <div className="flex flex-col ">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-slate-800">Password</label>
                                <a href="">Forgot your Password?</a>
                            </div>
                            <input type="text" className="py-2 pl-1 rounded-md bg-white border text-slate-800" />
                        </div>
                        <button className="bg-[#0C4834] hover:bg-[#789A48] transition-all">Log In</button>
                    </form>
                    
                    <Link to={'/'} className="text-slate-700">Dont have Account? <span className="underline text-blue-500">Sign Up</span></Link>
                </div>

                {/* Right Section */}
                <div className="flex flex-col justify-center items-center w-full bg-[url(../public/assets/hero-right-login.png)] bg-cover bg-center relative">
                    <div className="absolute h-full w-full bg-black opacity-35"></div>
                    <div className="flex flex-col z-30  mx-24 items-center gap-12">
                        <p className="text-4xl text-center font-semibold">Embrace the Wisdom of Tradition for a Modern Life</p>
                        <p className="text-xl text-center px-7">Discover the power of natural ingredients, time-honored recipes, and sustainable living. From traditional herbal remedies to nutritious local dishes, unlock a healthier lifestyle inspired by Indonesia's rich culture.</p>
                    </div>
                </div>
            </main>  
        </>
    )
}