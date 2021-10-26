import React, {useState} from 'react'
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types'

const CustomMap = withScriptjs(withGoogleMap(({lat, lng}) => {

    const mapStyles = {        
        height: "100vh",
        width: "100%"
    }
    const defaultCenter = {
        lat: lat, lng: lng
    }
    const [selected, setSelected] = useState(null)
    return (
        <div>
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={8}
            center={defaultCenter}
            >
                <Marker position={defaultCenter} onClick={() => {setSelected(true)}}/>
                {selected && <InfoWindow position={defaultCenter} onCloseClick={() => {setSelected(null)}}>
                                <div>
                                    <h5>Adoption Center</h5>
                                </div>
                            </InfoWindow>}
            </GoogleMap>
        </div>
    )
}))

// Set defaults of props here.
CustomMap.defaultProps = {
    lat: 41.3851,
    lng: 2.1734
}
// Set type of the prop here.
CustomMap.propTypes = {
	lat: PropTypes.number,
    lng: PropTypes.number
}

export default CustomMap
