import React from 'react';


const Rank = ({name,entries}) =>{
    return (
        <div>
            <div className={'white f3 center'}>
                {"You are so handsome: "+name}
                <br />
                    {"Your entries number: "+entries}
            </div>
        </div>
    )
}
export default Rank;