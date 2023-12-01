import React from "react";

import Section from "../../../HOC/Section";

const Service = () => {
  return (
    <Section id="services">
      <div className="container pt-2 pb-5">
        <div className="section-header pt-5 pb-5 text-center">
          <h3 className="">
            Product Introduction- Global TradeCompliance Management (GTM)
          </h3>
          {/*<h6 className='section-subtitle mr-auto ml-auto'>
            Individualized quality care that meets the total needs of the
            patient Individualized quality care that quality care that
            Individualized quality care that meets the total.
          </h6>*/}
        </div>
        <div className="section-content">
          <div className="row">
            <div className="col-md-6 col-lg-4 mb-3">
              <div className="service-box d-flex">
                <div className="service-icon mr-4">
                  <i className="fas fa-briefcase" />
                </div>
                <div className="service-body">
                  <h5 className="service-title">Risk Assessment</h5>
                  <p className="service-description">
                    Al assesses transaction risk using origin,
                    destination,product, andregulations data, reducing
                    non-compliance risk.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-3">
              <div className="service-box d-flex">
                <div className="service-icon mr-4">
                  <i className="fas fa-chart-bar" />
                </div>
                <div className="service-body">
                  <h5 className="service-title">Classification</h5>
                  <p className="service-description">
                    Al automates HS code classification, avoiding
                    misclassification and penalties in global trade.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-3">
              <div className="service-box d-flex">
                <div className="service-icon mr-4">
                  <i className="fas fa-fist-raised" />
                </div>
                <div className="service-body">
                  <h5 className="service-title">Screening</h5>
                  <p className="service-description">
                    Al screens transaction parties against watchlists to avoid
                    prohibited or restricted business interactions.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-3">
              <div className="service-box d-flex">
                <div className="service-icon mr-4">
                  <i className="far fa-paper-plane" />
                </div>
                <div className="service-body">
                  <h5 className="service-title">Documentation</h5>
                  <p className="service-description">
                    Al automates trade document creation ensuring accuracy,
                    completeness,and compliance with regulations.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-3">
              <div className="service-box d-flex">
                <div className="service-icon mr-4">
                  <i className="fas fa-gem" />
                </div>
                <div className="service-body">
                  <h5 className="service-title">Monitoring</h5>
                  <p className="service-description">
                    Al monitors transactions flags anomalies for
                    investigation,preventing fraud and non-compliance risks in
                    real-time.
                  </p>
                </div>
              </div>
            </div>
           {/* <div className="col-md-6 col-lg-4 mb-3">
              <div className="service-box d-flex">
                <div className="service-icon mr-4">
                  <i className="far fa-life-ring" />
                </div>
                <div className="service-body">
                  <h5 className="service-title">Suppport Team</h5>
                  <p className="service-description">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Service;
