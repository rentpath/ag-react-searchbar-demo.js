
import React from "react"
import { PropTypes } from "react"

const Ratings = ({ ratings, change }) => (
  <select value={ ratings || "NONE" }
          onChange={ (ev) => change("ratings", ev.target.value) }>
    <option value="NONE">Ratings</option>
    <option value="1">1 Star &amp; Above</option>
    <option value="2">2 Stars &amp; Above</option>
    <option value="3">3 Stars &amp; Above</option>
    <option value="4">4 Stars &amp; Above</option>
    <option value="5">5 Stars</option>
  </select>
)

Ratings.propTypes = {
  ratings: React.PropTypes.string,
  change:  React.PropTypes.func.isRequired,
};

Ratings.displayName = 'Ratings'

export default Ratings
