const mainDiv = document.querySelector(".main")

//Another way to declare a function
//This is a utility function which 
//capitalize first character of a string

/**
 * Function which capitalize first character of a string
 * @param  {text} string - text to have first character capitalized
 * @return {text} text that has first character capitalized
 */
const capFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


const butText = [
    "edit", "close"
]

const contactList = [
    {
      name: "Roberta Dobbs",
      email: "subgenius@slack.example.com",
      cell: "778-555-1234",
      address: "101 Main St, Anytown, USA",
      
    }, 
    {
      name: "Bugs Bunny",
      email: "whatsup@doc.example.com",
      cell: "123-867-5309",
      address: "Warner Brothers Animation Lot",

    },
]

function removeAllChildren() {
    while (mainDiv.lastChild) {
        mainDiv.lastChild.remove()
    }
}

/* Index Page */

function cleanUpIndex() {
    removeAllChildren()
}

/**
 * Function which creates a DOM node
 * @param  {object} contact - An object that contains contact information
 * @return {DOM Node} A DOM node <a href=""><div><p></p></div></a>
 */
function createSingleIndex(contact) {
    const hLink = document.createElement("a")
    const linkDiv = document.createElement("div")
    linkDiv.classList.add("contact")

    const divPara = document.createElement("p")
    const linkText = document.createTextNode(contact.name)
    divPara.append(linkText)

    linkDiv.append(divPara)
    hLink.append(linkDiv)
    hLink.href = "page3.html"

    return hLink

}

/**
 * Function which render all DOM node on indext page
 * @param  [{object}] contactArray - An array of contact objects
 * @return none
 */
function renderIndex(contactArray) {
    contactArray.forEach( (ele) => {
        //Code reuse
        //We built the createSingleIndex function
        //we append the return node from the function
        //to the main div
        mainDiv.append(createSingleIndex(ele))

    })

}

/* View Single Contact page */

function cleanUpView() {
    removeAllChildren()
}

//First identify the structure/pattern of the main div on the view page
//then use various lookup tables to create the div structure by
//using loops instead of create each div one by one.
//We did not save a lot of coding time the first time 
//(or even spent more time) but
//will save time when the structure is changed in the future,
//or there are tens or hundred of divs to be created

//It is totally fine to manually build the div structure
//one child node by one child node.

/**
 * Function which render all DOM nodes on view page
 * @param  {object} contact - An object that contains contact information
 * @return none
 */
function renderView(contact) {
    //Optional - clear the page first before 
    //rendering another contact
    
    cleanUpView()

    const viewPageClasses = [
        "contactinfo", "contactname", "contactemail",
        "contactphone", "contactaddress", "buttons"
    ]
    const txtPrefix = ["", "email: ", "cell: ", "address: "]
    
    //Use an array to store all the child div
    //so that we can refer back to them later
    let divArray = []

    //Get all the keys of the contact object passes to this function
    const keys = Object.keys(contact)
    const len = keys.length
 
    //Use a for loop to create all child div of the main div
    //Use viewPageClasses array as a template to create
    //all child divs and add class to each
    for (let i=0; i< viewPageClasses.length; i++) {
        let myDiv = document.createElement("div")
        myDiv.classList.add(viewPageClasses[i])

        //Only add text node on the div of classes
        // "contactinfo", ...., "contactaddress"
        if (i > 0 && i < 5) {
            const textNode = document.createTextNode(
                txtPrefix[i-1] + contact[keys[i-1]])
            myDiv.append(textNode)
        }
        divArray.push(myDiv)
        //If the newly created div is not contectinfo
        //we will append it to contactinfo div
        if (i > 0) 
            divArray[0].append(myDiv)

    }

    //Manually create the structure for contactname div
    const imgNode = document.createElement("img")
    imgNode.src = "./img/profile.jpg"
    imgNode.classList.add("profilepic")
    divArray[1].append(imgNode)

    //Create the buttons inside buttons div
    butText.forEach ((ele)=> {
        const myButton = document.createElement("button")
        myButton.classList.add("button")
        myButton.classList.add(ele)
        myButton.value = capFirstLetter(ele)

        const textNode = document.createTextNode(capFirstLetter(ele))
        myButton.append(textNode)

        divArray[5].append(myButton)
    })

    //Add contactinfo div to main div and done
    mainDiv.append(divArray[0])



}



        
    
 
    



