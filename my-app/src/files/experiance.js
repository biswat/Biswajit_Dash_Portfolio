import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'
import img from '../assests/images/spark.png'

export class experiance extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
            <h1>EXPERIANCE</h1>
            
            <div className="exp" id="experiance">
                <div className="experiance">
                    <p>I feel blessed to share my work with following companies</p>
                    <img  src={img} alt="" />
                </div>
                <div className="experiance">
                <b>HACKATHONS EXPERIANCE</b>
                <ul className="hack">
                <li>1st Runner Up in <a href="">DelhiHacks Hackathon</a></li>
                <li>Participant in <a href="">GarudaHacks Hackathons</a></li>
                <li>Participant in <a href="">HakinCodes Hackathons</a></li>
                </ul>
                </div>
            </div>
            </div>
        )
    }
}

export default experiance
