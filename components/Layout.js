import Nav from "@/components/Nav";
import { useSession, signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";

export default function Layout({ children }) {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className="bg-gray-800 w-screen h-screen flex-c">
                <div className="bg-white p-20 text-center shadow-2xl rounded-lg flex flex-col">
                    <p className="text-h2">Zaloguj sie:</p>
                    <button
                        onClick={() => signIn("google")}
                        className="bg-white p-2 rounded-lg flex-sc border mt-4 hover:opacity-70 transition-opacity"
                    >
                        <FcGoogle className="text-2xl mr-2" />
                        <span>Zaloguj z Google</span>
                    </button>
                    <button
                        onClick={() => signIn("facebook")}
                        className="bg-blue-600 text-white p-2 rounded-lg flex-sc border mt-4 hover:opacity-70 transition-opacity"
                    >
                        <GrFacebookOption className="text-2xl mr-2" />
                        <span>Połacz Facebook</span>
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-gray-800 w-screen text-white min-h-screen flex ">
            <Nav />
            <div className="my-4 mx-4 lg:ml-0 lg:mr-4 rounded-lg p-6 bg-gray-100 flex-grow text-main relative">
                {children}
            </div>
        </div>
    );
}
