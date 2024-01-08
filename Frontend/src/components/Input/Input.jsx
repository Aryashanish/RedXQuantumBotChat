import React from "react";

function Input(props){
    return (
        <>
            <input
                className="p-1 w-full border-2 drop-shadow-md rounded-md my-1"
                type={props.type}
                placeholder={props.placeholder}
                name={props.name} 
                onChange={props.onChange}
            />
        </>
    )
}
export default Input;