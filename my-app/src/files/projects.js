import React, { Component, useState} from 'react'
import PropTypes from 'prop-types'
import work from '../assests/images/work.svg'
import '../App.css'

export class projects extends React.Component {
    static propTypes = {

    }

    constructor(props) {
        super(props)
        this.state = { 
            x : [ ],
            y : [ ]
        }
    }

    _onMouseMove = function showCoords(event) {
        var xq = event.clientX;
        var yq = event.clientY;
        var ox = (event.nativeEvent.offsetX/xq) * 100;
        var oy = (event.nativeEvent.offsetY/yq) * 100;
        // console.log(ox, oy)
        // this.setState({
        //     x : ox,
        //     y : oy
        // })
        // var [state, setState] = useState({
        //     x : ox,
        //     y : oy
        // })
    }

    render() {
        const {text} = this.props;
        const {x, y} = this.state;
        const maskStyle = {
            '--maskX' : x,
            '--maskY' : y
        }
        return (
            <div>
            <h1>PROJECTS</h1>
                <div className="project pro">
                <ul className="pro-det" onMouseMove = {this._onMouseMove} ref="project" style={maskStyle}>

                <li className="">
                <a  href="https://biswat.github.io/med_pharm/"><b>MED PHARM</b></a> <br />
                a medical e-commerce site, which have a aim to provide a better service as compired to other such examples
                </li>

                <li className="">
                <a href="https://github.com/biswat/protein_analysis"><b>PROTEIN ANALYSIS</b></a> <br />
                a protein analysis tool which gives a details analysis report on a protein sequence, like that of other protein analysis tool
                </li>
                </ul>
                </div>
                <img className="project img" src={work} alt="" />
            </div>
        )
    }
}

export default projects
