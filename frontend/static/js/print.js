const fetchData = async (url) => {
    const data = await fetch(url)
    const parsedData = await data.json()
    console.log(parsedData)
    return parsedData
}

const renderData = async(url) => {
    const data = await fetchData(url)  
    const content = document.querySelector('#resume-content')
    // intro.innerHTML= data.data.cz[0].title

    let language = localStorage.getItem('lang')

    switch (language) {
        case  '':
            language =  'cz'
            break;
    
        default:
            language = language;
    }
    
    const tl = data.data[language]
    const introduction = data.description[language].intro
    const tlTitle = data.description[language].tlTitle
    const eduTitle = data.description[language].eduTitle
    const skillsTitle = data.description[language].skillsTitle
    const education = data.description[language].education //array
    const skills = data.description[language].skills  //array


    let html = `
        <br>
        <p>${introduction}</p>
        <br>
        <h1>${tlTitle }</h1>
        <br>
        <ul>
    `

    tl.forEach(item => {
        html += `
            <li >
                <h3>${item.year} ${item.title}</h3>
                <p class="tl-list-item-text">${item.desc}</p>
            </li>
            <br>

            
        `
    })
    html += '</ul>'
    html += `
        <br><hr><br>
        <h1>${eduTitle}</h1>
        <br><ul>

    `

    education.forEach(edu => {
        html += `
        <li>
        <h3>${edu.title} </h3>
        <p>${edu.desc}</p>
    </li><br>
        `
    })
    html += '</ul>'

    html += `
    <br><hr><br>
    <h1>${skillsTitle}</h1>
    <br><ul>

`

    skills.forEach(skill => {
        html += `
        <li>
            - ${skill}
        </li>
        `
    })
    html += '</ul>'


        content.innerHTML = html

    }


if(window.location.pathname === '/print'){
    
    renderData('/printdata')

}