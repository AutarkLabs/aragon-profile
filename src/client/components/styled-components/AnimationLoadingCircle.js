import React from 'react'
import PropTypes from 'prop-types'

const AnimationLoadingCircle = props => (
  <svg width="92px" height="92px" viewBox="0 0 92 92" {...props}>
    <g
      id="Profiles"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="Add-Organization"
        transform="translate(-733.000000, -222.000000)"
        fill="#00CAE4"
        fillRule="nonzero"
      >
        <path
          d="M822.905593,254.236615 C824.266499,258.582361 825,263.205521 825,268 C825,293.405098 804.405098,314 779,314 C771.363833,314 764.162248,312.139333 757.823893,308.846645 L762.868347,304.613845 C767.802694,306.791031 773.260162,308 779,308 C801.09139,308 819,290.09139 819,268 C819,264.716535 818.604378,261.525472 817.858201,258.471879 L822.905593,254.236615 Z M799.55407,226.836207 L794.470717,231.101646 C789.711681,229.103902 784.484756,228 779,228 C756.90861,228 739,245.90861 739,268 C739,271.033061 739.337581,273.987275 739.97722,276.82712 L734.890753,281.095172 C733.660468,276.944809 733,272.549535 733,268 C733,242.594902 753.594902,222 779,222 C786.387463,222 793.368191,223.74144 799.55407,226.836207 Z"
          id="Combined-Shape"
        />
      </g>
    </g>
  </svg>
)

AnimationLoadingCircle.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
}

AnimationLoadingCircle.defaultProps = {
  color: '#00CAE4',
  width: '92px',
  height: '92px',
}

export default AnimationLoadingCircle
