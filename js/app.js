const app = document.querySelector('.profil');
let modal = document.querySelector('.modal');



let user = {
    gender: '',
    name: {
        title: '',
        last: '',
        first: '',
    },
    phone: 0,
    email: '',
    dob: {
        age: 0,
    },
    picture: {
        large: '',
    },
    location: {
        city: '',
        country: '',
    }
}; // db
const getApiUser = async () => {
    const linkUsers = 'https://randomuser.me/api/?results=100';
    const res = await fetch(linkUsers);
    const data = await res.json();

    const {
        results
    } = data;

    const [{
        gender,
        name: {
            title,
            last,
            first,
        },
        phone,
        email,
        dob: {
            age
        },
        picture: {
            large,
        },
        location: {
            city,
            country
        }
    }] = results;

    user = {
        gender: gender,
        name: {
            title: title,
            last: last,
            first: first,
        },
        phone: phone,
        email: email,
        dob: {
            age: age,
        },
        picture: {
            large: large,
        },
        location: {
            city: city,
            country: country,
        }
    };


    const getApiFlags = async () => {
        const linkFlags = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
        const resF = await fetch(linkFlags);
        const dataF = await resF.json();
        const [{
            flags: {
                alt,
                svg
            }
        }] = dataF;

        user = {
            ...user,
            flags: {
                svg: svg,
                alt: alt,
            }
        };
        renderContent();
    };
    getApiFlags();
};

const getFlag = (flags) => {
    const {alt, svg} = flags;
    return `<img src="${svg}" alt="${alt}">`;
};

const getImage = (picture) => {
    const {
        large
    } = picture;
    return `<img class="card__img-large" src="${large}" alt="">`;
};

const getTitle = (name) => {
    const {
        title,
        last,
        first
    } = name;
    return `${title} ${last} ${first}`;
};

const getLocal = (location) => {
    const {
        city,
        country
    } = location;
    return `
    <div class="card__local">
        <div class="card__loccal-city">
        ${city}
        </div>
        <div class="card__local-country">
        ${country}
        </div>
    </div>`;
};
const renderContent = () => {
    const {
        picture,
        phone,
        email,
        location,
        name,
        flags,
    } = user;
    app.innerHTML = `
        <div class="card">
            <div class="card__img">
                ${getImage(picture)}
            </div>
            <div class="card__title">
                ${getTitle(name)}
            </div>
                ${getLocal(location)}
            
            <div class="card__flags">${getFlag(flags)}</div>
            <div class="card__more">
                <a href="#">email: ${email}</a>
                <a href="#">phone: ${phone}</a>
            </div>
        </div>  
`;

};

const clickTime = (modal) => {
    setTimeout(() => {
        modal.classList.add('active');
    }, 2000);
    app.addEventListener('click', (e) => {
        let target = e.target;
        if (target.className.includes('card__img-large')) {
            modal.classList.remove('active');
            getApiUser();
        }
    });
};

clickTime(modal);
getApiUser();

