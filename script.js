const addBtn = document.getElementById("add-btn");
const container = document.getElementById("box-container");

const addBookModal = document.getElementById("post-modal");
const submitBtn = document.getElementById("btn-submit");
const closeBtn = document.getElementById("btn-close");

const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
let readInput = document.getElementsByName("has_or_not_read");

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
    inputValidation();
    addBookToLibrary();
    /*
    for(let i = 0; i < readInput.length; i++){
        if(readInput[i].checked){
            console.log(readInput[i].value);
            break;
        }
    }
    */
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
    },
    {
        title:  "Deez Nuts",
        author: "AdmiralBulldog",
        pages: "100",
        read: false
    },
    {
        title: "Defense of the Acients",
        author: "Ice Frog",
        pages: "200",
        read: true
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
    console.log(books);
}

function inputValidation(){
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