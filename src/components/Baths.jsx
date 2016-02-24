
import React from "react"
import { PropTypes } from "react"

const Baths = ({ baths, change }) => (
  <select value={ baths || "NONE" }
          onChange={ (ev) => change("baths", ev.target.value) }>
    <option value="NONE">Baths</option>
    <option value="1">1 Bath</option>
    <option value="2">2 Baths</option>
    <option value="3">3 Baths</option>
  </select>
)

Baths.propTypes = {
  baths:  React.PropTypes.string,
  change: React.PropTypes.func.isRequired,
}

Baths.displayName = 'Baths'

export default Baths
