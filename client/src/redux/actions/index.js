import axios from 'axios';

export const actionType = {
    GET_VIDEOGAMES: 'GET_VIDEOGAMES',
    GET_VIDEOGAMES_BY_NAME: 'GET_VIDEOGAMES_BY_NAME',
    GET_VIDEOGAMES_BY_ID: 'GET_VIDEOGAMES_BY_ID',
    GET_GENRES: 'GET_GENRES',
    POST_VIDEOGAME: 'POST_VIDEOGAME',
    GET_VGIMAGES: 'GET_VGIMAGES'
}
const url = 'http://localhost:3001';

export const getVideogames = () => {
    return function (dispatch){
        return fetch(`${url}/videogames`)
        .then(res => res.json())
        .then((data) => dispatch({
            type: actionType.GET_VIDEOGAMES, payload: data
        }))
        .catch((e) => {
            console.log(e);
        });
    }
}

export const getVideogamesByName = (name) =>{
    return function (dispatch){
        return fetch(`${url}/videogames?name=${name}`)
        .then(res => res.json())
        .then((data) => dispatch({
            type: actionType.GET_VIDEOGAMES_BY_NAME, payload: data
        }))
        .catch((e) => {
            console.log(e);
        });
    };
}

export const getVideogamesById = (id) =>{
    return function (dispatch){
        return fetch(`${url}/videogames/${id}`)
        .then(res => res.json())
        .then((data) => dispatch({
            type: actionType.GET_VIDEOGAMES_BY_ID, payload: data
        }))
        .catch((e) => {
            console.log(e);
        });
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

export const getVgImages = (imgArray) =>{
    return function (dispatch){
        return dispatch({type: actionType.GET_VGIMAGES, payload:imgArray})
    }
}