



class MarvelService {
    _apiBasic = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=0b245886065ab63ab566b5a6ecf930b3'

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    };
    getAllCharacters = () => {
        return this.getResource(`${this._apiBasic}characters?limit=9&offset=210&${this._apiKey}`);

    }
    getCharacter = (id) => {
        return this.getResource(`${this._apiBasic}characters/${id}?${this._apiKey}`);

    }
}
export default MarvelService;
