import React from 'react';


const Rank = ({user}) =>{
    return (
        <div>
            <div className={'white f3 center'}>
                {"You are so handsome: "+user.name}
                <br />
                    {"Your entries number: "+user.entries}
            </div>
        </div>
    )
}
export default Rank;