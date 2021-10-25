import React, {useState} from 'react'
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps';

const CustomMap = withScriptjs(withGoogleMap(() => {

    const mapStyles = {        
        height: "100vh",
        width: "100%"
    }
    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
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

export default CustomMap
