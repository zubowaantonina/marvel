import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {
    const [comicsList, setcomicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setcomicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllComics(offset)
            .then(onComicsListLoaded)

    }
    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setcomicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9)
        setcomicsEnded(comicsEnded => ended)
    }
    function renderItems(arr) {
        const items = arr.map((item) => {
            const { id, name, thumbnail, price, avialable } = item;

            const priceItem = avialable !== 0 ? price : "NOT AVAILABLE";

            return (
                <li className="comics__item" key={id}>
                    <a href="#">
                        <img src={thumbnail} alt={name} className="comics__item-img" />
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{priceItem}</div>
                    </a>
                </li>
            );
        });
        return items;
    }
    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;



    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}

            <ul className="comics__grid">
                {items}

            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;