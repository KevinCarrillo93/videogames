import { actionType  } from "../actions";

const initialState = {
    videoGamesLoaded: [],
    allGenres: [],
    videoGameDetail: {},
    vgsFiltered: [],
    allVideogames:[]
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_VIDEOGAMES: {
            return {
                ...state,
                videoGamesLoaded: action.payload,
                vgsFiltered: action.payload,
                allVideogames: action.payload
            }
        }
        case actionType.GET_VIDEOGAMES_BY_NAME: {
            return {
                ...state,
                videoGamesLoaded: action.payload,
                vgsFiltered:action.payload,
                allVideogames:action.payload
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
        case actionType.ALPHABETICAL_ORDER:{
            if (action.payload === 'ASC') {
                return{
                    ...state,
                    videoGamesLoaded: state.vgsFiltered.sort((a,b)=>{
                        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                        return 0
                    })
                };                
            }else if (action.payload === 'DES') {
                return{
                    ...state,
                    videoGamesLoaded: state.vgsFiltered.sort((a,b)=>{
                        if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                        return 0
                    })
                }
            }else{
                return { ...state, 
                    videoGamesLoaded:state.vgsFiltered,
                    vgsFiltered: state.vgsFiltered
                }
            }
        }
        case actionType.RANK_ORDER:{
            if(action.payload === 'UP') {
                return{
                    ...state,
                    videoGamesLoaded: state.vgsFiltered.sort((a,b)=>{
                        if(a.rating > b.rating) return 1;
                        if(a.rating < b.rating) return -1;
                        return 0
                    })
                }
            }else if(action.payload === 'DOWN'){
                return{
                    ...state,
                    videoGamesLoaded: state.vgsFiltered.sort((a,b)=>{
                        if(a.rating > b.rating) return -1;
                        if(a.rating < b.rating) return 1;
                        return 0
                    })
                }
            }else{
                return { ...state, 
                    videoGameDetail:state.vgsFiltered}
            }
        }
        case actionType.CREATION_FILTER:{
            if(action.payload === 'BYME'){
                let filter = state.allVideogames.filter(vg=> vg.id.toString().includes('-') )
                return{
                    ...state,
                    videoGamesLoaded: filter,
                    vgsFiltered: filter
                }

            }else if(action.payload === 'GLOBAL'){
                let filter = state.allVideogames.filter(vg=> !vg.id.toString().includes('-') )
                return{
                    ...state,
                    videoGamesLoaded: filter,
                    vgsFiltered: filter
                }
            }else{
                return{
                    ...state,
                    videoGamesLoaded: state.allVideogames,
                    vgsFiltered: state.allVideogames
                }
            }
        }
        case actionType.GENRES_FILTER:{
            if(action.payload === 'genres'){
                return{
                    ...state,
                    videoGamesLoaded: state.allVideogames,
                    vgsFiltered: state.allVideogames
                }
            }
            let filter = state.allVideogames.filter(vg=> vg.genres.some(g=>g.name === action.payload));
            return{
                ...state,
                videoGamesLoaded: filter,
                vgsFiltered: filter
            }
        }
        default: {
            return { ...state }
        }
    }



  };
  
  export default rootReducer;