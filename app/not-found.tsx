import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const FourOFourPage = async () => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return (
        <div className="">
            <Navbar user={user} />
            <div className="flex flex-col min-h-[85vh] mx-auto justify-center items-center size-full">
                <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                    <h1 className="block text-7xl font-bold sm:text-9xl dark:text-white">404</h1>
                    <p className="text-gray-600 dark:text-neutral-400">Sorry, we couldn't find that page.</p>
                    <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                        <Link href="/">
                            <Button >Go back home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FourOFourPage;