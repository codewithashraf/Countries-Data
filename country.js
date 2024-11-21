const countryName = new URLSearchParams(location.search).get('name')
const countryCardDetail = document.querySelector('#country-detail-card')
const Name = document.querySelector('#country-name')
const nativeName = document.querySelector('#native-name')
const region = document.querySelector('#region')
const population = document.querySelector('#population')
const subRegion = document.querySelector('#sub-region')
const capital = document.querySelector('#capital')
const tld = document.querySelector('#TLD')
const currencies = document.querySelector('#currencies')
const languages = document.querySelector('#languages')
const flag = document.querySelector('#flag')
const borderTagDiv = document.querySelector('#bottom')
const backBtn = document.querySelector('#back-btn')

const darktheme = document.querySelector('#dark-theme')
const header = document.querySelector('header')


let color = 'black'
darktheme.addEventListener('click', (e) => {
  if(color === 'black'){
    document.body.style.color = 'black'
    document.body.style.backgroundColor = 'white'
    header.style.backgroundColor = 'white'
    countryCardDetail.classList.add('change')
    color = 'white'
  } else{
    document.body.style.color = 'white'
    document.body.style.backgroundColor = '#202D36'
    header.style.backgroundColor = '#2B3743'
    countryCardDetail.classList.remove('change')
    color = 'black'
  }
})





backBtn.addEventListener('click', () => {
  history.back()
})


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([countryData]) => {
  
  flag.src = `${countryData.flags.svg}`
  Name.innerHTML = `${countryData.name.common}`
  region.innerHTML = `${countryData.region}`
  population.innerHTML = `${countryData.population.toLocaleString('en-Pk')}`

  if(countryData.subregion){
   subRegion.innerHTML = `${countryData.subregion}`
  } else{
    subRegion.innerHTML = `--`
  }

  if(countryData.currencies){
    currencies.innerHTML = `${countryData.currencies}`
  }
  
  if(countryData.name.nativeName){
    nativeName.innerHTML = `${Object.values(countryData.name.nativeName)[0].common}`
  } else{
    nativeName.innerHTML = `${countryData.name.common}`
  }

  if(countryData.languages){
    languages.innerHTML = `${Object.values(countryData.languages).join(', ')}`
  } else{
    languages.innerHTML = '--' 
  }

  if(countryData.currencies){
    currencies.innerHTML = `${Object.values(countryData.currencies)[0].name}`
  } else{
    currencies.innerHTML = `--`
  }

  if(countryData.capital){
    capital.innerHTML = `${countryData.capital}`
  } else{
    capital.innerHTML = '--'
  }

  if(countryData.tld){
    tld.innerHTML = `${countryData.tld.join(', ')}`
  } else{
    tld.innerHTML = '--'
  }

  if(countryData.borders){
    countryData.borders.forEach((borderCountryName) => {
      fetch(`https://restcountries.com/v3.1/alpha/${borderCountryName}`)
      .then(res => res.json())
      .then(([data]) => {
        // console.log(data.name.common)
        const borderTag = document.createElement('a')
        borderTag.innerHTML = `${data.name.common}`
        borderTag.href = `/country.html?name=${data.name.common}`
        borderTagDiv.append(borderTag)
      })
    })
  } else {
    const span = document.createElement('span')
    span.innerHTML = 'No borders'
    borderTagDiv.append(span)
  }
})
