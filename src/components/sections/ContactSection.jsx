import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "@iconify/react/dist/iconify.js";
import useIntersectionObserver from "../../hooks/useObserver";

const contactData = [
    {
        icon: 'lets-icons:map-fill',
        value: 'Swarzów 49, 33-210 Olesno'
    },
    {
        icon: 'mdi:clock',
        value: 'Pon - Sb | 7:00 - 16:00'
    },
    {
        icon: 'entypo:old-phone',
        value: '+48 782 082 219'
    },
    {
        icon: 'mdi:email-mark-as-unread',
        value: 'firmafema49@hotmail.com'
    },
    {
        icon: 'ic:baseline-facebook',
        value: 'FEMA - Blachy dachowe'
    },
]

const defaultAddress = "Swarzów 49, 33-210 Olesno";

const MapCenterUpdater = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            const width = window.innerWidth;

            let offsetX = 0;
            let offsetY = 0;

            if (width > 1024) {
                offsetX = 350;
            } else {
                offsetY = 200;
            }

            const point = map.latLngToContainerPoint(position);
            const shiftedPoint = point.subtract([offsetX, offsetY]);
            const shiftedLatLng = map.containerPointToLatLng(shiftedPoint);

            map.setView(shiftedLatLng, 12);
        }
    }, [position, map]);
}

const ContactSection = () => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        const geocodeAddress = () => {
            fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(defaultAddress)}`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.features || data.features.length === 0) {
                        console.error("Nie znaleziono adresu.");
                        return;
                    }
                    const lat = data.features[0].geometry.coordinates[1];
                    const lon = data.features[0].geometry.coordinates[0];
                    setPosition([lat, lon]);
                })
                .catch((err) => console.error(err));
        };

        geocodeAddress();
    }, []);

    const [ref, isVisible] = useIntersectionObserver();

    return (
        <section id="kontakt" className="w-full h-[500px] relative max-lg:h-[700px]">
            <article className="absolute w-[1400px] h-full left-[50%] translate-x-[-50%] z-10 pointer-events-none max-2xl:w-[1100px] max-xl:w-[900px] max-lg:w-[80%] max-sm:w-full">
                <div className="w-[550px] h-full bg-[#22222289] backdrop-blur-[10px] z-10 flex flex-col justify-center gap-[32px] px-[48px] pointer-events-auto max-xl:w-[400px] max-lg:w-full max-lg:h-[300px] max-lg:gap-[16px] max-sm:h-[350px] max-sm:px-[24px]">
                    <h2 className={`text-[25px] font-bold max-xl:text-[22px] max-lg:text-[20px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} style={{transitionDelay: '100ms'}}>MASZ PYTANIA LUB CHCESZ ZAMÓWIĆ PRODUKT?</h2>
                    <ul className="flex flex-col gap-[16px] max-xl:gap-[12px] max-lg:gap-[8px]">
                        {contactData.map((el, index) => (
                            <li ref={ref} key={index} className={`flex gap-[16px] items-center max-sm:gap-[8px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} style={{transitionDelay: (index*100) + 'ms'}}>
                                <Icon icon={el.icon} width="30" className="text-[#A3886E] max-xl:w-[25px] max-sm:w-[20px]" />
                                <p className="text-[18px] max-xl:text-[16px] max-sm:text-[14px]">{el.value}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </article>

            {position && (
                <MapContainer center={position} zoom={12} className="w-full h-[500px] !z-0 max-lg:!h-[700px]">
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="© OpenStreetMap, © CartoDB" />

                    <Marker position={position}
                        icon={L.icon({
                            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                        })}
                    />

                    <MapCenterUpdater position={position} />
                </MapContainer>
            )}
        </section>
    );
}

export default ContactSection