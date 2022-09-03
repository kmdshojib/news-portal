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

const showNews = (news) =>{
    console.log(news.sort((a,b) => b.total_view - a.total_view))
}
const fetchNews = (newsCategory) =>{
    const  url = `https://openapi.programming-hero.com/api/news/category/${newsCategory}`
    fetch(url)
    .then(res => res.json())
    .then((data) => showNews(data.data))
    .catch(err => console.log(err))
}



