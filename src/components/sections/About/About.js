import React from "react";

import Section from "../../../HOC/Section";
import aboutImage from "../../../assets/img/about.jpg";

const about = () => {
  return (
    <Section id="about">
      <div className="container pt-2 pb-5">
        <div className="section-header pt-5 pb-5 text-center"></div>
        <div className="section-content">
          <div className="row">
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="aboutImage">
                <img src={aboutImage} alt="about company" />
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <h3 className="about-title">COMPANY PROFILES</h3>
              <div className="about-description">
                <p>
                  Trade Al is the world's leading provider of artificial
                  intelligencetechnology for global trade compliance. Using
                  Trade Ai's SAASsoftware, clients across all global trade
                  industry verticals canautomate the complex and time consuming
                  tasks of globaltrade compliance. from large multinational
                  corporations tolaw firms and logistics companies, Trade Al is
                  making globaltrade smarter, faster, and easier for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default about;
