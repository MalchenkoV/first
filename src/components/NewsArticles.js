import React from "react";
import { useEffect, useState } from "react";
import { getNews } from "../api";

export function NewsArticles() {
    const [  newsParam, setNewsParam] = useState({});

    useEffect(() => {
        async function fetchNews() {
            const { data } = await getNews();
            const articles = document.getElementById('articles');

            setNewsParam({
                title: data.response.edition.webTitle,
                titleUrl: data.response.edition.webUrl
            });

            for (const key in data.response.results) {
                newsParam.articleTitle = data.response.results[key].webTitle
                newsParam.articleUrl = data.response.results[key].webUrl
                const li = document.createElement('li');
                const article = document.createElement('a');
                li.className = 'url';
                article.className = 'url';
                article.target = '_blank';

                article.textContent = newsParam.articleTitle;
                article.href = newsParam.articleUrl;
                li.appendChild(article);
                articles.appendChild(li);
            };
        };

        fetchNews();
    }, [])

    return (
        <div className='data-box'>
            <a href={newsParam.titleUrl} className='title' target="_blank" rel="noopener noreferrer">{newsParam.title}: Last 10 articles</a>
            <ul id='articles'></ul>
        </div>
    )
}
