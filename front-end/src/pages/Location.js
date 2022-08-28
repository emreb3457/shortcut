import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import { usePosition } from "../comp/usePosition";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Box, Button } from '@chakra-ui/react';
import AddLocationForm from '../comp/AddLocationForm';
import RegisterForm from '../comp/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from '../actions/locationActions';
import LocationList from '../comp/LocationList';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1yZWIzNDU3IiwiYSI6ImNsMWRxempvZjAzeDAzY21pbXNqZ3E3cXEifQ.ld1sORUZRV4AljBUVVnYMg';
const styles = {
    width: "100%",
    height: "100vh",
};

const LocationAdmin = () => {
    const sessionuser = JSON.parse(sessionStorage.getItem("sessionUser"));
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { locations } = useSelector(state => state.location);
    const [map, setMap] = useState(null);
    const [lastCord, setLastCords] = useState(null);
    const [selectCord, setSelectCord] = useState(null);
    const mapContainer = useRef(null);
    const { latitude, longitude, error } = usePosition();
    const start = [longitude, latitude];

    useEffect(() => {
        if (!locations) {
            dispatch(getLocation());
        }
        if (selectCord) {
            routeCalculation({ coords: selectCord, map })
        }
    }, [selectCord])

    useEffect(() => {
        if (latitude) {
            const initializeMap = ({ setMap, mapContainer }) => {
                const map = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: "mapbox://styles/mapbox/streets-v11",
                    center: start,
                    zoom: 12
                });

                map.addControl(
                    new mapboxgl.GeolocateControl({
                        positionOptions: {
                            enableHighAccuracy: true,
                        },
                        trackUserLocation: true,
                        style: {
                            right: 10,
                            top: 10
                        },
                        position: 'bottom-left',

                        showUserHeading: true
                    })
                );

                map.on("load", () => {
                    setMap(map);
                    map.resize();
                    myLocationLayer({ map });
                    // List Locations
                    addTargetLayer({ map });
                });
                {
                    sessionuser.user.role == "admin" &&
                        map.on('click', async (event) => {
                            const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
                            selectLayer({ map, coords });
                            routeCalculation({ map, coords })
                        });
                }
            };

            if (!map) initializeMap({ setMap, mapContainer });
        }
    }, [map, latitude, locations]);

    const myLocationLayer = ({ map }) => {
        map.addLayer({
            id: 'point',
            type: 'circle',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: start
                            }
                        }
                    ]
                }
            },
            paint: {
                'circle-radius': 13,
                'circle-color': '#3887be'
            }
        });
    }

    const addTargetLayer = ({ map }) => {
        locations?.result?.locations?.map((x, index) => {
            map.addLayer({
                id: `end${index}`,
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: [x.lng, x.lat]
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 13,
                    'circle-color': '#f30'
                }
            });
            // routeCalculation({ coords: [x.lng, x.lat], map })
        })

    }

    const selectLayer = ({ map, coords }) => {

        setLastCords(coords)
        const end = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: coords
                    }
                }
            ]
        };
        if (map.getLayer('end')) {
            map.getSource('end').setData(end);
        } else {
            map.addLayer({
                id: 'end',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: coords
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 13,
                    'circle-color': '#f30'
                }
            });
        }
    }

    const routeCalculation = async ({ coords, map }) => {
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${coords[0]},${coords[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };
        // if the route already exists on the map, we'll reset it using setData
        if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }
        const instructions = document.getElementById('instructions');
        const steps = data.legs[0].steps;
        let tripInstructions = '';
        instructions.innerHTML = `<p><strong> Distance: ${(data.distance / 1000).toFixed(1)}  KM</p></strong>
            <strong>Trip duration: ${Math.floor(
            data.duration / 60
        )} min 🚗 </strong></p><ol>${tripInstructions}</ol>`;
    }

    const logout = () => {
        sessionStorage.clear();
        navigation("/")
    }

    return (
        <Box display={"flex"} flexDir={["column", "column", "column", "row"]}>
            <Box ref={el => (mapContainer.current = el)} style={styles} />
            <Box id="instructions" className="instructions"></Box>
            <Box minW="20%">
                <Box textAlign={"end"} margin="20px" marginRight={"30px"}>
                    <Button onClick={() => logout()} color={"white"} bg="red.400" _hover={{ bg: "red.600" }}>LOGOUT</Button>
                </Box>
                {
                    sessionuser.user.role == "admin" ?
                        <Fragment>
                            <RegisterForm otheruser={true} maxW="70%" />
                            <AddLocationForm location={lastCord} maxW="70%" />
                        </Fragment>
                        :
                        <Box mt="50px">
                            <LocationList listitem={locations?.result?.locations} select={setSelectCord} />
                        </Box>
                }
            </Box>
        </Box>
    )
};

export default LocationAdmin