
import React from 'react';

import AirConditioning from './AirConditioning';
import Baths from './Baths';
import Distance from './Distance';
import Laundry from './Laundry';
import Pets from './Pets';
import Ratings from './Ratings';

const Options = (props) => {
  return {
    getRefinements() {
      return Object.keys(this.props.search.refinements).filter(ele => ele != 'term') || [];
    },

    refinementPresenter(refinement) {
      if (refinement === "priceMin") {
        const amount = Number(this.props.search.refinements[refinement])
        return "Min $" + amount;
      }

      if (refinement === "priceMax") {
        const amount = Number(this.props.search.refinements[refinement])
        return "Max $" + amount;
      }

      if (refinement === "beds") {
        const count = Number(this.props.search.refinements[refinement])
        return count === 0 ? " Studio" : (count === 1 ? count + " Bed" : count + " Beds")
      }

      if (refinement === "pets") {
        return "Pets"
      }

      if (refinement === "air_conditioning") {
        return "Air Conditioning"
      }

      if (refinement === "baths") {
        const count = Number(this.props.search.refinements[refinement])
        const suffix = (count === 1 ? " Bath" : " Baths")

        return count + suffix
      }

      if (refinement === "distance") {
        const count = Number(this.props.search.refinements[refinement])
        const suffix = " Miles";

        return count + suffix
      }

      if (refinement === "laundry") {
        switch (this.props.search.refinements[refinement]) {
          case "laundry":
            return "Laundry Facility";

          case "connections":
            return "Washer & Dryer Connections";

          case "inUnit":
            return "Washer & Dryer In Unit";
        };

        return "Laundry"
      }

      if (refinement === "ratings") {
        const count = Number(this.props.search.refinements[refinement])
        const suffix = (count === 1 ? " Star & Above" : " Stars & Above")

        return count + suffix
      }

      return refinement;
    },

    render() {
      const refinements = this.props.search.refinements
      const showRefinementPills = (this.props.additionalRefinementsPanelDisplayed || this.getRefinements().length != 0)

      return (
        <li style={ showRefinementPills ? {} : {'display': 'none' } }>
          <div id="refinement_pills_panel" className="row">
            <ul>
              { this.getRefinements().map(refinement =>
                    <li key={refinement}>
                      { this.refinementPresenter(refinement) }
                      &nbsp;
                      <span onClick={ () => this.props.clearFilter(refinement) }>X</span>
                    </li>
                  )
              }

              <li><a href='#' onClick={ () => this.props.clearFilters() }>Clear Filters</a></li>
            </ul>

            <div id="filtered_results_count">
              Apartments Found:
              <span>{this.props.search.filteredResults.count}</span>
            </div>
          </div>

          { this.props.search.filteredResults.msg ?
              <div id="filtered_results_msg">{ this.props.search.filteredResults.msg }</div> :
              ''
          }

            <div id="additional_refinements_panel"
                 style={ this.props.additionalRefinementsPanelDisplayed ? {} : { 'display': 'none' } }>

              <ul className="row">
                <li><Baths { ...refinements } change={ this.props.setRefinement } /></li>
                <li><Distance { ...refinements } change={ this.props.setRefinement } /></li>
                <li><Ratings { ...refinements } change={ this.props.setRefinement } /></li>
                <li><Laundry { ...refinements } change={ this.props.setRefinement } /></li>
              </ul>

              <ul className="row">
                <li>
                  <AirConditioning currentState={ refinements['air_conditioning'] }
                                   change={this.props.setAirConditioning } />
                </li>

                <li>
                  <Pets currentState={ refinements['pets'] }
                        change={ this.props.setPets } />
                </li>
              </ul>

              <ul id="refinement_actions_panel" className="row">
                <li><button>Update Results</button></li>
                <li><a href="#" onClick={ () => this.props.clearSelections() }>Clear Selections</a></li>
                <li><button onClick={ () => alert('Open advanced search page.') }>More Options</button></li>
              </ul>
            </div>
        </li>
      );
    }
  }
}

Options.propTypes = {
  //  currentSelectionPanel: React.PropTypes.string.isRequired,
  //change:                React.PropTypes.func.isRequired,
  //  toggleBedsSelection:   React.PropTypes.func.isRequired,
}

Options.displayName = 'Options'

export default Options
