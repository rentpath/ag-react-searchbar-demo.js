
import React from "react"
import { PropTypes } from "react"

const AirConditioning = ({ currentState, change }) => (
  <div className="air-conditioning-refinement">
    <input type="checkbox"
           checked={ currentState }
           onChange={ () => change() } />
    <label>Air Conditioning</label>
  </div>
)

AirConditioning.propTypes = {
  currentState: React.PropTypes.bool,
  change:       React.PropTypes.func.isRequired,
}

AirConditioning.displayName = 'AirConditioning'

export default AirConditioning
