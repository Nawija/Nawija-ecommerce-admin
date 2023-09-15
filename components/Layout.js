import Nav from "@/components/Nav";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Layout({ children }) {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className="bg-gray-800 w-screen h-screen flex-c">
                <button
                    onClick={() => signIn("google")}
                    className="bg-white p-2 rounded-lg flex-sc"
                >
                    <FcGoogle className="text-2xl mr-2" />
                    <span>Zaloguj przez Google</span>
                </button>
            </div>
        );
    }
    return (
        <div className="bg-gray-800 w-screen text-white min-h-screen flex ">
            <Nav />
            <div className="my-4 mr-4 rounded-lg p-6 bg-gray-100 flex-grow text-main relative">
                {children}
            </div>
        </div>
    );
}
