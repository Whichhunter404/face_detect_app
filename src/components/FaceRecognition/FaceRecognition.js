import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({input,box}) =>{
    return (
        <div className={'center ma'}>
            <div className={'border absolute mt5'}>
                <img alt={'detecting img'} id={'inputimage'} src={input} style={{width : '500px'}} />
                <div className={'bounding-box'} style={{top: box.topRow , right: box.rightCol, bottom: box.bottomRow,left: box.leftCol}}></div>
            </div>
    </div>
    )
}
export default FaceRecognition;
