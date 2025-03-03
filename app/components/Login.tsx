import { Dispatch, SetStateAction, useState } from "react";
import { login } from "../lib/firebaseConfig";
import SplitText from "./SplitText";
import { useRouter } from "next/navigation";


interface LoginProps {
  setGlitchColors: Dispatch<SetStateAction<string[]>>
}
    
export default function Login({setGlitchColors}: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const accept: string[]= ['#6cff32','#34b800','#49ff00']
    const deny: string[]= ['#ff0000','#ba0000','#ff3737']

    const router = useRouter();
  
    const handleLogin = async (email: string, password: string) => {
      const user = await login(email, password)
      if(user){
        setGlitchColors(accept)
        setTimeout(() => {
        router.push("protected/home")
        },5000)
      }else{
        setGlitchColors(deny)
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleLogin(email, password);
    };
  
    // const handleSignOut = () => {
    //   logout()
    // }

    return(
            <form onSubmit={handleSubmit} className="fixed z-50 flex flex-col p-20 gap-5 bg-black bg-opacity-50 border border-white rounded-lg">
                <SplitText text={"Welcome"}/>
            <input 
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)} 
                className="p-2 bg-black border-2 border-gray-600 rounded"
                />
                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)} 
                className="p-2 bg-black border-2 border-gray-600 rounded"
                />
                <button 
                type="submit"
                className="p-2 bg-blue-600 rounded text-white"
                >
                Login
                </button>
            </form>
    )
}
