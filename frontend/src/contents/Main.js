import React from 'react'
// import { useLocation } from 'react-router-dom';

export default function Main(props) {

    // const name = useLocation().state.name;

    console.log(props.name)

    return (
        <div>
            <p>this page Main Hello {props.name} </p>
        </div>
    )
}