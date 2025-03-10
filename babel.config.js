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
                        'mdi:eye-outline',
                        'mdi:eye-off-outline',
                        'mdi:account',
                        'pepicons-pencil:leave',
                        'material-symbols:settings-outline',
                        'tabler:trash-off',
                        'mdi:translate',
                        'mdi:history',
                        'mdi-light:bell',
                        'carbon:password',
                        'material-symbols:help-outline',
                        'mdi-light:comment',
                        'solar:shield-line-duotone',
                        'akar-icons:file',
                        'devicon:facebook',
                        'skill-icons:instagram',
                        'mdi:chevron-down',
                        'mdi:chevron-right',
                        'bi:three-dots',
                        'mdi:pencil',
                        'mdi:trash-can',
                        'mdi:dots-grid',
                        'mdi-light:map-marker',
                        'mdi-light:note',
                        'material-symbols-light:checklist',
                        'mdi:view-grid-outline',
                        'mdi:chevron-up',
                        'mdi:briefcase-outline',
                        'fluent:note-48-filled'
                    ]
                }
            ]
            // require.resolve('expo-router/babel')
        ]
    };
};
