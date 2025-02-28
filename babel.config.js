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
                        'material-symbols:close',
                        'lets-icons:back-light',
                        'mdi:filter',
                        'solar:calendar-linear',
                        'mi:location',
                        'weui:share-outlined',
                        'ph:dots-three',
                        'mingcute:notification-line',
                        'mdi:account',
                        'tabler:trash-off',
                        'pepicons-pencil:leave',
                        'material-symbols:settings-outline',
                        'mdi:eye-outline',
                        'mdi:eye-off-outline',
                        'mdi:translate',
                        'mdi:history',
                        'mdi-light:bell',
                        'material-symbols:help-outline',
                        'solar:shield-line-duotone',
                        'akar-icons:file',
                        'devicon:facebook',
                        'skill-icons:instagram',
                        'mdi-light:comment',
                        'carbon:password',
                        'mingcute:down-line',
                        'mingcute:up-line',
                        'fontisto:map-marker',
                        'mdi:information-outline',
                        'material-symbols:star',
                        'mdi:clock-outline',
                        'ic:baseline-phone',
                        'material-symbols:map'
                    ]
                }
            ]
            // require.resolve('expo-router/babel')
        ]
    };
};
