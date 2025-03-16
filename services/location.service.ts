import { store } from '@/store';
import { UserLocation } from '@/types';

const defaultLocations: UserLocation[] = [
    { id: 1, name: 'Sample Home', lat: 28.6139, lng: 77.209 },
    { id: 2, name: 'Sample Work', lat: 30.7333, lng: 76.7794 },
];

export const fetchUserLocations = async (type: string): Promise<UserLocation[]> => {
    const locations =
        store.getState().location.locations || defaultLocations;
    try {
        if (!navigator.geolocation) {
            console.warn(
                'Geolocation is not supported by this browser.'
            );
            return !type ? locations : [];
        }

        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = [
                        {
                            id: 3,
                            name: 'Current Location',
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    ];

                    resolve(userLocation);
                    return userLocation;
                },
                (error) => {
                    console.error(
                        'Error getting user location:',
                        error
                    );
                    resolve(defaultLocations);
                    return !type ? locations : [];
                }
            );
        });
    } catch (error) {
        console.error(
            'Unexpected error fetching user locations:',
            error
        );
        return !type ? locations : [];
    }
};
