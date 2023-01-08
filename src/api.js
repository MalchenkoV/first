import axios from 'axios';

export async function getForecast() {
    return axios.get('https://api.open-meteo.com/v1/forecast?latitude=41.79&longitude=44.74&current_weather=true&timezone=auto')
}

export async function getHolidays () {
    return axios.get('https://date.nager.at/api/v3/publicholidays/2023/RU')
}

export async function getNews () {
    return axios.get('https://content.guardianapis.com/uk-news?api-key=a04d1215-c861-4577-bb98-eacebf2194f9&show-blocks=body:latest:10')
}


