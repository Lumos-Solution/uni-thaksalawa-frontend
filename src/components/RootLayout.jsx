import React from "react";
import {Outlet} from "react-router-dom";
import {Navigation} from "./Naviagtions.tsx";


const RootLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">

            <aside className="w-64 bg-gray-800 text-white">
                <Navigation/>
            </aside>


            <div className="flex flex-col flex-1">

                <main className="flex-1 p-6 overflow-auto bg-white">
                    <Outlet/>
                </main>

            </div>


        </div>
    );
};

export default RootLayout;
