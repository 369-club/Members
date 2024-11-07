import 'lity';
import 'lity/dist/lity.min.css';
import React from 'react';
import { Card, CardBody } from './../../components/card/card.jsx';

function Profile() {
  return (
    <Card>
      <CardBody className="p-0">
        <div className="profile">
          <div className="profile-container">
            <div className="profile-sidebar">
              <div className="desktop-sticky-top">
                <div className="profile-img">
                  <img src="/assets/img/user/profile.jpg" alt="" />
                </div>

                <h4>Gislain Armand</h4>
                <div className="mb-3 text-inverse text-opacity-50 fw-bold mt-n2">@GTA</div>
                <div className="mb-1">
                  <i className="fa fa-map-marker-alt fa-fw text-inverse text-opacity-50"></i> Montreal, QC, Canada
                </div>
                <div className="mb-3">
                  <i className="fa fa-link fa-fw text-inverse text-opacity-50"></i> randmar.io
                </div>

              </div>
            </div>

            <div className="profile-content">
              <ul className="profile-tab nav nav-tabs nav-tabs-v2">
                <li className="nav-item">
                  <div className="nav-link active" data-bs-toggle="tab">
                    <div className="nav-field">Total Spent</div>
                    <div className="nav-value">200.00$</div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link" data-bs-toggle="tab">
                    <div className="nav-field">Last Event</div>
                    <div className="nav-value">October 8th</div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link" data-bs-toggle="tab">
                    <div className="nav-field">Tier</div>
                    <div className="nav-value">Premium</div>
                  </div>
                </li>
              </ul>
              <div className="profile-content-container">
                <div className="row gx-4">
                  <div className="col-xl-12">
                    <div className="tab-content p-0">
                      <div className="tab-pane fade show active" id="profile-post">
                        <Card className="mb-3">
                          <CardBody>

                            <p>
                              A seasoned software engineer with a diverse portfolio including e-commerce,
                              cryptocurrencies, aerospace, medical file management, and automation of legal processes.
                              <br /><br />
                              In 2016, Gislain joined Randmar where he started implementing his vision, now allowing
                              Manufacturers from multiple industries to work directly with Resellers.
                              <br /><br />
                              You will always find him exploring a new section of the world and he believes in "doing
                              something different every single day.
                            </p>

                          </CardBody>
                        </Card>

                        <h4>Resent events</h4>

                        <Card className="card mb-3">
                          <CardBody>
                            <h5>Exclusive invitation</h5>
                            <div className="profile-img-list">
                              <div className="profile-img-list-item main"><a href="/assets/img/gallery/gallery-1.jpg" data-lity className="profile-img-list-link"><span className="profile-img-content" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-1.jpg)' }}></span></a></div>

                              <Card className="mb-3">
                                <CardBody>
                                  <p>
                                    Emile and Gislain are starting a Club with the objective of elevating its members.
                                    <br /><br />
                                    The conversation will be guided towards your ambition and the lifestyle you want for yourself.
                                  </p>
                                </CardBody>
                              </Card>
                            </div>
                          </CardBody>
                        </Card>

                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Profile;