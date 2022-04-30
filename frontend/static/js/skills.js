const fetchData = async () => {
    const data = await fetch('/skillsdata')
    const parsedData = await data.json()
    return parsedData
}


const renderContent = (data) => {
    const target = document.querySelector('#skills-content')
    let html =''

   
    data.cz.skills.forEach((item, index) => {
        html += `
    
        <h1>${index + 1}</h1>
        <form  id="update-skill-form-${index}"  method="POST" action="/updateskill/${index}" >
            <label>Skill-CZ</label><br> 
            <textarea rows="10" cols="40" type="text" name="skill_cz"  required>${item}</textarea>
            <br>
            <label>Skill-ES</label> <br> 
            <textarea rows="10" cols="40" type="text" name="skill_es"  required>${data.es.skills[index]}</textarea>
            <br>

            <label>Skill-EN</label> <br> 
            <textarea rows="10" cols="40" type="text" name="skill_en"  required>${data.en.skills[index]}</textarea>


            <input form="update-skill-form-${index}" type="submit" value="Update Skill" >
        </form>


        <form  id="delete-skill-form-${index}"  method="POST" action="/deleteskill/${index}" >
            <input style="background: red;padding: 10px;" form="delete-skill-form-${index}" type="submit" id="delete-skill-form-btn${index}" value="delete">
        </form>
        <hr>
        <hr>
        <br>
        <br>
            
        `


    })
    target.innerHTML = html
   
}

const renderPage = async () => {
    const data = await fetchData()
    renderContent(data)
}
if(location.pathname === '/skills'){
    renderPage()
}