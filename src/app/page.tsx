import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  text-white bg-black p-24 gap-3" >
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-5xl md:text-8xl    ">
        Welcome<br/>
      </h1> 
     <span className="md:text-6xl   text-5xlitems-start mt-5   text-5xl">To</span> <br/>
      <span className="text-white  text-5xl lg:text-8xl"> <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">N</span >extjs</span>
      <div className="mt-12 text-xl flex w-fit ">

        
        <button className=" bg-blue-300 hover:bg-blue-500  text-black font-bold py-1 px-4 rounded ">
          <Link href={"./login"}>Login</Link>
        </button>
      </div>
   
    </main>
  );
}
