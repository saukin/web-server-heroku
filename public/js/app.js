console.log("Hello from client side JS")

// fetch('http://puzzle.mead.io/puzzle')
//     .then((resp) => {
//         resp.json()
//             .then((data) => {
//                 console.log(data);
//             })
//     })


const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const loc = document.querySelector("#loc");
const weather = document.querySelector("#weather");

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    fetch(`http://api.weatherstack.com/forecast?access_key=f5613a2080db88aafc1a3328334e0c83&query=${encodeURIComponent(search.value)}`)
    .then((resp) => {
        resp.json()
            .then((data) => {
                if (data.error) {
                    // console.log(data.error);
                    weather.innerHTML = `<h2>${data.error.info}<h2>`;
                    loc.innerText = '';
                } else {
                    loc.innerText = data.request.query;
                    let weath = '';
                    
                    for (let i in data.forecast) {
                        console.log(data.forecast[i]);
                        for (let x in data.forecast[i]) {
                            console.log(data.forecast[i][x]);
                            if (typeof data.forecast[i][x] != 'object') {
                                console.log(i[x]);
                                weath += `<li>${data.forecast[i][x]}</li>`
                            }
                        }
                    }
                    weather.innerHTML = weath;
                }
            })
            .catch((error) => {
                console.log(error)
            }) 
    })
})