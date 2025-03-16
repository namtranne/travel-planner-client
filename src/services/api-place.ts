import authAxios from '../utils/axios';

// Place
export async function searchPlaces(searchQuery: string) {
    const data = await authAxios
        .get('/places', { params: { query: searchQuery } })
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}
