// fetch header data

// on load button clicked

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

// fetching the news
const fetchNews = (newsCategory) =>{
    const  url = `https://openapi.programming-hero.com/api/news/category/${newsCategory}`
    fetch(url)
    .then(res => res.json())
    .then((data) => showNews(data.data))
    .catch(err => console.log(err))
}

const displayHeader = (data) =>{
    const headerUl = document.getElementById("navUl")
   
    data.map(element => {
        const headerli = document.createElement("li")
        headerli.classList = "nav-item"
        headerli.innerHTML = `
            <a class="nav-link common-nav" id =${element.category_id} onclick="displayNews(this.id);"  target="_blank" rel="noopener noreferrer">${element.category_name}</a>
        `
        // setting active nav
        headerUl.appendChild(headerli)
        
    });
    
}


// taking id from link element
const displayNews = (id) =>{
    fetchNews(id)
    toggleLoader(true)
}
// sorting by views and showing according to the views

const showNews = (news) =>{
    // sorted object
    const sortedObj = (news.sort((a,b) => b.total_view - a.total_view));
    
    // getting  element from DOM
    const newsSection = document.getElementById('news-section');
    newsSection.textContent ='';
      // stop spinner
    toggleLoader(false)

    if(sortedObj.length > 0){
        
        sortedObj.map( element =>{
            console.log(element)
            const newsItem = document.createElement("div");
            newsItem.innerHTML = `
            <div class="card mb-3" style="max-width: 740px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${element.image_url} class="img-fluid rounded-start mt-2" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title pb-2">${element.title}</h5>
                        <p class="card-text detail-text">${element.details}</p>
                    </div>
                </div>
                    <div class="d-flex flex-row ps-3 justify-content-between">
                        <div  class="d-flex flex-row ps-3">
                            <img src=${element.author.img} class="avatar me-2" alt="avatar">
                            <div class="d-flex flex-column mb-2">
                                <p class="card-text text-muted mb-0 fw-bold">${element.author.name ? element.author.name : "Unknown Author" }</p>
                                <p class="card-text"><small class="text-muted">${element.author.published_date}</small></p>
                            </div>
                        </div>
                        <div class="d-flex ps-5">
                            <span class="pe-3 fw-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                </svg>
                            </span>
                            <p class="fw-bold">${element.total_view ? element.total_view :"No View"}</p>
                        </div>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          Launch static backdrop modal
                        </button>
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">${element.title}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        ...
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Understood</button>
                                    </div>
                                    </div>
                                </div>
                            </div>

                    </div> 
                   
                </div>
            </div>
          `
            newsSection.appendChild(newsItem)
            
        })
    }

    const totlaNewsItem = document.getElementById('total-items');
    totlaNewsItem.textContent = "";
 

    const getTotalLength = document.createElement('div')
    if(sortedObj.length > 0 ){
        getTotalLength.innerHTML =`
        <div class="jumbotron jumbotron-fluid bg-light">
            <div class="container length-bg">
                <p class="lead">Total ${sortedObj.length}  items found for this category.</p>
            </div>
            <div class="sort-section container d-flex">
                <p class="fw-bold me-2">Sort By View:</p>
                <small> Default &#x21D3;</small>
            </div>
        </div>
    `
    }else{
        getTotalLength.innerHTML =`
        <div class="jumbotron jumbotron-fluid bg-light">
            <div class="container length-bg">
                <p class="lead fw-bold">No news found for you!!!</p>
            </div>
            <div class="sort-section container d-flex">
                <p class="fw-bold me-2">Sort By View:</p>
                <small> Default &#x21D3;</small>
            </div>
        </div>`
    }
    
    totlaNewsItem.appendChild(getTotalLength);

    // const modal = () =>{
        
    // }
   
}

// spinner

const toggleLoader = isLoading =>{
    const loader = document.getElementById('spinner')
    if(isLoading){
        loader.classList.remove('d-none')
    }else if(!isLoading){
        loader.classList.add('d-none')
    }
}

