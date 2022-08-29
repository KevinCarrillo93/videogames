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
    //cambiar fetch por axios, y en la ruta se quita la 
    return async function (dispatch){
        const data = await axios('/videogames')
        return dispatch({type: actionType.GET_VIDEOGAMES, payload: data.data})
    }
}

export const getVideogamesByName = (name) =>{
    return async function (dispatch){
        const data = await axios(`/videogames?name=${name}`) 
        return dispatch({type: actionType.GET_VIDEOGAMES_BY_NAME, payload: data.data})
    };
}

export const getVideogamesById = (id) =>{
    return async function (dispatch){
        const data = await axios(`/videogames/${id}`)
        return dispatch({ type: actionType.GET_VIDEOGAMES_BY_ID, payload: data.data})
    };
}

export const getGenres = ()=>{
    return async function (dispatch){
        const data = await axios(`/genres`)
        return dispatch({type: actionType.GET_GENRES, payload: data.data})
    };
}

export const createVideogame = (videogame) => {
    return function (dispatch)    {
        return axios
        .post(`/videogames`, videogame).then((data) => {
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