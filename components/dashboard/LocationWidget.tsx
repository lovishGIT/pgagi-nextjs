// components/dashboard/LocationWidget.tsx
import React, { useState } from 'react';
import Link from 'next/link';

interface Location {
    id: number;
    name: string;
    lat: number;
    lng: number;
}

interface LocationWidgetProps {
    locations: Location[];
}

const LocationWidget: React.FC<LocationWidgetProps> = ({
    locations,
}) => {
    const [selectedLocation, setSelectedLocation] =
        useState<Location | null>(
            locations && locations.length > 0 ? locations[0] : null
        );
    const [isAddingLocation, setIsAddingLocation] = useState(false);
    const [newLocationName, setNewLocationName] = useState('');

    // For demo purposes - in a real app, this would make an API call
    const handleAddLocation = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAddingLocation(false);
        setNewLocationName('');
        // You would typically make an API call to add the location here
        alert(
            `Location "${newLocationName}" would be added with geocoding API`
        );
    };

    return (
        <div className="bg-white text-black rounded-lg shadow-md p-6 h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">My Locations</h2>
                <button
                    onClick={() =>
                        setIsAddingLocation(!isAddingLocation)
                    }
                    className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                >
                    {isAddingLocation ? 'Cancel' : '+ Add'}
                </button>
            </div>

            {isAddingLocation ? (
                <form onSubmit={handleAddLocation} className="mb-4">
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="locationName"
                            className="text-sm font-medium text-gray-700"
                        >
                            Location Name
                        </label>
                        <input
                            type="text"
                            id="locationName"
                            value={newLocationName}
                            onChange={(e) =>
                                setNewLocationName(e.target.value)
                            }
                            placeholder="e.g. Home, Work, Gym"
                            className="border rounded-md px-3 py-2 text-sm"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-700"
                        >
                            Add Location
                        </button>
                    </div>
                </form>
            ) : null}

            {locations.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                    <p>No locations saved yet.</p>
                    <button
                        onClick={() => setIsAddingLocation(true)}
                        className="text-blue-600 hover:text-blue-800 mt-2"
                    >
                        Add your first location
                    </button>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <div className="grid grid-cols-1 gap-2">
                            {locations.map((location) => (
                                <button
                                    key={location.id}
                                    onClick={() =>
                                        setSelectedLocation(location)
                                    }
                                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                                        selectedLocation?.id ===
                                        location.id
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <div className="mr-3">
                                            <svg
                                                className="h-5 w-5 text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                {location.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {location.lat.toFixed(
                                                    4
                                                )}
                                                ,{' '}
                                                {location.lng.toFixed(
                                                    4
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedLocation && (
                        <div className="border-t pt-4">
                            <h3 className="font-medium mb-2">
                                Selected Location
                            </h3>
                            <div className="bg-gray-50 p-3 rounded-md">
                                <div className="font-medium">
                                    {selectedLocation.name}
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                    Lat:{' '}
                                    {selectedLocation.lat.toFixed(6)},
                                    Lng:{' '}
                                    {selectedLocation.lng.toFixed(6)}
                                </div>
                                <div className="flex space-x-2 mt-3">
                                    <Link
                                        href={`/weather?lat=${selectedLocation.lat}&lng=${selectedLocation.lng}`}
                                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
                                    >
                                        View Weather
                                    </Link>
                                    <button className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border hover:bg-gray-100">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LocationWidget;
