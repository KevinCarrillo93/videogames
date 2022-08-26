import { actionType  } from "../actions";

const initialState = {
    videoGamesLoaded: [],
    allGenres: [],
    videoGameDetail: {},
    currentVgImages: []
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_VIDEOGAMES: {
            return {
                ...state,
                videoGamesLoaded: action.payload
            }
        }
        case actionType.GET_VIDEOGAMES_BY_NAME: {
            return {
                ...state,
                videoGamesLoaded: action.payload
            }
        }
        case actionType.GET_VIDEOGAMES_BY_ID: {
            return {
                ...state,
                videoGameDetail: action.payload
            }
        }
        case actionType.GET_GENRES: {
            return {
                ...state,
                allGenres: action.payload 
            }
        }
        case actionType.POST_VIDEOGAME: {
            return {
                ...state,
                videoGamesLoaded: [...state.videoGamesLoaded, action.payload]
            }
        }
        case actionType.GET_VGIMAGES:{
            return{
                ...state,
                currentVgImages:action.payload
            }
        }
        default: {
            return { ...state }
        }
    }



  };
  
  export default rootReducer;