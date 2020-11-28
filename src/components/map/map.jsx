import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {OfferPropTуpes, cityPropTypes} from "../../propTypes";
import {getCoordByCity} from "../../utils";
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {citiesSelector, activeCitySelector, activeOfferSelector} from "../../store/selectors";

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultCoords = getCoordByCity(this.props.cities, this.props.activeCity);
    this.zoom = 12;
    this.pinIcon = undefined;
    this.activePinIcon = undefined;
    this.iconSize = [30, 30];
    this.pins = [];
  }

  componentDidMount() {
    const {offers} = this.props;

    this.pinIcon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: this.iconSize,
    });

    this.activePinIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: this.iconSize,
    });

    this.map = leaflet.map(`map`, {
      center: this.defaultCoords,
      zoom: this.zoom,
      zoomControl: false,
      marker: true
    });
    this.map.setView(this.defaultCoords, this.zoom);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this.map);

    this._addPinsToMap(offers);
  }

  componentDidUpdate(prevProps) {
    const {offers, cities, activeCity} = this.props;
    const currentCoords = getCoordByCity(cities, activeCity);

    if (activeCity !== prevProps.activeCity) {
      this._removePinsMap();
      this.map.remove();

      this.map = leaflet.map(`map`, {
        center: currentCoords,
        zoom: this.zoom,
        zoomControl: false,
        marker: true
      });
      this.map.setView(currentCoords, this.zoom);

      leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this.map);
    }

    this._addPinsToMap(offers);
  }

  _addPinsToMap(offers) {
    const {activeOffer} = this.props;

    offers.forEach((offer) => {
      const activeIcon = activeOffer === offer.id ? this.activePinIcon : this.pinIcon;
      const pin = leaflet
        .marker(offer.coordinates, {icon: activeIcon})
        .addTo(this.map);
      this.pins = [...this.pins, pin];
    });
  }

  _removePinsMap() {
    this.pins.forEach((it) => {
      it.removeFrom(this.map);
    });
    this.pins = [];
  }

  render() {
    const {className} = this.props;

    return (
      <section id="map" className={`${className}__map map`}></section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(OfferPropTуpes.isRequired),
  className: PropTypes.string.isRequired,
  activeOffer: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(cityPropTypes.isRequired),
  activeCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  cities: citiesSelector(state),
  activeOffer: activeOfferSelector(state),
  activeCity: activeCitySelector(state),
});

export {Map};
export default connect(mapStateToProps, null)(Map);

