export default function fetchCountries(searchQuery) {
  const a = fetch(`https://restcountries.com/v2/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
  return a;
}
