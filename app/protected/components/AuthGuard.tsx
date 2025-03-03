import Link from "next/link";

export default function authGuard(){

    return (
    <div className="text-white">
        <p className="font-semibold text-xl text-red-500">You are trying to access a PRIVATE PAGE!</p>
        <Link href={'/'}>Login</Link>
    </div>
    )
}