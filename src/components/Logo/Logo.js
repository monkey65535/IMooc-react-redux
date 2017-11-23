import React, {Component} from 'react';
import logoImg from './job.png';

class Logo extends Component {
    render() {
        return (<div>
            <div className="logo-container" style={{textAlign:'center'}}>
                <img src={logoImg} alt="" width='120' height='120' style={{margin:'20px'}}/>
            </div>
        </div>)
    }
}

export default Logo;