import axios from 'axios';

axios.get('https://api.open-meteo.com/v1/forecast?latitude=41.79&longitude=44.74&current_weather=true&timezone=auto')
    .then(res => {
        const apiRes = res.data.current_weather;
        console.log(apiRes);
        document.querySelector('.temp').textContent = `Temperature is ` + apiRes.temperature + `°C`;
        document.querySelector('.wind').textContent = `wind speed is ` + apiRes.windspeed + `km/h`;
        document.querySelector('.time').textContent = `Today is ` + apiRes.time;
    })
    

axios.get('https://date.nager.at/api/v3/publicholidays/2023/RU')
    .then(res => {
        const apiRes2 = res.data[`2`];
        console.log(apiRes2);
        document.querySelector('.day-today').textContent = apiRes2.name;
    })

axios.get('https://content.guardianapis.com/uk-news?api-key=a04d1215-c861-4577-bb98-eacebf2194f9')
    .then(res => {
        const apiRes3 = res.data.response;
        console.log(apiRes3.edition);
        document.querySelector('.title').textContent = apiRes3.edition.webTitle;
        document.querySelector('.url').href = apiRes3.edition.webUrl;
    })

