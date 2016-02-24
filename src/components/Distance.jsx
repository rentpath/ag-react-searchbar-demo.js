
import React from "react"
import { PropTypes } from "react"

const Distance = ({ distance, change }) => (
  <select value={ distance || "NONE" }
          onChange={ (ev) => change("distance", ev.target.value) }>
    <option value="NONE">Distance</option>
    <option value="5">5 miles</option>
    <option value="10">10 miles</option>
    <option value="20">20 miles</option>
    <option value="30">30 miles</option>
    <option value="40">40 miles</option>
    <option value="50">50 miles</option>
    <option value="75">75 miles</option>
    <option value="100">100 miles</option>
  </select>
)

Distance.propTypes = {
  distance: React.PropTypes.string,
  change:   React.PropTypes.func.isRequired,
};

Distance.displayName = 'Distance'

export default Distance

