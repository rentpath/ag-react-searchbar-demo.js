
import React from "react"
import { PropTypes } from "react"

const Beds = (props) => {
  return {
    handleChange(ev) {
      this.props.change("beds", ev.target.value);
      this.props.togglePanel('');
    },

    defaultLabel(num) {
      return isNaN(num) ? "BEDS" : undefined;
    },

    studioLabel(num) {
      return (num == 0) ? "Studio" : undefined;
    },

    pluralLabel(num) {
      return num == 1 ?  " Bed" : " Beds";
    },

    labelText(numBeds) {
      return this.defaultLabel(numBeds) ||
             this.studioLabel(numBeds) ||
             numBeds + this.pluralLabel(numBeds);
    },

    render() {
      const { currentSelectionPanel, change, togglePanel } = this.props;
      const numBedsSelected = Number(this.props.search.refinements["beds"]);

      return (
        <div id="beds_refinement">
          <a onClick={ () => togglePanel("beds") }>
            <span>{this.labelText(numBedsSelected)}</span>
            &nbsp;
            <span>{currentSelectionPanel == 'beds' ? '^' : 'v'}</span>
          </a>

          <select size="5"
                  style={ currentSelectionPanel == 'beds' ? {} : { display: "none" } }
                  onChange={ (ev) => this.handleChange(ev) }>
            <option selected={ numBedsSelected == 0 } value="0">Studio</option>
            <option selected={ numBedsSelected == 1 } value="1">1 Bedroom</option>
            <option selected={ numBedsSelected == 2 } value="2">2 Bedrooms</option>
            <option selected={ numBedsSelected == 3 } value="3">3 Bedrooms</option>
            <option selected={ numBedsSelected == 4 } value="4">4 Bedrooms</option>
          </select>
        </div>
      );
    }
  };
}

Beds.propTypes = {
  currentSelectionPanel: React.PropTypes.string.isRequired,
  change:                React.PropTypes.func.isRequired,
  togglePanel:           React.PropTypes.func.isRequired,
}

Beds.displayName = 'Beds'

export default Beds
