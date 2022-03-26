import Dashboard from "./views/Dashboard.js";
import Resume from "./views/Resume.js";
import DashboardEnglish from "./views/DashboardEnglish.js";
import ResumeEnglish from "./views/ResumeEnglish.js";
import DashboardEspanol from "./views/DashboardEspanol.js";
import ResumeEspanol from "./views/ResumeEspanol.js";

import  "./components/switch.js"
import  "./components/navEnglish.js"
import  "./components/navEspanol.js"
import  "./components/navCzech.js"



const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/resume", view: Resume },
        { path: "/en", view: DashboardEnglish },
        { path: "/resume/en", view: ResumeEnglish },
        { path: "/es", view: DashboardEspanol },
        { path: "/resume/es", view: ResumeEspanol }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});



const body = document.querySelector('body')
addEventListener('DOMContentLoaded', () => {
    
    const getMode = localStorage.getItem('mode')
    console.log('local storage',getMode)
    
    if(getMode){
        document.querySelector('mode-switch').setAttribute('colormode', getMode)
        body.classList.add(`${getMode}`)
    }else{
        document.querySelector('mode-switch').setAttribute('colormode', 'dark')
        body.classList.add(`dark`)
    }

    /// LANGUAGES SELECTION

    const language = localStorage.getItem('lang')
    if(!language){
        localStorage.setItem('lang','cz')

    }
    const languageBar = document.querySelector('#language-selector')
    const anchors = document.querySelectorAll('.language-selector-anchor')
    

   
    
    // MAKE LANGUAGES INVISIBLE FIRST AND THEN MAKE VISIBLE BASED ON URL
    anchors.forEach(anchor => {
        let langAnchor = anchor.getAttribute('data-url')
     
        anchor.removeAttribute('data-active')  
        console.log('link', langAnchor)
        console.log('language', language)
        if(langAnchor === '/' + language || (langAnchor === '/' && language===null)){ 
            anchor.setAttribute('data-active','')
        }
    })

    const redirectToLanguage = anchor => {
        if(anchor.dataset.url === ''){
            localStorage.removeItem('lang') 
        }else{
            localStorage.setItem('lang', anchor.dataset.url.replace('/',''))
        }
       
        location.replace(anchor.dataset.url)
    }

    //FUNCTION ADS LINK TO EACH LANGUAGE     
    const setLangRedirect = () => {
        anchors.forEach(anchor => {
            //THIS DIMS LANGUAGES IN THE SELECTION WE ARE NOT CURRENTLY ON
            if(language !== anchor.dataset.url.replace('/','')){ anchor.style.opacity='0.5'
            }
        
            anchor.addEventListener('click', () => {
                redirectToLanguage(anchor)
            })
        })
    }

     //SHOW ALL LANGUAGES
     const showAllLanguages = () => {
        anchors.forEach(anchor => {
            anchor.setAttribute('data-active','')
            languageBar.removeEventListener

        })
        setLangRedirect()
    }
    languageBar.addEventListener('click', showAllLanguages)

    

})


// addEventListener('DOMContentLoaded', () => {
//     const paths = document.querySelectorAll('#logo path')

//     paths.forEach(path => {
//         console.log(path.getTotalLength()) 
//     })
// })

// CHANGE  LANGUAGE

