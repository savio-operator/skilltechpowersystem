'use client'
import { Map, MapMarker, MarkerContent, MarkerLabel, MapControls } from './map'

// Skilltech HQ + key service-area towns across Ernakulam, Kottayam, Idukki.
const LOCATIONS = [
  { name: 'Muvattupuzha · HQ', lng: 76.5719, lat: 9.9816, hq: true },
  { name: 'Kochi',            lng: 76.2673, lat: 9.9312 },
  { name: 'Aluva',            lng: 76.3517, lat: 10.1004 },
  { name: 'Perumbavoor',      lng: 76.4750, lat: 10.1074 },
  { name: 'Kottayam',         lng: 76.5222, lat: 9.5916 },
  { name: 'Thodupuzha',       lng: 76.7184, lat: 9.8960 },
]

export default function LocationMapInner() {
  return (
    <Map theme="dark" center={[76.5, 9.88]} zoom={8.4}>
      {LOCATIONS.map((loc) => (
        <MapMarker key={loc.name} longitude={loc.lng} latitude={loc.lat}>
          <MarkerContent>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFFFFF]/50" />
              <span
                className={`relative inline-flex h-3 w-3 rounded-full border ${
                  loc.hq ? 'border-white bg-[#FFFFFF]' : 'border-[#FFFFFF]/80 bg-[#FFFFFF]/85'
                }`}
              />
            </span>
          </MarkerContent>
          <MarkerLabel className="!text-[#FFFFFF] text-[11px] font-semibold">
            {loc.name}
          </MarkerLabel>
        </MapMarker>
      ))}
      <MapControls position="bottom-right" showZoom />
    </Map>
  )
}
