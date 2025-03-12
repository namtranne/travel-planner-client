import authAxios from '../utils/axios';

export const fetchLocations = async (search?: string) => {
    console.log(search);
    const response = await authAxios.get('location', {
        params: { search }
    });
    console.log(response);
    return response.data.data.map((item: any) => ({
        id: item.id,
        title: item.name, // Ensure this matches API response
        subtitle: item.stateName ? `${item.stateName}, ${item.countryName}` : item.countryName // Handle missing stateName
    }));
};