//https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
const parser = new DOMParser()

const inputId = [
     "contactname", "contactphone", "contactaddress", "contactemail"
 ]
 const placeHolder = [
     "Contact Name", " Contact Phone", " Contact Address", " Contact Email"
 ]

 const type = [
     "text", "tel", "text", "email"
 ]

 const extraFieldTxt = "<button class='extrafield' id='extraaddressfield' name='extraaddressfield'></button>"
 const btnTxt = '<button type="submit" class="button save" id="savecontact" name="savecontact">Save Contact</button>' +
                 '<button type="reset" class="button cancel" id="cancel" name="cancel">Cancel</button>'

function renderCreate() {
    removeAllChildren()
 
    let contactEditDiv = document.createElement("div")
    contactEditDiv.classList.add("contactedit")

    let contactImgDiv = document.createElement("div");
    contactImgDiv.classList.add("contactimg")
    const imgTag = document.createElement("img")
    imgTag.classList.add("profilepic")
    imgTag.src = "./img/profile.jpg"
    imgTag.alt = "Profile picture"

    contactImgDiv.append(imgTag)
    contactEditDiv.append(contactImgDiv)

    let formDiv = document.createElement("div")
    formDiv.classList.add("form")

    let myForm = document.createElement("form")

    for (let i = 0; i <4; i++) {
        const inputContainerDiv = document.createElement("div")
        
        inputContainerDiv.classList.add("inputcontainer")
        
        const inputTxt = `<input type="${type[i]}" id="${inputId[i]}" name="${inputId[i]}" placeholder="${placeHolder[i]}"></input>`
        //Create children by setting the innerHTML of the parent
        inputContainerDiv.innerHTML = inputTxt

        //Using DOMParser to generate a #document then get the first child
        //uncomment to see result of 
        //parseFromString
        //console.log(parser.parseFromString(extraFieldTxt, "text/html"))
        let btn = parser.parseFromString(extraFieldTxt, "text/html").body.firstChild
        btn.textContent = "+"
        inputContainerDiv.append(btn)

        myForm.append(inputContainerDiv)

        
    }
 
    let btnDiv =document.createElement('div')
    btnDiv.classList.add("buttons")
    //Create children by setting the innerHTML of the parent
    btnDiv.innerHTML = btnTxt
    myForm.append(btnDiv)

    formDiv.append(myForm)

    contactEditDiv.append(formDiv)

    mainDiv.append(contactEditDiv)

}






var contactNavBtn = document.querySelector("#contactshome")

contactNavBtn.addEventListener('click', function(e) {
    cleanUpIndex()
    renderIndex(contactList)
    e.preventDefault()
})


var NewContactBtn = document.querySelector('#newcontact')

NewContactBtn.addEventListener('click', function(e) {
    cleanUpIndex()
    renderIndex()
    e.preventDefault()
})

var CardofcontactBtn = document.getElementsByClassName("contact")
const IndexNum = 0 

var IndexCheck = function(e){
    e.preventDefault()
    for (let index = 0; index < array.length; index++) {
        if (CardofcontactBtn[index].target.TextContent==contactList[index].name){
            cleanUpIndex()
            renderView(contactlist[index])
        }
        
        
    }

link.addEventListener("click", IndexCheck)
return link

}

const closebtn = document.querySelector(".close");
closebtn.addEventListener("click", (e) =>{
    cleanUpView()
    renderView()
    e.preventDefault()

})

const cancelbtn = document.querySelector(".cancel")
cancelbtn.addEventListener("click", (e) =>{
    cleanUpCreate()
    renderCreate()
    e.preventDefault()
})


    



const saveBtn = doument.querySelector("#Save Contact")

saveBtn.addEventListener("click", (e)=>{
    let nameValue = document.querySelector("contactname").value
    let emailValue = document.querySelector("contactemail").value
    let phoneValue = document.querySelector("contactphone").value
    let addressValue = document.querySelector("contactaddress").value
    
    let contactObj = {
        name: nameValue,
        email:emailValue, 
        cell: phoneValue,
        address: addressValue
    }
    contactList.push(contactObj)
    
    cleanUpCreate()
    renderView(contactList[contactList.legnth -1])
    e.preventDefault()
})








