let btnSearch = document.getElementById("btnSearch");

btnSearch.addEventListener("click", ev => {
    ev.preventDefault();
    let limit = 8;
    let apiKey = "ivNs1oMCIrLAiKZYtW5uzbl93r7s0HoJ";
    let stringSearch = document.getElementById("search").value.trim();
    stringSearch.replace(/\s/g, "+")

    let url = `http://api.giphy.com/v1/gifs/search?q=${stringSearch}&api_key=${apiKey}&limit=${limit}`;
    console.log (url);

    fetch(url)
        .then(response => response.json())
        .then(content => {
            console.log("DATA = ",content.data);
            console.log("METADATA = ", content.meta);

            let results = document.getElementById("results");
            results.innerHTML = "";
            content.data.forEach(element => {
                console.log("URLIMG = ", element.url);
                let image = document.createElement("img");
                image.width = "260";
                image.height = "200";
                image.src = element.images.downsized.url;
                image.alt = element.title;

                results.insertAdjacentElement("afterbegin", image);
            });

        })

        .catch(err => {
            console.log("ERROR = ",err)
        })
})