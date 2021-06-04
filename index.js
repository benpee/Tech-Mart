// const { parseInt } = require("core-js/core/number");
// import 'core-js/stable';

// const { render } = require("node-sass");
const API_URL = 'https://shopappanter.herokuapp.com/api/';
const TIMEOUT_SEC = 10;
let accts = [];

///////// SLIDER //////////////
const slides = document.querySelectorAll('.slide');
const slideLeft = document.querySelector('#arrow-left');
const slideRight = document.querySelector('#arrow-right');
let curSlide = 0;
let maxSlide = slides.length;

const gotoSlide = function (slides) {
    // loop through the slide and use their index for style changes
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    })
}

const prevSlide = function () {
    // go to the last slide if on the first slide
    if (curSlide === 0) curSlide = maxSlide - 1;
    // navigate the slide backward
    curSlide--;
    gotoSlide(slides);
}

const nextSlide = function () {
    // go to the first slide if on the last slide
    if (curSlide === maxSlide - 1) curSlide = 0;
    // navigate the slide forward
    curSlide++;
    gotoSlide(slides);
}

slideLeft.addEventListener('click', prevSlide);
slideRight.addEventListener('click', nextSlide);

// Arrow key
document.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
});

///// STICKY NAV ///////
const header = document.querySelector('header');
const nav = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);

/// SMOOTH SCROLLING ////////
// Shop Now button
const shopBtn = document.querySelector('.text-area__button');
const phonesBtn = document.querySelector('.phonesBtn');
const phonesBtn1 = document.querySelector('.phonesBtn1');
const laptopsBtn = document.querySelector('.laptopsBtn');
const laptopsBtn1 = document.querySelector('.laptopsBtn1');
const homeBtn1 = document.querySelector('.homeBtn1');
const homeBtn = document.querySelector('.homeBtn');
const accessoriesBtn = document.querySelector('.accessoriesBtn');
const accessoriesBtn1 = document.querySelector('.accessoriesBtn1');
const productCategories = document.querySelector('.categories');
const laptopContainer = document.querySelector('.laptops-products');
const phonesContainer = document.querySelector('.phones-products');
const accessoriesContainer = document.querySelector('.accessories-products');
const homePointer = document.querySelector('header');
const cartBtn = document.querySelector('.shopping-cart');
const acctBtn = document.querySelector('.acct-profile');

shopBtn.addEventListener('click', function (e) {
    const catcoords = productCategories.getBoundingClientRect();

    productCategories.scrollIntoView({ behavior: 'smooth' })
});

phonesBtn.addEventListener('click', function (e) {
    const catcoords = phonesContainer.getBoundingClientRect();

    phonesContainer.scrollIntoView({ behavior: 'smooth' })
});

phonesBtn1.addEventListener('click', function (e) {
    const catcoords = phonesContainer.getBoundingClientRect();

    phonesContainer.scrollIntoView({ behavior: 'smooth' })
});

laptopsBtn.addEventListener('click', function (e) {
    const catcoords = laptopContainer.getBoundingClientRect();

    laptopContainer.scrollIntoView({ behavior: 'smooth' })
});

laptopsBtn1.addEventListener('click', function (e) {
    const catcoords = laptopContainer.getBoundingClientRect();

    laptopContainer.scrollIntoView({ behavior: 'smooth' })
});

accessoriesBtn.addEventListener('click', function (e) {
    const catcoords = accessoriesContainer.getBoundingClientRect();

    accessoriesContainer.scrollIntoView({ behavior: 'smooth' })
});

accessoriesBtn1.addEventListener('click', function (e) {
    const catcoords = accessoriesContainer.getBoundingClientRect();

    accessoriesContainer.scrollIntoView({ behavior: 'smooth' })
});

homeBtn.addEventListener('click', function (e) {
    const catcoords = homePointer.getBoundingClientRect();

    homePointer.scrollIntoView({ behavior: 'smooth' })
});

homeBtn1.addEventListener('click', function (e) {
    const catcoords = homePointer.getBoundingClientRect();

    homePointer.scrollIntoView({ behavior: 'smooth' })
});

// /////////////// Lazy Loading //////////////
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-250px'
});

