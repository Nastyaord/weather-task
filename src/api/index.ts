const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || ''

async function fetchData(url: string) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`There was a problem with the fetch operation: ${error}`);
    }
}

export const getWeatherByCityName = async (cityName: string) => {
    return await fetchData(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${cityName}`);
}

export const getCityInfo = async (cityName: string) => {
    return await fetchData(`https://en.wikipedia.org/w/api.php?action=query&titles=${cityName}&prop=extracts&exlimit=max&format=json`);
}
