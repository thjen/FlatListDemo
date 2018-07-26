var horizontalStatus = {
    rainy: {
        ios: "ios-rainy",
        android: "md-rainy"
    },
    cloud: {
        ios: "ios-cloud",
        android: "md-cloud"
    },
    thunderstorm: {
        ios: "ios-thunderstorm",
        android: "md-thunderstorm"
    },
    sunny: {
        ios: "ios-sunny",
        android: "md-sunny"
    }
};
var horizontalFlatListData = [
    {
        hour: "1 AM",
        status: horizontalStatus.rainy,
        degrees: 57
    },
    {
        hour: "5 PM",
        status: horizontalStatus.sunny,
        degrees: 77
    },
    {
        hour: "8 AM",
        status: horizontalStatus.thunderstorm,
        degrees: 65
    },
    {
        hour: "1 PM",
        status: horizontalStatus.cloud,
        degrees: 24
    },
    {
        hour: "8 PM",
        status: horizontalStatus.rainy,
        degrees: 32
    },
    {
        hour: "10 PM",
        status: horizontalStatus.rainy,
        degrees: 42
    },
    {
        hour: "11 AM",
        status: horizontalStatus.cloud,
        degrees: 81
    },
    {
        hour: "12 PM",
        status: horizontalStatus.thunderstorm,
        degrees: 72
    },
    {
        hour: "9 AM",
        status: horizontalStatus.sunny,
        degrees: 92
    },
    {
        hour: "7 AM",
        status: horizontalStatus.sunny,
        degrees: 52
    },
    {
        hour: "9 PM",
        status: horizontalStatus.rainy,
        degrees: 43
    },
    {
        hour: "2 AM",
        status: horizontalStatus.cloud,
        degrees: 52
    },
    {
        hour: "3 PM",
        status: horizontalStatus.thunderstorm,
        degrees: 62
    },
];
export {horizontalStatus}; // make public
export {horizontalFlatListData};