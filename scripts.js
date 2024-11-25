// Sports News API
const newsApiKey = '94041dcdf6bd4677931ebd0bad50c574';
const newsContainer = document.getElementById('news-articles');

async function fetchSportsNews() {
    if (newsContainer) {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=sports&apiKey=${newsApiKey}`);
        const data = await response.json();
        displayNewsArticles(data.articles);
    }
}

function displayNewsArticles(articles) {
    newsContainer.innerHTML = articles.map(article => `
        <article>
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        </article>
    `).join('');
}

fetchSportsNews();

// Stock Information API
const stockApiKey = 'EGD5KWXJ4FLJZK88';
const stockContainer = document.getElementById('stock-info');
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

async function fetchStockInfo(symbols) {
    if (stockContainer) {
        const stockPromises = symbols.map(symbol => 
            fetch(`${proxyUrl}https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${stockApiKey}`)
                .then(response => response.json())
                .then(data => data['Global Quote'])
        );

        const stocks = await Promise.all(stockPromises);
        displayStockInfo(stocks);
    }
}

function displayStockInfo(stocks) {
    stockContainer.innerHTML = `
        <table>
            <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Change</th>
                <th>Change Percent</th>
            </tr>
            ${stocks.map(stock => `
            <tr>
                <td>${stock['01. symbol']}</td>
                <td>$${stock['05. price']}</td>
                <td>${stock['09. change']}</td>
                <td>${stock['10. change percent']}</td>
            </tr>
            `).join('')}
        </table>
    `;
}

// Fetch top 3 news stories
const topNewsContainer = document.getElementById('top-news');

async function fetchTopNews() {
    if (topNewsContainer) {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`);
        const data = await response.json();
        displayTopNews(data.articles.slice(0, 3));
    }
}

function displayTopNews(articles) {
    topNewsContainer.innerHTML = articles.map(article => `
        <article>
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        </article>
    `).join('');
}

fetchTopNews();