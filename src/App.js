import React, { useState, useEffect } from 'react';
import { Clock, Plus, X, Globe } from 'lucide-react';
import './App.css';

const App = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [is24Hour, setIs24Hour] = useState(true);
    const [selectedTimezones, setSelectedTimezones] = useState([
        { city: 'Paris', timezone: 'Europe/Paris', country: 'France' },
        { city: 'New York', timezone: 'America/New_York', country: 'États-Unis' },
        { city: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japon' },
        { city: 'London', timezone: 'Europe/London', country: 'Royaume-Uni' },
        { city: 'Sydney', timezone: 'Australia/Sydney', country: 'Australie' }
    ]);

    const availableTimezones = [
        { city: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'États-Unis' },
        { city: 'Chicago', timezone: 'America/Chicago', country: 'États-Unis' },
        { city: 'Mexico City', timezone: 'America/Mexico_City', country: 'Mexique' },
        { city: 'São Paulo', timezone: 'America/Sao_Paulo', country: 'Brésil' },
        { city: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', country: 'Argentine' },

        { city: 'Amsterdam', timezone: 'Europe/Amsterdam', country: 'Pays-Bas' },
        { city: 'Athènes', timezone: 'Europe/Athens', country: 'Grèce' },
        { city: 'Bruxelles', timezone: 'Europe/Brussels', country: 'Belgique' },
        { city: 'Berlin', timezone: 'Europe/Berlin', country: 'Allemagne' },
        { city: 'Chisinau', timezone: 'Europe/Chisinau', country: 'Moldavie' },
        { city: 'Helsinki', timezone: 'Europe/Helsinki', country: 'Finlande' },
        { city: 'Istanbul', timezone: 'Europe/Istanbul', country: 'Turquie' },
        { city: 'Kiev', timezone: 'Europe/Kyiv', country: 'Ukraine' },
        { city: 'Lisbone', timezone: 'Europe/Lisbone', country: 'Portugal' },
        { city: 'Luxembourg', timezone: 'Europe/Luxembourg', country: 'Luxembourg' },
        { city: 'Madrid', timezone: 'Europe/Madrid', country: 'Espagne' },
        { city: 'Moscow', timezone: 'Europe/Moscow', country: 'Russie' },
        { city: 'Malte', timezone: 'Europe/Malta', country: 'Malte' },
        { city: 'Rome', timezone: 'Europe/Rome', country: 'Italie' },
        { city: 'Oslo', timezone: 'Europe/Oslo', country: 'Norvège' },
        { city: 'Sofia', timezone: 'Europe/Sofia', country: 'Bulgarie' },
        { city: 'Vienne', timezone: 'Europe/Vienna', country: 'Autriche' },
        { city: 'Vilnius', timezone: 'Europe/Vilnius', country: 'Lituanie' },

        { city: 'Cairo', timezone: 'Africa/Cairo', country: 'Égypte' },

        { city: 'Dubai', timezone: 'Asia/Dubai', country: 'Émirats Arabes Unis' },
        { city: 'Mumbai', timezone: 'Asia/Kolkata', country: 'Inde' },
        { city: 'Bangkok', timezone: 'Asia/Bangkok', country: 'Thaïlande' },
        { city: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapour' },
        { city: 'Beijing', timezone: 'Asia/Shanghai', country: 'Chine' },
        { city: 'Seoul', timezone: 'Asia/Seoul', country: 'Corée du Sud' },

        { city: 'Melbourne', timezone: 'Australia/Melbourne', country: 'Australie' },
        { city: 'Auckland', timezone: 'Pacific/Auckland', country: 'Nouvelle-Zélande' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (timezone) => {
        const options = {
        timeZone: timezone,
        hour12: !is24Hour,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
        };
        return new Intl.DateTimeFormat('fr-FR', options).format(currentTime);
    };

    const formatDate = (timezone) => {
        const options = {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        };
        return new Intl.DateTimeFormat('fr-FR', options).format(currentTime);
    };

    const getTimeOffset = (timezone) => {
        const now = new Date();
        const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        const targetTime = new Date(utc.toLocaleString('en-US', { timeZone: timezone }));
        const offset = (targetTime.getTime() - utc.getTime()) / (1000 * 60 * 60);
        return offset >= 0 ? `+${offset}` : `${offset}`;
    };

    const addTimezone = (timezone) => {
        if (!selectedTimezones.find(tz => tz.timezone === timezone.timezone)) {
        setSelectedTimezones([...selectedTimezones, timezone]);
        }
    };

    const removeTimezone = (timezoneToRemove) => {
        setSelectedTimezones(selectedTimezones.filter(tz => tz.timezone !== timezoneToRemove));
    };

    const availableToAdd = availableTimezones.filter(tz => 
        !selectedTimezones.find(selected => selected.timezone === tz.timezone)
    );

    const groupByContinent = (timezones) => {
        const grouped = {};
        for (const tz of timezones) {
            const continent = tz.timezone.split('/')[0]; // Ex: "Europe"
            if (!grouped[continent]) {
                grouped[continent] = [];
            }
            grouped[continent].push(tz);
        }
        return grouped;
    };

    const groupedTimezones = groupByContinent(availableToAdd); // ou availableTimezones si c’est la source complète


    return (
        <div className="container">
            <div className="content">
                {/* Header */}
                <div className="description">
                    <div className="zone-title">
                        <Globe />
                        <h1>Horloge Mondiale</h1>
                    </div>
                    <p>Suivez l'heure dans le monde entier en temps réel</p>
                </div>

                {/* Controls */}
                <div className="controls">
                    <button onClick={() => setIs24Hour(!is24Hour)}>
                        <Clock className="w-4 h-4 inline mr-2" />
                        Format {is24Hour ? '12h' : '24h'}
                    </button>
                
                    <select
                        onChange={(e) => {
                            const selected = availableToAdd.find(tz => tz.timezone === e.target.value);
                            if (selected) {
                                addTimezone(selected);
                                e.target.value = '';
                            }
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>Ajouter une ville</option>
                        {Object.entries(groupedTimezones).map(([continent, zones]) => (
                            <optgroup key={continent} label={continent}>
                                {zones.map(tz => (
                                    <option key={tz.timezone} value={tz.timezone} className="text-black">
                                        {tz.city}, {tz.country}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                {/* Clock Grid */}
                <div className="clocks">
                {selectedTimezones.map((tz, index) => (
                    <div key={tz.timezone} className="clock">
                    {/* Remove button */}
                    {selectedTimezones.length > 1 && (
                        <button
                        onClick={() => removeTimezone(tz.timezone)} className='remove-button'
                        >
                        <X />
                        </button>
                    )}

                    {/* Time */}
                    <div className="time">
                        <h1>{tz.city} <span>({tz.country})</span></h1>
                    </div>

                    {/* City and Country */}
                    <div className="city-country">
                        <h1>{formatTime(tz.timezone)}</h1>
                        <h2><span>{formatDate(tz.timezone)}</span></h2>
                        {/* <p className="text-blue-300 text-xs">UTC{getTimeOffset(tz.timezone)}</p> */}
                    </div>

                    {/* Visual indicator */}
                    <div className="visual-indicator"></div>
                    </div>
                ))}
                </div>

                {/* Footer */}
                <div className="footer">
                    <p>Mise à jour automatique chaque seconde.</p>
                    <p>Heures basées sur les fuseaux horaires internationaux.</p>
                </div>
            </div>
        </div>
    );
};

export default App;