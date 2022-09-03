// fetch header data

const newsHeader = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'

    fetch(url)
    .then(res => res.json())
    .then(data => displayHeader(data.data.news_category))
    .catch(err => console.log(err))
}
newsHeader()



const displayHeader = (data) =>{
    const headerUl = document.getElementById("navUl")
   
    data.map(element => {
        const headerli = document.createElement("li")
        headerli.classList = "nav-item"
        headerli.innerHTML = `
            <a class="nav-link" onclick="displayNews(this.id)" id =${element.category_id} target="_blank" rel="noopener noreferrer">${element.category_name}</a>
        `
        headerUl.appendChild(headerli)
        console.log(element)
    });
}

const displayNews = (id) =>{
    console.log(id)
}

