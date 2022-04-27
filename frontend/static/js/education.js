
const fetchData = async () => {
    const data = await fetch('/edudata')
    const parsedData = await data.json()
    return parsedData
}

const renderContent = (data) => {
    const target = document.querySelector('#edu-content')
    let html =''

   
    data.cz.education.forEach((item, index) => {
        html += `
    
        <h1>${index + 1}</h1>
        <form style="padding: 10px;" id="update-edu-form-${index}"  method="POST" action="/updateeducation/${index}" submit="return false;">

            <label>Title-CZ</label> 
            <input type="text" name="title_cz" id="title_cz${index}" value="${item.title}" required>
            <br>
            <label>Popis-CZ</label> 
            <textarea rows="10" cols="40" type="text" name="desc_cz" id="desc_cz${index}">${item.desc}</textarea>
            <br>

            <label>Title-ES</label> 
            <input type="text" name="title_es" id="title_es${index}" value="${data.es.education[index].title}" required>
            <br>
            <label>Popis-ES</label> 
            <textarea rows="10" cols="40" type="text" name="desc_es" id="desc_es${index}" required>${data.es.education[index].desc}</textarea>
            
            <br>

            <label>Title-EN</label> 
            <input type="text" name="title_en" id="title_en${index}" value="${data.en.education[index].title}" required>
            <br>
            <label>Popis-EN</label> 
            <textarea rows="10" cols="40" type="text" name="desc_en"  id="desc_en${index}"  required>${data.en.education[index].title}</textarea>            
            <input form="update-edu-form-${index}" type="submit" id="update-edu-form-btn${index}">
        </form>
        <form style="padding: 10px;" id="delete-edu-form-${index}"  method="POST" action="/deleteeducation/${index}" submit="return false;">
            <input style="background: red;" form="delete-edu-form-${index}" type="submit" id="delete-edu-form-btn${index}" value="delete">
        </form>
        <hr>
        <hr>
        <br>
        <br>
            
        `


    })
    target.innerHTML = html
    // const updateFormBtn = document.querySelectorAll('.update-form-btn')
    // updateFormBtn.forEach(btn => {
    //     btn.addEventListener('click', (e) => {
    //         e.preventDefault()
    //         console.log('update')
    //         updateContent(e)
    //     })
    // })
}

const renderPage = async () => {
    const data = await fetchData()
    renderContent(data)
}
if(location.pathname === '/education'){
    renderPage()
}

