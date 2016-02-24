
import React from "react"
import { PropTypes } from "react"

const Pets = ({ currentState, change }) => (
  <div className="pets-refinement">
    <input type="checkbox"
           checked={ currentState }
           onChange={ () => change() } />
    <label>Pets</label>
  </div>
)

Pets.propTypes = {
  currentState: React.PropTypes.bool,
  change:       React.PropTypes.func.isRequired,
}

Pets.displayName = 'Pets'

export default Pets
