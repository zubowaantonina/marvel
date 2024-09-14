import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();
  const _apiBasic = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=0b245886065ab63ab566b5a6ecf930b3";
  const _baseOffset = 210;

  const _baseOffsetComics = 0;
  // getResource = async (url) => {
  //   let res = await fetch(url);
  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status ${res.status}`);
  //   }
  //   return await res.json();
  // };
  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBasic}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter)


  };
  const getCharacter = async (id) => {
    const res = await request(`${_apiBasic}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };
  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    };
  };
  //поиск по имени
  const getCharacterByName = async(name) => {
    const res=await request(`${_apiBasic}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter)
  }
  //получить все комиксы
  const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBasic}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};
  const getComic = async (id) => {
    const res = await request(`${_apiBasic}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };
  const _transformComics = (comics) => {
    // const price = comics.prices && comics.prices[0] && comics.prices[0].price;
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || "en-us",
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",

    }
  }
  return { loading, error, getAllCharacters, getCharacter, getCharacterByName, clearError, getAllComics, getComic }
}
export default useMarvelService;
