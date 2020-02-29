import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import  Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const particlesOptions = {
    polygon: {
        number: {
          value: 100,
          density: {
              enable: true,
              value_area: 50
          }
        },

        enable: false,
        type: 'inside',
        move: {
            radius: 1
        },
        url: 'path/to/svg.svg'
    }

};

const app = new Clarifai.App({
    apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});

class App extends Component{
    constructor(){
        super();
        this.state = {
            input_img: '',
            box: {},
            route : 'signin',
            signin: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries:  0,
                joined: ''
            }
        }
    }
    componentDidMount() {
        /*fetch(process.env.REACT_APP_SERVER_URL).then(res=>
            res.json()).then(users => console.log(users));*/
    }

    loadUser = (user) => {
        this.setState({user: {
             id: user.id,
             name: user.name,
             email: user.email,
             entries: user.entries,
             joined: user.joined
        }})
    }

    onInputChange = (event)=>{
        this.setState({input_img: event.target.value})
    }
    calculateFaceLocation = (data) =>{
        const calrifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return{
            leftCol: calrifaiFace.left_col* width,
            topRow: calrifaiFace.top_row * height,
            rightCol: width-(calrifaiFace.right_col*width),
            bottomRow: height-(calrifaiFace.bottom_row*height)

        }
    }
    displayFaceBox = (box) =>{
        this.setState({box:box})
    }

    onButtonSubmit = () =>{
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input_img).then(response =>
                this.displayFaceBox(this.calculateFaceLocation(response))).catch(
        );
        fetch(process.env.REACT_APP_SERVER_URL.concat('/image'),{
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        }).then(response => response.json())
            .then(
            entries => {this.setState({user: {
                    id: this.state.user.id,
                    joined : this.state.user.joined,
                    email: this.state.user.email,
                    name: this.state.user.name,
                    entries : entries
            }})})
    }
    onRouteChange = (route) =>{
        if(route === 'home'){
            this.setState({signin:true,route:route})
        }
        else if(route==='signin'||route==='register'){
            this.setState({signin:false,route:route})
        }
        this.setState({route : route})
    }

    render() {
        const {signin,box,input_img,route,user} = this.state;
        switch (this.state.route) {
            case 'register':
                return (
                    <div className="App">
                        <Particles className={'particles'} params={particlesOptions}
                                   style={{width: '100%', height: '100%'}}/>
                        <Navigation onRouteChange={this.onRouteChange} signin={signin} route={route}/>
                        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                    </div>
                );
            case 'signin':
                return (
                    <div className="App">
                        <Particles className={'particles'} params={particlesOptions}
                                   style={{width: '100%', height: '100%'}}/>
                        <Navigation onRouteChange={this.onRouteChange} signin={signin} route={route}/>
                        <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                    </div>);
            case 'home':
                return (
                    <div>
                        <Particles className={'particles'} params={particlesOptions}
                                   style={{width: '100%', height: '100%'}}/>
                        <Navigation onRouteChange={this.onRouteChange} signin={signin} route={route}/>
                        < Logo/>
                        < Rank user={user}/>
                        < ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                        <FaceRecognition input={input_img} box={box}/>
                    </div>
                );
            default:
                return (
                    <div className={'App'}>
                        <Particles className={'particles'} params={particlesOptions}
                                   style={{width: '100%', height: '100%'}}/>
                        <p className={'fa1 center'}>This page is not available</p>
                    </div>
                );
        }
    }
}

export default App;
