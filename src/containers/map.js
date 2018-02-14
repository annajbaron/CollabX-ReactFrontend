import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }


  render() {
    const {followedBrands} = this.props;
    console.log(this.props.followedBrands)
    return (
      <div className="MapContainer">
        <Map
          style={{height: '50vh', width: '70vw', margin: '0 auto'}}
          google={this.props.google}
          initialCenter={{
              lat: 49.2819605, lng: -123.1086604
            }}
          zoom={14}
        >

          {
            this.props.followedBrands.map(follow => (
              <Marker
                key={follow.brand.id}
                onClick={this.onMarkerClick}
                name={follow.brand.name}
                position={{lat:follow.brand.latitude, lng: follow.brand.longitude}}
              />
            ))
          }

          <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div className= "InfoWindow">
              <p1>{this.state.selectedPlace.name}</p1>
            </div>
          </InfoWindow>

        </Map>
      </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      followedBrands: state.followedBrands
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {

    }
  };


const WrappedContainer = (GoogleApiWrapper({
    apiKey: "AIzaSyCarduSs9YHy2Vafczyy9Ctq13h_EBHbhs"
  })(MapContainer))

export default connect(mapStateToProps, mapDispatchToProps)(WrappedContainer);
