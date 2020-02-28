import React from 'react';

const Navigation = ({onRouteChange,signin,route}) => {
    if(signin===true) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className="fa3 link pa3 underline pointer" onClick={()=>onRouteChange('home')}>Home</p>
                <p className="fa3 link pa3 underline pointer" onClick={()=>onRouteChange('signin')}>Sign out</p>
            </nav>
        )
    }
    else{
        if(route==='register'){
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className="fa3 link pa3 underline pointer" onClick={()=>onRouteChange('signin')}>Sign in</p>
                </nav>
            )
        }
        else if(route==='signin'){
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className="fa3 link pa3 underline pointer" onClick={()=>onRouteChange('register')}>Register</p>
                </nav>
            )
        }
        else {
            return( <nav></nav>)
        }
    }
}
export default Navigation;