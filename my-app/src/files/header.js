import React from 'react'
import '../App.css'
import img from '../assests/images/half.svg'

export default function header() {


    

   var mouseOn = 
         function showCoords(event) {
        var x = event.clientX;
        var y = event.clientY;
        var ox = (event.nativeEvent.offsetX/x) * 100;
        var oy = (event.nativeEvent.offsetY/y) * 100;
        console.log(ox, oy)
        // console.log(x, y)
    //     this.setState ({
    //         x : ox,
    //         Y : oy,
    //     })
    //     this.state = {
    //     x : 0,
    //     y: 0,
    // }
        // const maskStyle = {
        //     '--maskX' : x,
        //     '--maskY' : y,
        // }
   }



   var mouseOut = function clearCoor() {
        console.log("your mouse is out now ...")
        document.getElementById("demo");
  }
      
    return (
        <div>
        <div className="head" onMouseMove= {mouseOn} onMouseOut= {mouseOut}>
        
            <ul className="list">
                <li> <h1 style={{fontSize: '3.5vw'}}>Biswajit_Dash</h1> </li>
                <li> <b style={{fontSize: '1.7vw'}}>Education</b> </li>
                <li> <b style={{fontSize: '1.7vw'}}>Projects</b> </li>
                <li> <b style={{fontSize: '1.7vw'}}>Experience</b> </li>
            </ul>
            <p> <b><marquee behavior="scroll" direction="left" class="add">hay! i am Biswajit Dash a web developer, loved to work with javascript</marquee></b> </p>
        </div>
        <h1>EDUCATION</h1>
        <div>
        
        <img className="edu" src={img} alt="" />
        <div className="edu det" style={{fontSize:'1.26vw'}}>
        <ul className="edu_list" style={{width: "30%",}}>
        <li><b style={{fontSize: '1.2vw'}}>2014-2015</b></li><br /><br />
        <li><b style={{fontSize: '1.2vw'}}>2015-2018</b></li><br /><br />
        <li><b style={{fontSize: '1.2vw'}}>2018-2021</b></li>
        </ul>
        <ul className="edu_list data" style={{width: "70%"}}>
        <li><b><a href="https://svncuttack.org/" style={{fontSize: '1.2vw'}}>Suddhananda Vidyalaya</a></b>
        <p style={{fontSize: '1.2vw'}}>In class X : I scored 9.0 CGPA in CBSE board</p>
        </li>

        <li><b><a href="http://www.bjemschool.org/" style={{fontSize: '1.2vw'}}>BJEM school</a></b>
        <p style={{fontSize: '1.2vw'}}>In class XII : I scored 58% in CBSE board</p>
        </li>

        <li><b><a href="http://www.bjbcollege.in/" style={{fontSize: '1.2vw'}}>BJB Autonomous College</a></b>
        <p style={{fontSize: '1.2vw'}}>Currently : I am studying IMSc. BI (Bioinformatics)</p>
        </li>
        </ul>
        <div style={{}}>
        <h2 className="edu_codeSkill" style={{fontSize: '1.2vw'}}> <b>Coding Skill :</b> </h2>
        <p className="edu_codeSkill" style={{fontSize: '1.2vw'}}>HTML and CSS from <a href="https://progate.com/course_certificate/ec54a480qirkuz">Progate</a></p>

        <p className="edu_codeSkill" style={{fontSize: '1.2vw'}}>JavaScript from <a href="https://courses.learncodeonline.in/learn/search?show=all&type=100&search=javascript">LCO</a></p>

        <p className="edu_codeSkill" style={{fontSize: '1.2vw'}}>React JS ( Ongoing... )</p>
        </div>
            </div>

        </div>

        
        </div>
        
    )
}