import { deleteRecord, getRecords } from '@/utils/recordsFunctions';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import { useRouter } from "next/router";

const MainPage = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRecords = async () => {
        try {
            const response = await getRecords();

            setData(response);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);    
        }

    }

    const handleDeleteRecord = async (id) => {
        try {
            const response = await deleteRecord(id);

            if (response?.acknowledged) {
                const newData = data.filter((el) => el._id !== id);
        
                setData(newData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditRecord = (id) => {
        router.push(`/edit?id=${id}`);
    }

    const handleCreate = () => {
        router.push("/create");
    }

    useEffect(() => {
        fetchRecords();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <h1 className="mb-4 p-4 text-2xl text-center font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-5xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-l to-pink-600 from-indigo-400">Gradina Zoologica</span>
            </h1>
            <div className="p-4">
                <button 
                        type="button" 
                        onClick={handleCreate}
                        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Add animal
                </button>
            </div> 
        <div className="p-4 flex flex-wrap gap-4">
            {data?.map((record) => (
                <div key={record._id} className="max-w-sm p-6 bg-white border border-emerald-500 rounded-lg shadow-lg dark:bg-black-800 dark:border-black-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {record.name}
                    </h5>
                    <p className="mb-3 font-normal text-black-700 dark:text-gray-400">
                        {record.description}
                    </p>
                    <p className="mb-3 font-normal text-black-700 dark:text-gray-400">
                        {record.country}
                    </p>
                    <p className="mb-3 font-normal text-black-700 dark:text-gray-400">
                        {record.life}
                    </p>
                    <button 
                        type="button" 
                        onClick={() => handleEditRecord(record._id)}
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Update animal
                    </button>
                    <button 
                        type="button" 
                        onClick={() => handleDeleteRecord(record._id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Delete animal
                    </button>
                </div>
            ))};
        </div>
        </div>
        
    );
};

export default MainPage;