import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'
import gmail from '../assests/images/gmail.svg'
import linkedin from '../assests/images/linkedin.svg'
import instagram from '../assests/images/instagram.svg'
import whatsapp from '../assests/images/whatsapp.svg'
import github from '../assests/images/github.svg'

export class contact extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
            <h1>CONTACT ME</h1>
                <div className="contact">
                    <b>You can contact me by : -</b>
                    <ul className="cont">
                    <li><a href=""><img src={github} alt="" /></a></li>
                    <li><a href=""><img src={gmail} alt="" /></a></li>
                    <li><a href=""><img src={linkedin} alt="" /></a></li>
                    <li><a href=""><img src={instagram} alt="" /></a></li>
                    <li><a href=""><img src={whatsapp} alt="" /></a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default contact
