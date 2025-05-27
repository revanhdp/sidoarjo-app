import { Link } from "react-router-dom";

export default function Register(){
    return(
        <>
            <main className="relative bg-white min-h-screen w-full justify-center items-center max-h-screen flex bg-[url('../public/assets/login-bg.png')] bg-no-repeat bg-center overflow-hidden">
                <Link to="/"><img src="../public/assets/logo-sidoarjo.png" className="absolute left-4 top-4 w-11" alt="" /></Link>
                <div className="flex flex-col w-1/3 text-slate-800 gap-5 ">
                    <p className="text-center text-6xl">Sign Up</p>
                    <p className="text-center">Already have Account? <Link to="/login">Log In Here </Link></p>
                    <form className="w-full flex flex-col gap-7">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-slate-800">Name</label>
                            <input type="text" className="py-2 pl-1 rounded-md bg-white border text-slate-800 border-slate-400" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-slate-800">Email</label>
                            <input type="text" className="py-2 pl-1 rounded-md bg-white border text-slate-800 border-slate-400" />
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="password" className="text-slate-800">Password</label>
                            <input type="text" className="py-2 pl-1 rounded-md bg-white border text-slate-800 border-slate-400" />
                        </div>
                        <button className="bg-[#0C4834] hover:bg-[#789A48] transition-all w-full text-white">Log In</button>
                    </form>
            
                </div>
            </main>
        </>
    )
}