
import React from "react"
import { PropTypes } from "react"

const Laundry = ({ laundry, change }) => (
  <select value={ laundry || "NONE" }
          onChange={ (ev) => change("laundry", ev.target.value) }>
    <option value="NONE">Laundry</option>
    <option value="laundry">Laundry Facility</option>
    <option value="connections">Washer &amp; Dryer Connections</option>
    <option value="inUnit">Washer &amp; Dryer In Unit</option>
  </select>
)

Laundry.propTypes = {
  laundry: React.PropTypes.string,
  change:  React.PropTypes.func.isRequired,
}

Laundry.displayName = 'Laundry'

export default Laundry

