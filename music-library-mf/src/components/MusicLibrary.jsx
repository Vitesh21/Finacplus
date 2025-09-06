import React, { useMemo } from 'react';
import { useMusicLibrary } from '../hooks/useMusicLibrary';
import FilterControls from './FilterControls';
import SongList from './SongList';
import AddSong from './AddSong';

const MusicLibrary = ({ userRole = 'user' }) => {
  const {
    songs,
    groupedSongs,
    filters,
    sortBy,
    sortOrder,
    groupBy,
    filterOptions,
    setFilter,
    setSort,
    setGroupBy,
    addSong,
    deleteSong,
    clearFilters
  } = useMusicLibrary();

  const isAdmin = userRole === 'admin';

  return (
    <div className="w-full">
      {/* Header with Add Song Button */}
      <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Music Collection</h2>
          <p className="text-sm text-gray-600 mt-1">
            {songs.length} song{songs.length !== 1 ? 's' : ''} available
          </p>
        </div>
        
        {isAdmin && (
          <div className="flex items-center space-x-3">
            <div className="text-xs text-gray-500 bg-purple-50 px-2 py-1 rounded">
              Admin Mode
            </div>
            <AddSong onAddSong={addSong} />
          </div>
        )}
        
        {!isAdmin && (
          <div className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded">
            View Only Mode
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <FilterControls
        filters={filters}
        filterOptions={filterOptions}
        sortBy={sortBy}
        sortOrder={sortOrder}
        groupBy={groupBy}
        setFilter={setFilter}
        setSort={setSort}
        setGroupBy={setGroupBy}
        clearFilters={clearFilters}
      />

      {/* Songs List */}
      <SongList
        groupedSongs={groupedSongs}
        groupBy={groupBy}
        userRole={userRole}
        onDeleteSong={deleteSong}
      />
    </div>
  );
};

export default MusicLibrary;
