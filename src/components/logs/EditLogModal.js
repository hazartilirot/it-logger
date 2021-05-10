import React, { useState, useEffect, useRef } from "react";
import M from 'materialize-css/dist/js/materialize.min';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updateLog, clearCurrent} from "../../actions/logActions";
import TechSelectOptions from '../../components/techs/TechSelectOptions'

const EditLogModal = ({updateLog, current, clearCurrent}) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const inputReference = useRef()
  
  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
      inputReference.current.focus();
    }
  }, [current])
  
  const onSubmit = () => {
    if (message === '' || tech ==='') {
      M.toast({html: 'Please enter a message and select a technician'})
    } else {
      updateLog({
        id: current.id,
        message,
        attention,
        tech,
        data: new Date()
      })
      M.toast({html: `Log updated by ${tech}`})
      clearCurrent();
      clearFields()
    }
  } 
  
  const clearFields = () => {
    setMessage('');
    setAttention(false);
    setTech('');
  }
  
  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              ref={inputReference}
            />
            <label htmlFor="message" className="active">
              Log message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={(e) => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};
const modalStyle = {
  width: "75%",
  height: "75%",
};
EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  current: state.log.current
})

export default connect(mapStateToProps, {updateLog, clearCurrent})(EditLogModal);
