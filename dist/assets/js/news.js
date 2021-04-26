let key = "9da2f50e-ccc9-43a2-b904-323e93881032";
let url = "https://seraphic-news.microcms.io/api/v1/";
const limit_news = 5

function get(path, params = "", callback) {
    $.ajaxSetup({
        cache: false,
        headers: {
            "X-API-KEY": key,
        },
    });
    $.getJSON(url + path, params)
        .done(function (data) {
            callback(data);
        })
        .fail(function (e) {
            window.location.href = "/"
        });
}

initListNews();

function initListNews() {
    const params = {
        limit: limit_news,
        offset: 0,
        fields: 'id,date,title,link,img'
    };
    const url = "news";
    get(url, params, createNewsHtml);
}

function createNewsHtml(data) {
    const list_news = document.querySelector('#section__news .list-news');
    for (let i = 0; i < data.contents.length; i++) {
        const line = data.contents[i];

        let div = document.createElement('div');
        div.classList.add("news-item");

        let div_2 = document.createElement('div');
        div.appendChild(div_2);

        let p = document.createElement('p');
        p.classList.add("date-time");

        let content = document.createElement('div');
        content.classList.add("content");

        div_2.appendChild(p);
        div_2.appendChild(content);

        const dateTime = new Date(line.date);
        const year = dateTime.getFullYear().toString();
        const monthChange = dateTime.getMonth() + 1;
        const month = (monthChange < 10) ? "0" + monthChange.toString() : "" + monthChange.toString();
        const date = (dateTime.getDate() < 10) ? "0" + dateTime.getDate().toString() : "" + dateTime.getDate().toString();
        p.innerHTML = year + "/" + month + "/" + date;

        const img = document.createElement("img");

        if (line.img != null) {
            let figure = document.createElement('figure');
            figure.appendChild(img);
            img.src = line.img.url;
            img.alt = line.title;
            div.appendChild(figure);
            div.classList.add("has-img");
        }

        if (line.link != null) {
            const a = document.createElement("a");
            a.appendChild(document.createTextNode(line.title));
            a.href = line.link;
            a.title = line.title;
            a.target = "_blank";
            content.appendChild(a);
        } else {
            content.appendChild(document.createTextNode(line.title));
        }
        list_news.appendChild(div);
    }
};
