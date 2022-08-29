import axios from 'axios';

export const actionType = {
    GET_VIDEOGAMES: 'GET_VIDEOGAMES',
    GET_VIDEOGAMES_BY_NAME: 'GET_VIDEOGAMES_BY_NAME',
    GET_VIDEOGAMES_BY_ID: 'GET_VIDEOGAMES_BY_ID',
    GET_GENRES: 'GET_GENRES',
    POST_VIDEOGAME: 'POST_VIDEOGAME',
    GET_VGIMAGES: 'GET_VGIMAGES',
    ALPHABETICAL_ORDER: 'ALPHABETICAL_ORDER',
    RANK_ORDER: 'RANK_ORDER',
    CREATION_FILTER: 'CREATION_FILTER',
    GENRES_FILTER: 'GENRES_FILTER'
}
const url = 'http://localhost:3001';

export const getVideogames = () => {
    return function (dispatch){
        return fetch(`${url}/videogames`)
        .then(res => res.json())
        .then((data) => dispatch({
            type: actionType.GET_VIDEOGAMES, payload: data
        }))
    }
}

export const getVideogamesByName = (name) =>{
    return function (dispatch){
        return fetch(`${url}/videogames?name=${name}`)
        .then(res => res.json())
        .then((data) => dispatch({
            type: actionType.GET_VIDEOGAMES_BY_NAME, payload: data
        }))
    };
}

export const getVideogamesById = (id) =>{
    return function (dispatch){
        return fetch(`${url}/videogames/${id}`)
        .then(res => res.json())
        .then((data) => dispatch({
            type: actionType.GET_VIDEOGAMES_BY_ID, payload: data
        }))
    };
}

export const getGenres = ()=>{
    return function (dispatch){
        return fetch(`${url}/genres`)
        .then(res => res.json())
        .then((data) => dispatch({
            type: actionType.GET_GENRES, payload: data
        }))
        .catch((e) => {
            console.log(e);
        });
    };
}

export const createVideogame = (videogame) => {
    return function (dispatch)    {
        return axios
        .post(`${url}/videogames`, videogame).then((data) => {
            return dispatch({type: actionType.POST_VIDEOGAME, payload: data})
        })
    }
}

export const alphabetSort= (type)=>{
    return{
        type: actionType.ALPHABETICAL_ORDER, payload:type
    };
}

export const rankSort= (type)=>{
    return{
        type: actionType.RANK_ORDER, payload:type
    }
}

export const creationFilter = (type)=>{
    return{
        type: actionType.CREATION_FILTER, payload:type
    }
}

export const genresFilter = (type)=>{
    return{
        type: actionType.GENRES_FILTER, payload:type
    }
}