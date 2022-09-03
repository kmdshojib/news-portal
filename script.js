// fetch header data

const newsHeader = async () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try{
        const res = await fetch(url)
        const data = await res.json()
        displayHeader(data.data.news_category)
    }
    catch(err){
        console.log(err)
    }

}
newsHeader()



const displayHeader = (data) =>{
    const headerUl = document.getElementById("navUl")
   
    data.map(element => {
        const headerli = document.createElement("li")
        headerli.classList = "nav-item"
        headerli.innerHTML = `
            <a class="nav-link" id =${element.category_id} onclick="displayNews(this.id)"  target="_blank" rel="noopener noreferrer">${element.category_name}</a>
        `
        headerUl.appendChild(headerli)
    });
}
// taking id from link element
const displayNews = (id) =>{
    fetchNews(id)
    
}

// sorting by views and showing according to the views

const showNews = (news) =>{
    // sorted object
    const sortedObj = (news.sort((a,b) => b.total_view - a.total_view));
    // getting  element from DOM
    const newsSection = document.getElementById('news-section');
    newsSection.textContent ='';
    if(sortedObj.length > 0){
        sortedObj.map( element =>{
            console.log(element)
            const newsItem = document.createElement("div");
            newsItem.innerHTML = `
            <div class="card mb-3" style="max-width: 740px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${element.image_url} class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${element.title}</hh5>
                        <p class="card-text">${element.details}</p>
                    </div>
                </div>
                <div class="d-flex flex-column">
                        <img src=${element.author.img} class="avatar" alt="avatar">
                        <div class="d-flex flex-row">
                            <p class="card-text"><small class="text-muted">${element.author.name}</small></p>
                            <p class="card-text"><small class="text-muted">${element.author.published_date}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            `
            newsSection.appendChild(newsItem)
        })
        
    }
}

// fetching the news
const fetchNews = (newsCategory) =>{
    const  url = `https://openapi.programming-hero.com/api/news/category/${newsCategory}`
    fetch(url)
    .then(res => res.json())
    .then((data) => showNews(data.data))
    .catch(err => console.log(err))
}



