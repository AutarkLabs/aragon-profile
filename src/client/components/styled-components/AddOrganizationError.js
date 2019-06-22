import React from 'react'
import PropTypes from 'prop-types'

const AddOrganizationError = props => (
  <svg width="86px" height="86px" viewBox="0 0 86 86" {...props}>
    <g
      id="Profiles"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="Add-Organization"
        transform="translate(-1335.000000, -517.000000)"
        fill="#FB7777"
      >
        <circle id="Oval" cx="1378" cy="560" r="43" />
      </g>
    </g>
  </svg>
)

AddOrganizationError.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
}

AddOrganizationError.defaultProps = {
  color: '#FB7777',
  width: '86px',
  height: '86px',
}

export default AddOrganizationError
