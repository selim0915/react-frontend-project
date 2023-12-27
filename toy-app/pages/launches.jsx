import React, { useEffect, useState } from 'react'

export default function Launches() {
    const [data, setData] = useState(null);

    useEffect(()=>{
        const feactLaunches = async () => {
            const res = await fetch('https://api.spacexdata.com/v3/launches');
            const data = await res.json();

            setData(data);
            
        }
        feactLaunches();
    }, [])

    if(data === null){
        return null;
    }

    return (
        <div>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.mission_name}</li>
                ))}
            </ul>
        </div>
    )
}