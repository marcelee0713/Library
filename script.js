const addBtn = document.getElementById("add-btn");
const container = document.getElementById("box-container");

const addBookModal = document.getElementById("post-modal");
const submitBtn = document.getElementById("btn-submit");
const closeBtn = document.getElementById("btn-close");

const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
let readInput = document.getElementsByName("has_or_not_read");
let x = window.matchMedia("(max-width: 35em)");

// When there is only one library
if(container.children.length === 1){
    container.style.gridTemplateColumns = "1fr";
}
else{
    container.style.gridTemplateColumns = "1fr 1fr";
}


addBtn.addEventListener("click", showAddBook);
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // INPUT VALIDATION
    if(titleInput.value === ""){
        titleInput.style.borderBottomColor = "red";
        return;
    }
    else{
        titleInput.style.borderBottomColor = "inherit";
    }

    if(authorInput.value === ""){
        authorInput.style.borderBottomColor = "red";
        return;
    }
    else{
        authorInput.style.borderBottomColor = "inherit";
    }

    if(pagesInput.value === ""){
        pagesInput.style.borderBottomColor = "red";
        return;
    }
    else{
        pagesInput.style.borderBottomColor = "inherit";
    }

    addBookToLibrary();
    clearOutOurContainer(container);
    buildBook();
    closeModal();
    //check also if it's one row
    oneRow(x);
});
closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
});

let books = [
    {
        title: "Elden Ring",
        author: "FromSoftware",
        pages: "192",
        read: false
    }
];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(){
    let myTitle = titleInput.value.trim();
    let myAuthor = authorInput.value.trim();
    let myPages = pagesInput.value.trim();
    let hasReadOrNot = readOrNot();
    const myNewBook = new Book(myTitle, myAuthor, myPages, hasReadOrNot);
    books.push(myNewBook);
}

function buildBook(){
    for(let i = 0; i < books.length; i++){
        const card = document.createElement("div");
        const authorContainer = document.createElement("div");
        const authorTextHolder = document.createElement("div");
        const author = document.createElement("div");
        const titleContainer = document.createElement("div");
        const titleTextHolder = document.createElement("div");
        const title = document.createElement("div");
        const pagesContainer = document.createElement("div");
        const pagesTextHolder = document.createElement("div");
        const pages = document.createElement("div");
        const read = document.createElement("div");
        const cardOptions = document.createElement("div");
        const deleteCard = document.createElement("button");
        const editCardPages = document.createElement("button");

        container.appendChild(card);

        card.classList.add("card");
        card.appendChild(authorContainer);
        card.appendChild(titleContainer);
        card.appendChild(pagesContainer);
        card.appendChild(read);
        card.appendChild(cardOptions);

        authorContainer.setAttribute("id", "author-container");
        authorContainer.appendChild(authorTextHolder);
        authorContainer.appendChild(author);
        author.classList.add("author");
        authorTextHolder.classList.add("text-holder");
        authorTextHolder.textContent = "Author";

        titleContainer.setAttribute("id", "title-container");
        titleContainer.appendChild(titleTextHolder);
        titleContainer.appendChild(title);
        title.classList.add("title");
        titleTextHolder.classList.add("text-holder");
        titleTextHolder.textContent = "Title";

        pagesContainer.setAttribute("id", "pages-container");
        pagesContainer.appendChild(pagesTextHolder);
        pagesContainer.appendChild(pages);
        pages.classList.add("pages");
        pagesTextHolder.classList.add("text-holder");
        pagesTextHolder.textContent = "Pages";

        read.setAttribute("id", "read");
        cardOptions.appendChild(deleteCard);
        cardOptions.appendChild(editCardPages);
        cardOptions.classList.add("card-options");
        deleteCard.setAttribute("id", "delete-card");
        editCardPages.setAttribute("id", "edit-card-pages");
        deleteCard.textContent = "DELETE";
        editCardPages.textContent = "CHANGE";

        author.textContent = books[i].author;
        title.textContent = books[i].title;
        pages.textContent = books[i].pages;
        if(books[i].read){
            read.textContent = "Has read";
        }
        else{
            read.textContent = "Has not read yet";
        }

        if(container.children.length === 1){
            container.style.gridTemplateColumns = "1fr";
        }
        else{
            container.style.gridTemplateColumns = "1fr 1fr";
        }
        deleteCard.addEventListener("click", () => {
            books.splice(i,1);
            clearOutOurContainer(container);
            buildBook();
            //check also if it's one row
            oneRow(x);
        });
        editCardPages.addEventListener("click", (e) => {
            e.preventDefault();
            if(books[i].read){
                books[i].read = false;
            }
            else{
                books[i].read = true;
            }
            clearOutOurContainer(container);
            buildBook();
            //check also if it's one row
            oneRow(x);
        })
    }
}
function showAddBook(){
    addBookModal.style.display = "flex";
}
function closeModal(){
    addBookModal.style.display = "none";
    titleInput.style.borderBottomColor = "inherit";
    authorInput.style.borderBottomColor = "inherit";
    pagesInput.style.borderBottomColor = "inherit";
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
}
function readOrNot(){
    for(let i = 0; i < readInput.length; i++){
        if(readInput[i].checked){
            if(readInput[i].value === "yes"){
                return true;
            }
            return false;
        }
    }
}
function clearOutOurContainer(element){
    while(element.firstElementChild){
        element.firstElementChild.remove();
    }
}
function oneRow(x){
    if(x.matches){
        container.style.gridTemplateColumns = "1fr";
    }
    else{
        if(container.children.length !== 1){
            container.style.gridTemplateColumns = "1fr 1fr";
        }
    }
}

buildBook();

//Change the column when it is phone size.
oneRow(x);
x.addListener(oneRow);