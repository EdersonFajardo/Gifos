let btnSearch = document.getElementById("btnSearch");
let searchForm = document.getElementById("searchForm");
let offset = 0;

//

const searchIcon = (icon = "close") =>{
    let realIcon = document.getElementsByClassName("searchIcon")[0];
    console.log("icon = "+icon)
    if (icon == "close") {
        realIcon.classList.replace("fa-search","fa-times");
        btnSearch.setAttribute("actionBtn", "close");
    }
    else if(icon == "search") {
        let results = document.getElementById("results");
        results.innerHTML = "";
        realIcon.classList.replace("fa-times", "fa-search");
        btnSearch.setAttribute("actionBtn", "search");
        searchForm.reset();
    }
}

const getPictures = async (viewMore = false, limit = 8) =>{
    let apiKey = "ivNs1oMCIrLAiKZYtW5uzbl93r7s0HoJ";
    let stringSearch = document.getElementById("search").value.trim();
    stringSearch = stringSearch.replace(" ", "+")
    let url = `http://api.giphy.com/v1/gifs/search?q=${stringSearch}&api_key=${apiKey}&limit=${limit}&offset=${offset}`;

    await fetch(url)
        .then(response => response.json())
        .then(content => {
            console.log("DATA = ",content.data);
            console.log("METADATA = ", content.meta);

            let results = document.getElementById("results");
            if (viewMore == false ) 
                results.innerHTML = "";                
             
            content.data.forEach(element => {
                console.log("URLIMG = ", element.url);
                let image = document.createElement("img");
                image.width = "260";
                image.height = "200";
                image.src = element.images.downsized.url;
                image.alt = element.title;

               // results.insertAdjacentElement("afterbegin", image);
               results.appendChild(image);
            });

        })
        .catch(err => {
            console.log("ERROR = ",err)
        })

    searchIcon();
}

//autocomplete search
const autocompleteSearch = async () => {
    let apiKey = "ivNs1oMCIrLAiKZYtW5uzbl93r7s0HoJ";
    let stringSearch = document.getElementById("search").value.trim();
    stringSearch = stringSearch.replace(" ", "+")
    let urlTag = `http://api.giphy.com/v1/gifs/search/tags?q=${stringSearch}&api_key=${apiKey}`;
    console.log(urlTag);

    await fetch(urlTag)
    .then(response => response.json())
    .then(info => {
       //console.log("DATA = ", info)

       info.data.forEach(element => {
        console.log("NAME =", element.name);
       })
        
        console.log(stringSearch)
    })
}

let searchInput = document.getElementById("search");


searchInput.addEventListener("keyup", event => {
    autocompleteSearch()
})

//

btnSearch.addEventListener("click", ev => {
    ev.preventDefault();
    if (btnSearch.getAttribute("actionBtn") == "close") {
        searchIcon("search"); 
    }
    else {
        offset = 0;
        getPictures();
    }
})

searchForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    offset = 0;
    getPictures();
})

//SEE MORE BUTTON

let btnSeeMore = document.getElementById("btnSeeMore");

btnSeeMore.addEventListener("click", ev =>{
    ev.preventDefault();
    offset += 8;
    getPictures(true);

})