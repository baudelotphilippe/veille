import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Modal = ({ isShowing, hide, title, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal-window">
                <div className="modal-header">
                  <h4>{title}</h4>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">{props.children}</div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Modal;