import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LatLngPropType } from './propTypes';
import Connector from './Connector';
import Provider from './Provider';
import GoogleMaps from './GoogleMaps';

class GeoSearch extends Component {
  static propTypes = {
    google: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    initialZoom: PropTypes.number,
    initialPosition: LatLngPropType,
    enableRefine: PropTypes.bool,
    enableRefineOnMapMove: PropTypes.bool,
  };

  static defaultProps = {
    initialZoom: 1,
    initialPosition: { lat: 0, lng: 0 },
    enableRefine: true,
    enableRefineOnMapMove: true,
  };

  renderChildrenWithBoundFunction = ({ hits, position, ...rest }) => {
    const {
      google,
      children,
      initialZoom,
      initialPosition,
      enableRefine,
      enableRefineOnMapMove,
      ...mapOptions
    } = this.props;

    return (
      <Provider
        {...rest}
        testID="Provider"
        google={google}
        hits={hits}
        position={position}
        isRefineEnable={enableRefine}
      >
        {({
          boundingBox,
          boundingBoxPadding,
          onChange,
          onIdle,
          shouldUpdate,
        }) => (
          <GoogleMaps
            testID="GoogleMaps"
            google={google}
            initialZoom={initialZoom}
            initialPosition={position || initialPosition}
            mapOptions={mapOptions}
            boundingBox={boundingBox}
            boundingBoxPadding={boundingBoxPadding}
            onChange={onChange}
            onIdle={onIdle}
            shouldUpdate={shouldUpdate}
          >
            {children({ hits })}
          </GoogleMaps>
        )}
      </Provider>
    );
  };

  render() {
    const { enableRefineOnMapMove } = this.props;

    return (
      <Connector
        testID="Connector"
        enableRefineOnMapMove={enableRefineOnMapMove}
      >
        {this.renderChildrenWithBoundFunction}
      </Connector>
    );
  }
}

export default GeoSearch;