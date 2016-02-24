
import React from "react"
import { PropTypes } from "react"

const Prices = (props) => {
  return {
    handleMaxChange(ev) {
      this.props.change("priceMax", ev.target.value);
      this.props.togglePanel('')
    },

    pricePresenter(price) {
      if (!price || ((price === "0") || (price === "9999"))) {
        return "Any"
      }

      return "$" + price
    },

    labelText() {
      var priceMin = this.props.search.refinements["priceMin"]
      var priceMax = this.props.search.refinements["priceMax"]

      return (!(priceMin || priceMax)) ?
        "PRICE" :
        this.pricePresenter(priceMin) + " - " + this.pricePresenter(priceMax)
    },

    render() {
      const { currentSelectionPanel, change, togglePanel } = this.props
      var priceMin = this.props.search.refinements["priceMin"]
      var priceMax = this.props.search.refinements["priceMax"]

      return (
        <div id="price_refinement">
          <button onClick={ () => togglePanel('price') }>
            <span>{ this.labelText() }</span>
            &nbsp;
            <span>{ currentSelectionPanel == 'price' ? '^' : 'v' }</span>
          </button>

          <div id="prices"
               style={ currentSelectionPanel == 'price' ? {} : { display: "none" } }>
            <div id="min_price_panel">
              <input id="min_price"
                     type="text"
                     placeholder="min"
                     value={ priceMin }/>

              <select size="8"
                      onChange={ (ev) => change("priceMin", ev.target.value) }>
                <option value="0">Any</option>
                <option selected={ priceMin == 500  } value="500">$500</option>
                <option selected={ priceMin == 700  } value="700">$700</option>
                <option selected={ priceMin == 900  } value="900">$900</option>
                <option selected={ priceMin == 1100 } value="1100">$1100</option>
                <option selected={ priceMin == 1300 } value="1300">$1300</option>
                <option selected={ priceMin == 1500 } value="1500">$1500</option>
                <option selected={ priceMin == 2000 } value="2000">$2000</option>
              </select>
            </div>

            <span>-</span>

            <div id="max_price_panel">
              <input id="max_price"
                     type="text"
                     placeholder="max"
                     value={ priceMax }/>

              <select size="12"
                      onChange={ (ev) => this.handleMaxChange(ev) }>
                <option selected={ priceMax == 500  } value="500">$500</option>
                <option selected={ priceMax == 700  } value="700">$700</option>
                <option selected={ priceMax == 900  } value="900">$900</option>
                <option selected={ priceMax == 1100 } value="1100">$1100</option>
                <option selected={ priceMax == 1300 } value="1300">$1300</option>
                <option selected={ priceMax == 1500 } value="1500">$1500</option>
                <option selected={ priceMax == 2000 } value="2000">$2000</option>
                <option selected={ priceMax == 2500 } value="2500">$2500</option>
                <option selected={ priceMax == 3000 } value="3000">$3000</option>
                <option selected={ priceMax == 4000 } value="4000">$4000</option>
                <option selected={ priceMax == 5000 } value="5000">$5000</option>
                <option selected={ priceMax == 9999 } value="9999">Any</option>
              </select>
            </div>
          </div>
        </div>
      )
    }
  }
}

Prices.propTypes = {
  currentSelectionPanel: React.PropTypes.string.isRequired,
  change:                React.PropTypes.func.isRequired,
  togglePanel:           React.PropTypes.func.isRequired,
}

Prices.displayName = 'Prices'

export default Prices
