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
        <h1 className="h1">Biswajit_Dash</h1>
            <ul className="list">
                <li> <b className="h2">Education</b> </li>
                <li> <b className="h2">Projects</b> </li>
                <li> <b className="h2">Experience</b> </li>
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
        <li><b><a href="https://svncuttack.org/" >Suddhananda Vidyalaya</a></b>
        <p >In class X : I scored 9.0 CGPA in CBSE board</p>
        </li>

        <li><b><a href="http://www.bjemschool.org/" >BJEM school</a></b>
        <p >In class XII : I scored 58% in CBSE board</p>
        </li>

        <li><b><a href="http://www.bjbcollege.in/" >BJB Autonomous College</a></b>
        <p >Currently : I am studying IMSc. BI (Bioinformatics)</p>
        </li>
        </ul>
        <div style={{}} className="skill">
        <div className="edu_codeSkill" > <b>Coding Skill :</b> </div>
        <p className="edu_codeSkill">HTML and CSS from <a href="https://progate.com/course_certificate/ec54a480qirkuz">Progate</a></p>
        <p className="edu_codeSkill">JavaScript from <a href="https://courses.learncodeonline.in/learn/search?show=all&type=100&search=javascript">LCO</a></p>
        <p className="edu_codeSkill">React JS ( Ongoing... )</p>
        </div>
            </div>

        </div>

        
        </div>
        
    )
}