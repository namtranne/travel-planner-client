import 'dotenv/config';

export default {
    expo: {
        name: 'eztrippin-travel-planner',
        slug: 'eztrippin-travel-planner',
        scheme: 'eztrippintravelplanner',
        extra: {
            API_URL_LOCAL: process.env.API_URL_LOCAL,
            SERVER_URL_LOCAL: process.env.SERVER_URL_LOCAL,
            eas: {
                projectId: 'e9530fce-66a7-44c5-b51d-e49a76af46f9'
            }
        },
        android: {
            package: 'com.ngvahiu.eztrippintravelplanner'
        },
        ios: {
            bundleIdentifier: 'com.ngvahiu.eztrippintravelplanner'
        }
    }
};
