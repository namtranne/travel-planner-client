import authAxios from '../utils/axios';

export const fetchLocations = async (search?: string) => {
    const response = await authAxios.get('locations', {
        params: { search }
    });
    return response.data.data.map((item: any) => ({
        id: item.id,
        title: item.name, // Ensure this matches API response
        subtitle:
            item.stateName && item.stateName !== 'null' ? `${item.stateName}, ${item.countryName}` : item.countryName // Handle missing stateName
    }));
};

export const fetchExplorePage = async (locationId: number) => {
    if (!locationId) throw new Error('Location ID is required');

    const response = await authAxios.get(`locations/${locationId}/explore`);
    return response.data.data;
};
