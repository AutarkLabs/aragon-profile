import React from 'react'
import PropTypes from 'prop-types'

const IconError = props => (
  <svg width="86px" height="86px" viewBox="0 0 86 86" {...props}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-1335.000000, -517.000000)" fill="#FB7777">
        <circle cx="1378" cy="560" r="43" />
        <g transform="translate(1335.000000, 517.000000)">
          <circle fill="#FB7777" cx="43" cy="43" r="43" />
          <g transform="translate(25.000000, 25.000000)" fill="#FFFFFF">
            <polygon points="35.2374545 5.12618182 21.1909091 19.1727273 35.2374545 33.2192727 31.6652727 36.7914545 17.6187273 22.7449091 3.57218182 36.7914545 0 33.2192727 14.0465455 19.1727273 0 5.12618182 3.57218182 1.554 17.6187273 15.6005455 31.6652727 1.554" />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

IconError.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
}

IconError.defaultProps = {
  color: '#FB7777',
  width: '86px',
  height: '86px',
}

export default IconError
