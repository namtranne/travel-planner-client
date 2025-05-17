import authAxios from '../utils/axios';

export async function getSystemNotifications() {
    const data = await authAxios
        .get('/notifications/system')
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function getNotifications() {
    const data = await authAxios
        .get('/notifications')
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function getNotificationDetails(notificationId: number) {
    const data = await authAxios
        .get(`/notifications/${notificationId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function markNotificationAsRead(notificationId: number) {
    const data = await authAxios
        .patch(`/notifications/${notificationId}/read`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}

export async function deleteNotification(notificationId: number) {
    const data = await authAxios
        .delete(`/notifications/${notificationId}`)
        .then((response) => response.data.data)
        .catch((err) => {
            throw new Error(err.response.data.message);
        });
    return data;
}
