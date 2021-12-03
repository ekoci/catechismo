import React, { useState } from 'react';

const Example = (url) => {
    return ( <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" style={{width: 200 + "vh", height: 60 + "vh"}}>
                <div className="carousel-item active">
                    <img style={{width: 210 + "vh", height: 60 + "vh"}} src={`data:image/jpeg;base64,${url.img}`}
                    alt="First slide"/>
                </div>
            </div>
        </div>
    );
}

export default Example;