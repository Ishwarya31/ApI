let data = []
let content = document.querySelector('#content')

const getData = async (link) => {
    let response = await fetch(link) 
    let resData = await response.json()
    return resData
}

 content.innerHTML = `<div class="spinner-border text-primary" role="status">
<span class="visually-hidden"></span>
</div> `

getData("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
    .then((e) => {
        data = e
        if (data === null || data === undefined || data.length === 0) {
            content.innerHTML = `<div class="alert alert-secondary" role="alert">
            No Data
          </div>`
        }
        else {
            putData(data)
        }
    })
    .catch((err) => {
        console.log(err.message)
    })

const putData = (finalData) => {
    content.innerHTML = ''
    finalData.map((id) => content.innerHTML +=
        `
    <div class="card mx-3 my-3" style="width:18rem";stroke="green" stroke-width:10;>
        <div class="card-header text-center">
            ${id.name}
        </div>
         
        <div class="card-body">
             
            <p class="card-text">price:${id.price}</p>
            <p class="card-text">ImgLink:${id.image_link}</p>
            <p class="card-text">PdtLink:${id.product_link }</p>
            <p class="card-text">WebLink: ${id.website_link}</p>
            <p class="card-text">Rating:${id.rating}</p>
            <p class="card-text">Type:${id.product_type}</p>

        </div>
    </div>
    `
    )
}
document.querySelector('#search').addEventListener('input', (event) => {
     
    let finalData = data.filter((id) => id.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
     
    if (event.target.value === ''){
        finalData = finalData.slice(0,10)
    }
    if (finalData.length === 0) {
        content.innerHTML = `<div class="alert alert-danger" role="alert">
        Incorrect Input
      </div>`
    }else{
        putData(finalData)
    }
})
