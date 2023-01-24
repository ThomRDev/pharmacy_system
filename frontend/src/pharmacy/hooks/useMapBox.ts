import {
  useCallback,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { Subject } from "rxjs";

type InitialCoords = {
  lng: number;
  lat: number;
  zoom: number;
};
export const useMapBox = (initialCoords: InitialCoords,isAsync:boolean | null = null) => {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const markersef = useRef<mapboxgl.Marker>();

  // referencia al div del mapa
  const setRef = useCallback((node: HTMLDivElement) => {
    if(isAsync === null){
      mapDivRef.current = node;
      return
    }
    if(isAsync){
      mapDivRef.current = node;
    }
  }, [isAsync]);

  const [coods, setCoords] = useState(initialCoords);

  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    console.log(mapDivRef.current);
    if(!mapDivRef.current) return
    const mapBox = new Map({
      container: mapDivRef.current as HTMLDivElement, // container ID
      // style: 'mapbox://styles/mapbox/streets-v11', // style URL
      style: "mapbox://styles/mapbox/dark-v10",
      center: [initialCoords.lng, initialCoords.lat], // starting position [lng, lat]
      zoom: 14,
    });
    mapBox.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
      })
    );
    mapBox.addControl(new mapboxgl.FullscreenControl());
    setMap(mapBox);
  }, [initialCoords,mapDivRef.current,isAsync]);

  // escuchando el evento move
  useEffect(() => {
    const onMove = (
      event: mapboxgl.MapboxEvent<
        MouseEvent | TouchEvent | WheelEvent | undefined
      > &
        mapboxgl.EventData
    ) => {
      const { lat, lng } = map!.getCenter();

      setCoords({
        lat: Number(lat.toFixed(4)),
        lng: Number(lng.toFixed(4)),
        zoom: Number(map!.getZoom().toFixed(4)),
      });
    };

    map?.on("move", onMove);

    return () => {
      map?.off("move", onMove);
    };
  }, [map]);

  const addMarker = useCallback(
    (place: any) => {
      !!markersef.current && markersef.current.remove();
      const [lng, lat] = place.center;
      const popup = new mapboxgl.Popup().setHTML(`
                <h4 style='color:black'>${place.text_es}</h4>
                <p style='color:black'>${place.place_name_es}</p>
                `);

      const marker = new mapboxgl.Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(map as mapboxgl.Map)
        .setDraggable(true);

      marker.on("drag", (evt: any) => {
        const { id } = evt.target;
        const { lng, lat } = evt.target.getLngLat();
        const _popup = marker.getPopup();
        _popup.remove();
        marker.setPopup(popup);
        console.log({ lng, lat });
      });

      markersef.current = marker;
      map?.flyTo({
        zoom: 14,
        center: [lng, lat],
      });
    },
    [map]
  );

  return {
    setRef,
    markersef,
    addMarker,
    map,
  };
};
