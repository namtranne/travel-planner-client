module.exports = (api) => {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'nativewind/babel',
            [
                'module-resolver',
                {
                    alias: {
                        // This needs to be mirrored in tsconfig.json
                        '@': './'
                    }
                }
            ],
            [
                'react-native-iconify/babel',
                {
                    icons: [
                        'basil:user-outline',
                        'clarity:email-line',
                        'mdi:password-outline',
                        'lets-icons:back-light',
                        'fa-solid:place-of-worship',
                        'arcticons:budgetbakers-wallet',
                        'icon-park-solid:tips-one',
                        'gis:map-favorite',
                        'grommet-icons:next',
                        'material-symbols:star',
                        'hugeicons:location-favourite-01',
                        'lets-icons:home',
                        'material-symbols:calendar-month',
                        'iconamoon:profile-fill',
                        'material-symbols:search',
                        'material-symbols:close'
                    ]
                }
            ]
            // require.resolve('expo-router/babel')
        ]
    };
};
