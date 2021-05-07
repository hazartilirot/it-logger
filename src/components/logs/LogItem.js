import React from 'react';
import PropTypes from 'prop-types';

const LogItem = ({log: {id, message, attention, tech, date}}) => {
  return (
    <li className="collection-item">
      <div>
        <a 
          href="#edit-log-modal" 
          className={`modal-trigger 
          ${attention 
              ? 'red-text' 
              : 'blue-text'}`}
        >{message}</a>
      </div>
    </li>
  );
}
LogItem.propTypes = {
  log: PropTypes.object.isRequired,  
};
export default LogItem;