
import React from "react"
import { PropTypes } from "react"

const More = ({ toggleOptionsPanel, additionalRefinementsPanelDisplayed }) => (
  <div>
    <button onClick={ () => toggleOptionsPanel() }>
      { additionalRefinementsPanelDisplayed ? 'LESS' : 'MORE' }
      &nbsp;
      <span>{ additionalRefinementsPanelDisplayed ? '^' : 'v' }</span>
    </button>
  </div>
)

More.propTypes = {
  toggleOptionsPanel:                  React.PropTypes.func.isRequired,
  additionalRefinementsPanelDisplayed: React.PropTypes.bool.isRequired,
}

More.displayName = 'More'

export default More
