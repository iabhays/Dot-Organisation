import React from "react";
import '../style/base/Image.css';

const Image = ({src ,width, height}) => {

    return (
        <img className="image" 
        style={{
            width:`${width}`,
            height:`${height}`
        }}
        src={src} />
    );
}

export default Image;