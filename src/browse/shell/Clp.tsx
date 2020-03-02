import React from 'react';
import './Clp.scss';
import { useParams } from 'react-router';

export default function Clp() {

    let { nvalue } = useParams();
    return (
        <div>
            CLP Shell
        </div>
    )    
}