imgTargets.forEach(img => imgObserver.observe(img));

// LOGIN && REGISTER
const username = document.querySelector('.login-mail');
const password = document.querySelector('.login-pass');
const verifyPassword = document.querySelector('.password2');
const loginBtn = document.querySelector('.signing');
const registerBtn = document.querySelector('.register');
const newUsername = document.querySelector('.new-user');
const newPassword = document.querySelector('.new-password');
const userMail = document.querySelector('.user-mail');
const userNumber = document.querySelector('.phone-number');
let currentAcct;

const CheckInput = function (input) {
    const inputCheck = accts.find(acct => acct.input === input);
    if (input) errorMessage(`${input} already exist, try another one!`);
}
// "Content-Type","value":"application/x-www-form-urlencoded"

const isEmail = function (email) {
    return ('/^(([^<>()\[\]\\.,;:\s@"]+ (\.[^<>()\[\]\\.,;:\s@"]+)*)!(".+")#(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1-3}])!(([a-zA-Z\-0-9]+\.)+[a-za-Z]{2,}))$/'.test(email))
}

const signIn = async function (e) {
    e.preventDefault();
    const email = username.value;
    const passWord = password.value;

    if (email === '' && password === '') return;
    if (isEmail(email)) console.log('Email not valid!');

    // if (typeof passWord !== 'string' || typeof passWord !== 'number'
    //     || passWord === '' || passWord.length < 8) errorMessage('Password not valid!')
    // if (currentAcct && currentAcct.password === passWord) {
    //     dashboard.classList.add('currentUser');
    // }

    // if (currentAcct && currentAcct.password === passWord)
    //     currentAcct.isAdmin ? showAdmin() : showUser();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "password": passWord
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://shopappanter.herokuapp.com/api/users/signin", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            if (result.message) throw new Error(result.message);

            if (!!result.isAdmin === 'false') console.log('User', !!result.isAdmin);
            console.log('Admin');
        })
        .catch(error => console.log('error', error));
}

const signUp = async function (e) {
    e.preventDefault();
    const name = newUsername.value;
    const password = newPassword.value;
    const email = userMail.value;
    const phone = userNumber.value;
    const password2 = verifyPassword.value;

    if (username === '' && password === ''
        && email === '' && phone === '') return;

    if (typeof username !== 'string' || username === ''
        || username.length < 8) errorMessage('Input not valid!');

    if (typeof password !== 'string' || typeof password !== 'number'
        || password === '' || password.length < 8) errorMessage('Input not valid!');

    if (!isEmail(email)) errorMessage('Email is not valid!');

    if (typeof phone !== 'number' || phone === ''
        || phone.length < 10) errorMessage('Input not valid!');

    if (password2 !== password) errorMessage("Password doesn't match, please try again!");
    console.log(accts)
    // CheckInput(username);
    // validMail(email);
    // CheckInput(phone);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
        "phonenumber": phone
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://shopappanter.herokuapp.com/api/users/register", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    // renderMessage(`${data.message}!!!`);
    accts = [...accts, { name, email, password, phone }];
    setAccts(accts);
}

const getAllUsers = function () {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFlMjMxOWEzN2QzMjE2ZTgyMWZkZWIiLCJuYW1lIjoiV2lubmVyIiwiZW1haWwiOiJ3aW5uZXJha2FrbzA5QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjp0cnVlLCJpYXQiOjE2MjI3MzQ3NTAsImV4cCI6MTYyMjgyMTE1MH0.lO0VBtRlBToTi9Jze90LkahTDazIYyG7eHkZxpHkv3g");

    // var raw = JSON.stringify({
    //     "email": "winnerakako09@gmail.com",
    //     "password": "1234",
    // });

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // body: raw,
        redirect: 'follow'
    };

    fetch("https://shopappanter.herokuapp.com/api/users", requestOptions)
        .then(response => response.text())
        .then(result => {
            accts = [accts, result];
            console.log("result", `Accts - ${accts}`, accts.length);
        })
        .catch(error => console.log('error', error));
}


loginBtn.addEventListener('click', signIn);
registerBtn.addEventListener('click', signUp);

