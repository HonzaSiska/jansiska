addEventListener('DOMContentLoaded', ()=> {
    const getContent = async () => {
        const fetchedData = await fetch('/introdata')
        const parsedData = await fetchedData.json()
        //console.log(fetchedData)
        console.log(parsedData)
    
        return parsedData
        //return fetchedData
    }
    
    const renderData = async () => {
        const introCz = document.querySelector('#intro-cz')
        const introEs = document.querySelector('#intro-es')
        const introEn = document.querySelector('#intro-en')

        const data = await getContent()

        introCz.value = data.cz
        introEs.value = data.es
        introEn.value = data.en

        console.log(data)
        return
    
    }

    renderData()


    //update intro data

    const update = async (e) => {
        e.preventDefault()

        const error = document.querySelector("#error")
        const introCz = document.querySelector('#intro-cz').value
        const introEs = document.querySelector('#intro-es').value
        const introEn = document.querySelector('#intro-en').value
        const body = {
            cz: introCz,
            es: introEs,
            en: introEn
        }
        try {
            const updatedData = await fetch('/introupdate',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
    
            })

            let result = await updatedData.json()
            result = JSON.parse(result)
            error.innerHTML = 'Success!!'
            scrollTo(0,0)

            introCz = result.cz
            introEs = result.es
            introEn = result.en  

        } catch (error) {
            error.innerHTML = 'CHYBA !!'
            scrollTo(0,0)
        }
        
    }

    const updateBtn = document.querySelector('#update-intro-btn')
    updateBtn.addEventListener('click', (e) => {
        update(e)
    })
   
})

