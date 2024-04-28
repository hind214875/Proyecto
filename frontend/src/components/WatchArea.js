import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

const WatchArea = () => {
  const [isOpen, setOpen] = useState(false);

  const handleVideoOpen = () => {
    setOpen(true);
  };

  return (
    <section className="watch-area ptb-100">
      <div className="container">
        <div className="section-title">
          <h2>Watch The Full Video To Know More About Us</h2>
        </div>
        <div className="watch-item">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="video-wrap">
                {/* Here we set the onClick handler to open the video modal */}
                <button className="popup-youtube" onClick={handleVideoOpen}>
                  <i className="bx bx-play"></i>
                </button>
              </div>
              <div className="watch-content">
                <h3>We Love The Work</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ModalVideo component with the videoId of the YouTube video */}

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="Dviu-D3Fijo"
        onClose={() => setOpen(false)}
      />
    </section>
  );
};

export default WatchArea;
