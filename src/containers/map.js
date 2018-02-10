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

    return (
      <div className="MapContainer">
        <Map
          style={{height: '60vh', width: '60vw'}}
          google={this.props.google}
          initialCenter={{
              lat: 49.2819605, lng: -123.1086604
            }}
          zoom={14}
        >


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
  // {
  //   this.props.organizations.map(organization => (
  //     <Marker
  //       key={organization.id}
  //       onClick={this.onMarkerClick}
  //       name={organization.name}
  //       position={{lat: organization.latitude, lng: organization.longitude}}
  //     />
  //   ))
  // }

  const mapStateToProps = (state) => {
    return {

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