const renderMarkup = function (html, parentElement) {
    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', html);
}

const renderMarkupOthers = function (html, parentElement) {
    parentElement.insertAdjacentHTML('afterbegin', html);
}



const generateMarkupAll = function (data) {
    return `<div class="all-products">

            <h1 class="h1-text">Explore an incredible list of quality items just for you</h1>

            <div class="all-container">
                ${data.map(generateMarkupProduct)}
                <button class="button-see-more">See More</button>             
            </div>
          </div>
        `
}
const generateMarkupPant = function (data) {
    return `<div class="laptops-products">

            <h1 class="h1-text">Explore an incredible list of quality items just for you</h1>

            <div class="laptops-container">
                ${data
            .filter(item => item.category === 'Pants')
            .map(generateMarkupProduct)}
                <button class="button-see-more">See More</button>             
            </div>
          </div>
        `
}

const generateMarkupShirt = function (data) {
    return `<div class="phones-products">

            <h1 class="h1-text">Explore an incredible list of quality items just for you</h1>

            <div class="phones-container">
                ${data.filter(item => item.category === 'Shirts')
            .map(generateMarkupProduct)}
                <button class="button-see-more">See More</button>             
            </div>
          </div>
        `
}

const generateMarkupOthers = function (data) {
    return `<div class="accessories-products">

            <h1 class="h1-text">Explore an incredible list of quality items just for you</h1>

            <div class="accessories-container">
                ${data.filter(item => item.category === 'Shirts')
            .map(generateMarkupProduct)}
                <button class="button-see-more">See More</button>             
            </div>
          </div>
        `
}

const generateMarkupProduct = function (item, i) {
    return `
            <div class="${item.category}">
                <div class="item-box"><img src="img/p${i}.jpeg" data-src="img/img${i}" class="lazy-img" alt=""></div>
                    <h2 class="product-name">${item.name}</h2>
                    <h2 class="product-price">${parseInt(item.price).toFixed(2)}</h2>
                    <button class="button" data-id="${item._id}">Add to cart</button>
                </div>
        `;
}

const displayProducts = async function () {
    const parentEl = document.querySelector('.product-items');
    const data = await getProducts();
    console.log(data)
    const html = generateMarkupOthers(data);
    renderMarkup(html, parentEl);
    const html2 = generateMarkupPant(data);
    renderMarkupOthers(html2, parentEl);
    const html3 = generateMarkupShirt(data);
    renderMarkupOthers(html3, parentEl);
    const html4 = generateMarkupAll(data);
    renderMarkupOthers(html4, parentEl);
}

const getProducts = async function () {
    try {
        const res = await fetch('https://shopappanter.herokuapp.com/api/products');
        const data = await res.json();
        const { products } = data;
        return products;
    } catch (err) {
        console.log(err);
    }
}

// const getSingleProduct = async function (id) {
//     try {
//         const res = await fetch('https://shopappanter.herokuapp.com/api/products/id');
//         const data = await res.json();
//         const { products } = data;
//         return products;
//     } catch (err) {
//         console.log(err);
//     }
// }

// const getQuery = function () {
//     const query = this._parentElement.querySelector('.searh__field').value;
//     this._clearInput();
//     return query;
// }

// const clearInput = function () {
//     this._parentElement.querySelector('.search__field').value = '';
// }

// const addHandlerSearch = function (handler) {
//     this._parentElement.addEventListener('submit', function (e) {
//         e.preventDefault();
//         handler();
//     });
// }

// removeItem(id) {
//     cart = cart.filter(item => item.id !== id);
//     this.setCartValues(cart);
//     Storage.saveCart(cart);
//     let button = this.getSingleButton(id);
//     button.disabled = false;
//     button.innerText = `
//         <i class="fas fa-shopping-cart"></i> add to cart
//         `;
// }

// getSingleButton(id) {
//     return buttons.find(btn => btn.dataset.id === id);
// }

// clearCart() {
//     let cartItems = cart.map(item => item.id);
//     cartItems.forEach(id => this.removeItem(id));
//     while (cartContent.children.length > 0) {
//         cartContent.removeChild(cartContent.children[0]);
//     }
//     this.hideCart();
// }