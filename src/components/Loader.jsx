import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {

    return (

        <div className="w-full h-screen flex items-center justify-center">

            <AiOutlineLoading3Quarters
                className="animate-spin text-4xl text-indigo-600"
            />

        </div>

    );
};

export default Loader;