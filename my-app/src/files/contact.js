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
        function validation() {
            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var phone = document.getElementById("phone").value;
            var message = document.getElementById("message").value;
            var text ;
            var error = document.getElementById("error")

            if(name.length < 5) {
                text = "Please enter a valid name";
                error.innerHTML = text;
                return false
            }
            if(email.indexOf("@") == -1 || email.length < 6) {
                text = "Please enter a valid email-";
                error.innerHTML = text;
                return false
            }
            if(isNaN(phone) || phone.length != 10) {
                text = "Please enter a valid phone number";
                error.innerHTML = text;
                return false
            }
            if(message.length <= 10) {
                text = "Please enter more than 10 character";
                error.innerHTML = text;
                return false
            }
            alert("Form Submitted Successfully")
            return true


        }
        return (
            <div>
            <h1>CONTACT ME</h1>
                <div className="contact" id="contact">
                    <b>You can contact me by : -</b>
                    <ul className="cont">
                    <li><a href="https://github.com/biswat"><img src={github} alt="" /></a></li>
                    <li><a href="https://biswajit.18.dash@gmail.com"><img src={gmail} alt="" /></a></li>
                    <li><a href="https://www.linkedin.com/in/biswajit-dash-20799b175/"><img src={linkedin} alt="" /></a></li>
                    <li><a href="https://www.instagram.com/biswajit.18/"><img src={instagram} alt="" /></a></li>
                    <li><a href=""><img src={whatsapp} alt="" /></a></li>
                    </ul>
                    <form action="https://formspree.io/f/mgerrnnb" method="POST" className="cont-form" onSubmit={validation}>
                    <div id="error"></div>
                    <input type="text" name="name" id="name" placeholder="Full name"/><br />
                    <input type="text" name="email" id="email" placeholder="Email Id" /><br />
                    <input type="text" id="phone" placeholder="Contact No."/><br />
                    <textarea name="message" id="message" cols="30" rows="10" placeholder="Type your message here"></textarea><br />
                    <input type="submit" />
                    
                    </form>
                </div>
            </div>
        )
    }
}

export default contact
