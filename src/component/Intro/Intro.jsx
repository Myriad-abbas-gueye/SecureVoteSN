import React from "react";
import "./Intro.css";

const Intro = () => {


  return (
    <div className="Intro" id="Intro">
      {/* left name side */}
      <div className="i-left">
        <div className="i-name">
          {/* yahan change hy darkmode ka */}
          <span>SecureVoteSN</span>
          <span>
            Site de vote electoral sure et fiable pour des resultats authentique et 
            rapide.
          </span>
        </div>
      </div>
      {/* right image side */}
      <div className="i-right">
        {/*<img src={} alt="" />*/}
        <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
        <div
          className="blur"
          style={{
            background: "#C1F5FF",
            top: "17rem",
            width: "21rem",
            height: "11rem",
            left: "-9rem",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Intro;