import React, { useEffect } from 'react';
import './Home.scss';
import { useSelector } from 'react-redux';
import { InitialDataModel } from '../shared';

export default function Home() {
    
    const initialData: InitialDataModel = useSelector((state: any) => state.initialDataReducer);

    useEffect(() => {
        fetch('/ws/home?format=json')
            .then(results => {
                return results.json();
            }).then(data => {
                console.log(data);
            })
    })

    return (
        <div>
            <h3>Home</h3> - {initialData.email}
        </div>
        
        
    )
}