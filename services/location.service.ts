import { AppDispatch, store } from '@/store';
import { setLocations } from '@/store/slices/location.slice';
import { UserLocation } from '@/types';

const defaultLocations: UserLocation[] = [
    { id: 1, name: 'Sample Home', lat: 28.6139, lng: 77.209 },
    { id: 2, name: 'Sample Work', lat: 30.7333, lng: 76.7794 },
];

export const fetchUserLocations = async (dispatch: AppDispatch): Promise<UserLocation[]> => {
    const locations =
        store.getState().location.locations || defaultLocations;
    try {
        if (!navigator.geolocation) {
            console.warn(
                'Geolocation is not supported by this browser.'
            );
            return defaultLocations;
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

                    dispatch(setLocations(userLocation));
                    resolve(userLocation);
                    return userLocation;
                },
                (error) => {
                    console.error(
                        'Error getting user location:',
                        error
                    );
                    resolve(defaultLocations);
                    return defaultLocations;
                }
            );
        });
    } catch (error) {
        console.error(
            'Unexpected error fetching user locations:',
            error
        );
        return defaultLocations;
    }
};
