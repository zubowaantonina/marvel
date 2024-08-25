class MarvelService {
  _apiBasic = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=0b245886065ab63ab566b5a6ecf930b3";

  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
  };
  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBasic}characters?limit=9&offset=210&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter)
    
    
  };
  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBasic}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };
  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}
export default MarvelService;
