
const getFetchCountry = async () => {
    let flag = document.querySelector('.flags');
    let nameCountry = 'Ukraine';
    let finalUrl  = `https://restcountries.com/v3.1/name/${nameCountry}?fullText=true`;
    const respo = await fetch(finalUrl);
    const data = await respo.json();

    console.log(data[0]);
    console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
    console.log(Object.values(data[0].languages).toString());
 

    console.log(data[0].flags.svg);

    flag.innerHTML = `
    <img src="${data[0].flags.svg}" alt="">
    `;


};
getFetchCountry();