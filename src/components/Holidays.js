import React from "react";
import { useEffect, useState } from "react";
import { getHolidays } from "../api";

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

export function Holidays() {
    const [dayToday, setDayToday] = useState({});
    const date = new Date();

    useEffect(() => {
        async function fetchHolidays() {
            const { data } = await getHolidays();
            const dateFormat = date.getFullYear() + '-' + pad((date.getMonth() + 1), 2) +'-' + pad(date.getDay(), 2);
            
            setDayToday({
                holiday: 'Just ordinary day:('
            })
            for (const key in data) {
                if (dateFormat == data[key].date) {
                    setDayToday({
                        holiday: data[key].name
                    });
                };
            };
        };

        fetchHolidays();
    }, [])

    return (
        <div className='data-box'>
            <h2 className='header'>Today is</h2>
            <h2 className='today-is'>{dayToday.holiday}</h2>
        </div>
    )
}