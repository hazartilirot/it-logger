import React from 'react';
import Moment from "react-moment";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteLog, setCurrent} from "../../actions/logActions";

import M from 'materialize-css/dist/js/materialize.min'

const LogItem = ({log: {id, message, attention, tech, date}, deleteLog, setCurrent}) => {
  const onDelete = () => {
    deleteLog(id);
    M.toast({html: 'Log deleted'});
  }
  
  return (
    <li className="collection-item">
      <div>
        <a 
          href="#edit-log-modal" 
          className={`modal-trigger 
            ${attention 
                ? 'red-text' 
                : 'blue-text'}`
          }
          onClick={() => setCurrent({id, message, attention, tech, date})}
        >
          {message}
        </a>
        <br/>
        <span className="grey-text">
          <span className="black-text">ID #{id}</span>
          {' '} last updated by {' '}
          <span className="black-text">{tech}</span>
          {' '} <Moment format="Do MMMM YYYY, hh:mm:ss">{date}</Moment>
        </span>
        <a href="#!" onClick={onDelete} className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
}
LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};
export default connect(null, {deleteLog, setCurrent})(LogItem);