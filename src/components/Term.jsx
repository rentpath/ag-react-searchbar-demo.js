
import React from "react"
import { PropTypes } from "react"

const Term = ({ search, change }) => (
  <input type="text"
    placeholder="Neighborhood, Zip or City"
    autoComplete="off"
    className="term"
    value={ search.term }
    onChange={ (ev) => change(ev.target.value) } />
)

Term.propTypes = {
  change: React.PropTypes.func.isRequired,
}

Term.displayName = 'Term'

export default Term
