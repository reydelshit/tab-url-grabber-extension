let myLeads = []
const inputField = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('unorderStorage')
const deleteBtn = document.getElementById('delete-btn')
const saveBtn = document.getElementById('save-btn')


const leadsFromLocalStorage =  JSON.parse(localStorage.getItem('myLeads'))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)

}

saveBtn.addEventListener('click', function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)

    })

})


function render(leads) {

    let listItems = ''
    for (let i = 0; i < leads.length; i++) {

        listItems += 
                `<li>
                        <a target="_blank" href='${leads[i]}'>
                            
                            ${leads[i]}
                        
                        </a>
                        
                </li>`

    }
        ulEl.innerHTML = listItems
}


deleteBtn.addEventListener('dblclick', function(){

    localStorage.clear()
    myLeads = []
    render(myLeads)

})

inputBtn.addEventListener('click', function(){

    myLeads.push(inputField.value)
    console.log(myLeads)
    inputField.value = ''
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)

})
