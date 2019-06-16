import React from "react";
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    InfoWindow,
    Marker
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import styles from "./Map.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

Geocode.setApiKey("AIzaSyBvORlEqFZYFwTly_z5nnKf-PaUOXqYgRY");

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            city: "",
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        };
    }

    /**
     * Get the current address from the default map position and set those values in the state
     */
    componentDidMount() {
        Geocode.fromLatLng(
            this.state.mapPosition.lat,
            this.state.mapPosition.lng
        ).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray);

                this.setState({
                    address: address ? address : "",
                    city: city ? city : ""
                });

                this.props.onChangeLocation(
                    city,
                    address,
                    this.state.mapPosition.lat,
                    this.state.mapPosition.lng
                );
            },
            error => {
                console.error(error);
            }
        );
    }

    /**
     * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
     *
     * @param nextProps
     * @param nextState
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.address !== nextState.address ||
            this.state.city !== nextState.city
        ) {
            return true;
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false;
        }
    }

    /**
     * Get the city and set the city input value to the one selected
     *
     * @param addressArray
     * @return {string}
     */
    getCity = addressArray => {
        let city = "";
        for (let i = 0; i < addressArray.length; i++) {
            if (
                addressArray[i].types[0] &&
                "administrative_area_level_2" === addressArray[i].types[0]
            ) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    /**
     * And function for city,state and address input
     * @param event
     */
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /**
     * This Event triggers when the marker window is closed
     *
     * @param event
     */
    onInfoWindowClose = event => {};

    /**
     * When the user types an address in the search box
     * @param place
     */
    onPlaceSelected = place => {
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        // Set these values in the state.
        this.setState({
            address: address ? address : "",
            city: city ? city : "",
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            }
        });

        this.props.onChangeLocation(city, address, latValue, lngValue);
    };

    /**
     * When the marker is dragged you get the lat and long using the functions available from event object.
     * Use geocode to get the address, city, area and state from the lat and lng positions.
     * And then set those values in the state.
     *
     * @param event
     */
    onMarkerDragEnd = event => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray);

                this.setState({
                    address: address ? address : "",
                    city: city ? city : ""
                });

                this.props.onChangeLocation(city, address, newLat, newLng);
            },
            error => {
                console.error(error);
            }
        );
    };

    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(props => (
                <GoogleMap
                    google={this.props.google}
                    defaultZoom={this.props.zoom}
                    defaultCenter={{
                        lat: this.state.mapPosition.lat,
                        lng: this.state.mapPosition.lng
                    }}
                >
                    {/* For Auto complete Search Box */}
                    <Autocomplete
                        style={{
                            width: "100%",
                            height: "40px",
                            paddingLeft: "16px",
                            marginTop: "2px",
                            marginBottom: "100px"
                        }}
                        onPlaceSelected={this.onPlaceSelected}
                        types={["(regions)"]}
                    />
                    {/*Marker*/}
                    <Marker
                        google={this.props.google}
                        name={"Dolores park"}
                        draggable={true}
                        onDragEnd={this.onMarkerDragEnd}
                        position={{
                            lat: this.state.markerPosition.lat,
                            lng: this.state.markerPosition.lng
                        }}
                    />
                    <Marker />
                    {/* InfoWindow on top of marker */}
                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={{
                            lat: this.state.markerPosition.lat + 0.0018,
                            lng: this.state.markerPosition.lng
                        }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>
                                {this.state.address}
                            </span>
                        </div>
                    </InfoWindow>
                </GoogleMap>
            ))
        );
        let map;
        if (this.props.center.lat !== undefined) {
            map = (
                <div>
                    <div>
                        <div className={styles.form_item}>
                            <div className={styles.form_label}>Address</div>
                            <input
                                type="text"
                                name="address"
                                className={styles.form_input}
                                onChange={this.onChange}
                                readOnly="readOnly"
                                value={this.state.address}
                            />
                        </div>
                    </div>
                    <AsyncMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvORlEqFZYFwTly_z5nnKf-PaUOXqYgRY&libraries=places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={
                            <div style={{ height: this.props.height }} />
                        }
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            );
        } else {
            map = <div style={{ height: this.props.height }} />;
        }
        return map;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeLocation: (city, address, lat, long) =>
            dispatch(actions.updatePrefLocation(city, address, lat, long))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Map);
