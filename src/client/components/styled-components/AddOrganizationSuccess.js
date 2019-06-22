import React from 'react'
import PropTypes from 'prop-types'

const AddOrganizationSuccess = props => (
  <svg width="86px" height="86px" viewBox="0 0 86 86" {...props}>
    <g
      id="Profiles"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g id="Add-Organization" transform="translate(-1335.000000, -223.000000)">
        <g id="Group" transform="translate(1335.000000, 223.000000)">
          <circle id="Oval" fill="#00D985" cx="43" cy="43" r="43" />
          <g
            id="check"
            transform="translate(18.000000, 25.000000)"
            fill="#FFFFFF"
          >
            <polygon
              id="Shape"
              points="15.8469945 29.255814 45.9699454 0 50 3.90518784 15.8469945 37 0 21.6440072 3.96174863 17.7388193"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

AddOrganizationSuccess.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
}

AddOrganizationSuccess.defaultProps = {
  color: '#00D985',
  width: '86px',
  height: '86px',
}

export default AddOrganizationSuccess
