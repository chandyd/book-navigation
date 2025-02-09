document.addEventListener("DOMContentLoaded", function () {
    let categories = ["All", "Fantasy", "Humor"];
    let languages = ["Italian", "English"];
    let selectedLanguage = "Italian";
    let selectedCategory = "All";

    let books = [
        {
            title: {
                Italian: "Il Pagliaccio e il Castello di Ghiaccio",
                English: "The Clown and the Ice Castle"
            },
            author: "Eleanor Lian",
            category: "Fantasy",
            availableLanguages: ["Italian", "English"],
            cover: {
                Italian: "https://robertocalvoproductions.com/wp-content/uploads/2024/12/copertina-ebook.jpg",
                English: "https://robertocalvoproductions.com/wp-content/uploads/2025/01/Fronte-copertina-The-Clown-and-the-Ice-Castle-1600x2560-Inglese-Americano.jpg"
            },
            link: {
                Italian: "https://www.amazon.it/dp/B0DPDLV4F9",
                English: "https://www.amazon.com/dp/B0DS9TCZ1C"
            },
            authorImage: "https://robertocalvoproductions.com/wp-content/uploads/2023/01/Eleonora-Baliani-1.jpg"
        },
        {
            title: {
                Italian: "L'Uomominkia"
            },
            author: "Valentina Gemelli",
            category: "Humor",
            availableLanguages: ["Italian"],
            cover: {
                Italian: "https://robertocalvoproductions.com/wp-content/uploads/2025/02/Valentina-Gemelli-Copertina-formato-eBook-1600x2560-1.jpg"
            },
            link: {
                Italian: "https://www.amazon.it/dp/B0DWHMX8TR"
            },
            authorImage: "https://robertocalvoproductions.com/wp-content/uploads/2025/02/Valentina-Gemelli.png"
        }
    ];

    let container = document.getElementById("book-categories-widget");
    if (!container) return;

    let menuContainer = document.createElement("div");
    menuContainer.style = "position: sticky; top: 60px; background: white; padding: 15px 0; z-index: 1000; box-shadow: 0px 3px 8px rgba(0,0,0,0.1); text-align: center;";

    let headerDiv = document.createElement("div");
    headerDiv.style = "margin-bottom: 10px;";
    headerDiv.innerHTML = `<h2 style="font-size: 24px; color: #333;">&#128218; Book Categories</h2>`;

    let categoryContainer = document.createElement("div");
    categoryContainer.style = "margin-bottom: 10px;";
    categories.forEach(category => {
        let btn = document.createElement("button");
        btn.innerText = category;
        btn.id = `category-${category}`;
        btn.style = "margin: 5px; padding: 12px 18px; font-size: 16px; background: #0073e6; color: white; border: 2px solid transparent; border-radius: 10px; cursor: pointer; transition: 0.3s; font-weight: bold;";
        btn.onclick = function() { filterBooks(category, selectedLanguage); updateActiveButton('category', category); };
        categoryContainer.appendChild(btn);
    });

    let langSelector = document.createElement("div");
    langSelector.style = "margin-top: 10px;";
    languages.forEach(lang => {
        let langBtn = document.createElement("button");
        langBtn.innerText = lang;
        langBtn.id = `lang-${lang}`;
        langBtn.style = "margin: 5px; padding: 10px 16px; font-size: 16px; background: #0073e6; color: white; border: 2px solid transparent; border-radius: 10px; cursor: pointer; transition: 0.3s; font-weight: bold;";
        langBtn.onclick = function() { changeLanguage(lang); updateActiveButton('lang', lang); };
        langSelector.appendChild(langBtn);
    });

    menuContainer.appendChild(headerDiv);
    menuContainer.appendChild(categoryContainer);
    menuContainer.appendChild(langSelector);
    container.appendChild(menuContainer);

    let booksContainer = document.createElement("div");
    booksContainer.id = "books-list";
    booksContainer.style = "display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 20px; padding-top: 20px;";
    container.appendChild(booksContainer);

    function renderBooks(filteredBooks) {
        booksContainer.innerHTML = "";
        filteredBooks.forEach(book => {
            let bookTitle = book.title[selectedLanguage] || book.title["Italian"];
            let bookCover = book.cover[selectedLanguage] || book.cover["Italian"];
            let bookLink = book.link[selectedLanguage] || book.link["Italian"];

            let bookDiv = document.createElement("div");
            bookDiv.style = "background: white; border-radius: 12px; box-shadow: 3px 3px 15px rgba(0,0,0,0.3); padding: 20px; text-align: center; width: 280px; transition: 0.3s; cursor: pointer; display: flex; flex-direction: column; align-items: center; min-height: 500px;";

            bookDiv.innerHTML = `
                <img src="${bookCover}" alt="${bookTitle}" width="200" style="border-radius: 10px; cursor: pointer;" onclick="window.open('${bookLink}', '_blank')"/>
                <h3 style="margin: 15px 0; font-size: 22px; min-height: 60px; text-align: center; cursor: pointer;" onclick="window.open('${bookLink}', '_blank')">
                    ${bookTitle}
                </h3>
                <p style="font-size: 16px;">by ${book.author}</p>
            `;

            booksContainer.appendChild(bookDiv);
        });
    }

    function filterBooks(category, language) {
        selectedCategory = category;
        renderBooks(books.filter(book => (category === "All" || book.category === category) && book.availableLanguages.includes(language)));
    }

    function changeLanguage(lang) {
        selectedLanguage = lang;
        filterBooks(selectedCategory, selectedLanguage);
    }

    function updateActiveButton(type, value) {
        let elements = type === 'category' ? categories : languages;
        elements.forEach(el => {
            let button = document.getElementById(`${type}-${el}`);
            button.style.background = el === value ? "#ff9900" : "#0073e6";
            button.style.border = el === value ? "2px solid #ffcc00" : "2px solid transparent";
        });
    }

    filterBooks(selectedCategory, selectedLanguage);
    updateActiveButton('category', selectedCategory);
    updateActiveButton('lang', selectedLanguage);
});
