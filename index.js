

const countriesContainer = document.querySelector("#countries-container");
const darkTheme = document.querySelector('#dark-theme')
const icon = document.querySelector('#dark-theme i')
const header = document.querySelector('header')
const countryCard = document.querySelector('.country-card')
const select = document.querySelector('select')
const searching = document.querySelector('#searching')
const inline = document.querySelector('#inline')


// light theme and dark theme mode 


let color = 'black'
darkTheme.addEventListener('click', (e) => {
  if(color === 'black'){
    document.body.style.color = 'black'
    document.body.style.backgroundColor = 'white'
    header.style.backgroundColor = 'white'
    countriesContainer.classList.add('change')
    inline.classList.remove('change')
    icon.classList.remove('fa-moon')
    icon.classList.add('fa-sun')
    color = 'white'
  } else{
    document.body.style.color = 'white'
    document.body.style.backgroundColor = '#202D36'
    header.style.backgroundColor = '#2B3743'
    countriesContainer.classList.remove('change')
    inline.classList.add('change')
    icon.classList.remove('fa-sun')
    icon.classList.add('fa-moon')
    color = 'black'
  }
})


let allCountriesData;

// countriesRender function ko call karnay ka code

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((allData) => {
    countriesRender(allData)
    allCountriesData = allData
  });

// region vise funtionality code

select.addEventListener('change', (e) => {
  fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((allData) => {
    const regionData = allData.filter((val, index) => {
      if(allData[index].region === e.target.value){
        return val
      }  
    })
    countriesRender(regionData)
  })
})

// search funtionality code

searching.addEventListener('input', (e) => {
  const filterData = allCountriesData.filter((countryData) => {
    return countryData.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  })
  countriesRender(filterData)
})

// render function code 

function countriesRender(allData){
  countriesContainer.innerHTML = ''
  allData.forEach((countryData) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${countryData.name.common}`
    countryCard.innerHTML = `
      <img src='${countryData.flags.svg}' alt="">
      <div id="card-data">
        <h3>${countryData.name.common}</h3>
        <p><b>Population:</b> <span>${countryData.population.toLocaleString('en-Pk')} </span> </p>
        <p><b>Region:</b><span> ${countryData.region} </span></p>
        <p><b>Capital:</b><span> ${countryData.capital?.[0]} </span></p>
      </div>
      `
    countriesContainer.append(countryCard);
  });
}
