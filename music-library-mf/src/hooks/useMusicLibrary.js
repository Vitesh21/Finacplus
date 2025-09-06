import { useReducer, useMemo } from 'react';
import { sampleSongs } from '../data/sampleSongs';

const musicLibraryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.type]: action.payload.value
        }
      };
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.field,
        sortOrder: state.sortBy === action.payload.field 
          ? (state.sortOrder === 'asc' ? 'desc' : 'asc')
          : 'asc'
      };
    case 'SET_GROUP_BY':
      return {
        ...state,
        groupBy: action.payload
      };
    case 'ADD_SONG':
      return {
        ...state,
        songs: [...state.songs, { ...action.payload, id: Date.now() }]
      };
    case 'DELETE_SONG':
      return {
        ...state,
        songs: state.songs.filter(song => song.id !== action.payload)
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          search: '',
          album: '',
          artist: '',
          genre: ''
        }
      };
    default:
      return state;
  }
};

const initialState = {
  songs: sampleSongs,
  filters: {
    search: '',
    album: '',
    artist: '',
    genre: ''
  },
  sortBy: '',
  sortOrder: 'asc',
  groupBy: ''
};

export const useMusicLibrary = () => {
  const [state, dispatch] = useReducer(musicLibraryReducer, initialState);

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    return {
      albums: [...new Set(state.songs.map(song => song.album))].filter(Boolean).sort(),
      artists: [...new Set(state.songs.map(song => song.artist))].filter(Boolean).sort(),
      genres: [...new Set(state.songs.map(song => song.genre))].filter(Boolean).sort()
    };
  }, [state.songs]);

  // Filter and sort songs
  const processedSongs = useMemo(() => {
    let filtered = state.songs;

    // Apply search filter
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      filtered = filtered.filter(song =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        (song.album && song.album.toLowerCase().includes(searchTerm)) ||
        (song.genre && song.genre.toLowerCase().includes(searchTerm))
      );
    }

    // Apply specific filters
    Object.entries(state.filters).forEach(([filterType, filterValue]) => {
      if (filterType !== 'search' && filterValue) {
        filtered = filtered.filter(song => 
          song[filterType]?.toLowerCase() === filterValue.toLowerCase()
        );
      }
    });

    // Apply sorting
    if (state.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[state.sortBy] || '';
        let bVal = b[state.sortBy] || '';

        // Handle numeric values
        if (state.sortBy === 'year') {
          aVal = parseInt(aVal) || 0;
          bVal = parseInt(bVal) || 0;
        }

        // Handle string comparison
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (state.sortOrder === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [state.songs, state.filters, state.sortBy, state.sortOrder]);

  // Group songs if groupBy is set
  const groupedSongs = useMemo(() => {
    if (!state.groupBy) return { 'All Songs': processedSongs };

    return processedSongs.reduce((groups, song) => {
      const groupKey = song[state.groupBy] || 'Unknown';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(song);
      return groups;
    }, {});
  }, [processedSongs, state.groupBy]);

  // Actions
  const setFilter = (type, value) => {
    dispatch({ type: 'SET_FILTER', payload: { type, value } });
  };

  const setSort = (field) => {
    dispatch({ type: 'SET_SORT', payload: { field } });
  };

  const setGroupBy = (field) => {
    dispatch({ type: 'SET_GROUP_BY', payload: field });
  };

  const addSong = (song) => {
    dispatch({ type: 'ADD_SONG', payload: song });
  };

  const deleteSong = (id) => {
    dispatch({ type: 'DELETE_SONG', payload: id });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  return {
    songs: processedSongs,
    groupedSongs,
    filters: state.filters,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    groupBy: state.groupBy,
    filterOptions,
    setFilter,
    setSort,
    setGroupBy,
    addSong,
    deleteSong,
    clearFilters
  };
};
