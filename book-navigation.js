document.addEventListener("DOMContentLoaded", function () {
    const categories = ["All", "Fantasy", "Humor"];
    const languages = ["Italian", "English"];
    let selectedLanguage = "Italian";
    let selectedCategory = "All";

    const books = [
        {
            title: { Italian: "Il Pagliaccio e il Castello di Ghiaccio", English: "The Clown and the Ice Castle" },
            author: "Eleanor Lian",
            category: "Fantasy",
            availableLanguages: ["Italian", "English"],
            cover: {
                Italian: "https://robertocalvoproductions.com/wp-content/uploads/2024/12/copertina-ebook.jpg",
                English: "https://robertocalvoproductions.com/wp-content/uploads/2025/01/Fronte-copertina-The-Clown-and-the-Ice-Castle-1600x2560-Inglese-Americano.jpg"
            },
            link: { Italian: "https://www.amazon.it/dp/B0DPDLV4F9", English: "https://www.amazon.com/dp/B0DS9TCZ1C" },
            authorImage: "https://robertocalvoproductions.com/wp-content/uploads/2023/01/Eleonora-Baliani-1.jpg"
        },
        {
            title: { Italian: "L'Uomominkia" },
            author: "Valentina Gemelli",
            category: "Humor",
            availableLanguages: ["Italian"],
            cover: { Italian: "https://robertocalvoproductions.com/wp-content/uploads/2025/02/Valentina-Gemelli-Copertina-formato-eBook-1600x2560-1.jpg" },
            link: { Italian: "https://www.amazon.it/dp/B0DWHMX8TR" },
            authorImage: "https://robertocalvoproductions.com/wp-content/uploads/2025/02/Valentina-Gemelli.png"
        }
    ];

    const container = document.getElementById("book-categories-widget");

    // **Creazione del menu**
    const menuContainer = document.createElement("div");
    menuContainer.style = "position: sticky; top: 60px; background: white; padding: 15px 0; z-index: 1000; box-shadow: 0px 3px 8px rgba(0,0,0,0.1); text-align: center;";
    
    menuContainer.innerHTML = `
        <h2 style="font-size: 24px; color: #333;">📚 Book Categories</h2>
        <div id="category-buttons"></div>
        <div id="language-buttons" style="margin-top: 10px;"></div>
    `;
    container.appendChild(menuContainer);

    // **Creazione del contenitore dei libri**
    const booksContainer = document.createElement("div");
    booksContainer.id = "books-list";
    booksContainer.style = "display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 20px; padding-top: 20px;";
    container.appendChild(booksContainer);

    // **Funzione per creare pulsanti di categoria e lingua**
    function createButtons(parentId, items, type) {
        const parent = document.getElementById(parentId);
        items.forEach(item => {
            let btn = document.createElement("button");
            btn.innerText = item;
            btn.id = `${type}-${item}`;
            btn.style = "margin: 5px; padding: 12px 18px; font-size: 16px; background: #0073e6; color: white; border: 2px solid transparent; border-radius: 10px; cursor: pointer; transition: 0.3s; font-weight: bold;";
            btn.dataset[type] = item;
            parent.appendChild(btn);
        });
    }

    createButtons("category-buttons", categories, "category");
    createButtons("language-buttons", languages, "lang");

    // **Funzione per mostrare i libri filtrati**
    function renderBooks() {
        booksContainer.innerHTML = "";
        const filteredBooks = books.filter(book =>
            (selectedCategory === "All" || book.category === selectedCategory) &&
            book.availableLanguages.includes(selectedLanguage)
        );

        filteredBooks.forEach(book => {
            let bookTitle = book.title[selectedLanguage] || book.title["Italian"];
            let bookCover = book.cover[selectedLanguage] || book.cover["Italian"];
            let bookLink = book.link[selectedLanguage] || book.link["Italian"];

            let bookDiv = document.createElement("div");
            bookDiv.style = "background: white; border-radius: 12px; box-shadow: 3px 3px 15px rgba(0,0,0,0.3); padding: 20px; text-align: center; width: 280px; transition: 0.3s; cursor: pointer; display: flex; flex-direction: column; align-items: center; min-height: 500px;";
            
            bookDiv.onmouseover = () => bookDiv.style.transform = "scale(1.08)";
            bookDiv.onmouseout = () => bookDiv.style.transform = "scale(1)";

            bookDiv.innerHTML = `
                <img decoding="async" src="${bookCover}" alt="${bookTitle}" width="200" loading="lazy" style="border-radius: 10px; cursor: pointer;" onclick="window.open('${bookLink}', '_blank')"/>
                <h3 style="margin: 15px 0; font-size: 22px; min-height: 60px; text-align: center; cursor: pointer;" onclick="window.open('${bookLink}', '_blank')">
                    ${bookTitle}
                </h3>
                <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <img decoding="async" src="${book.authorImage}" alt="${book.author}" width="100" height="100" loading="lazy" style="border-radius: 8px; margin-bottom: 8px; object-fit: contain;"/>
                    <p style="font-size: 16px;">by ${book.author}</p>
                </div>
            `;
            booksContainer.appendChild(bookDiv);
        });
    }

    // **Event delegation per i pulsanti**
    menuContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") {
            if (e.target.dataset.category) {
                selectedCategory = e.target.dataset.category;
                updateActiveButton("category", selectedCategory);
            } else if (e.target.dataset.lang) {
                selectedLanguage = e.target.dataset.lang;
                updateActiveButton("lang", selectedLanguage);
            }
            renderBooks();
        }
    });

    // **Funzione per evidenziare il pulsante attivo**
    function updateActiveButton(type, value) {
        document.querySelectorAll(`#${type}-buttons button`).forEach(btn => {
            btn.style.background = btn.dataset[type] === value ? "#ff9900" : "#0073e6";
            btn.style.border = btn.dataset[type] === value ? "2px solid #ffcc00" : "2px solid transparent";
        });
    }

    // **Avvio della visualizzazione iniziale**
    renderBooks();
    updateActiveButton("category", selectedCategory);
    updateActiveButton("lang", selectedLanguage);
});
