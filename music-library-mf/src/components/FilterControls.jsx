import React from 'react';

const FilterControls = ({
  filters,
  filterOptions,
  sortBy,
  sortOrder,
  groupBy,
  setFilter,
  setSort,
  setGroupBy,
  clearFilters
}) => {
  const sortFields = [
    { value: 'title', label: 'Title' },
    { value: 'artist', label: 'Artist' },
    { value: 'album', label: 'Album' },
    { value: 'year', label: 'Year' },
    { value: 'genre', label: 'Genre' }
  ];

  const groupFields = [
    { value: '', label: 'No Grouping' },
    { value: 'artist', label: 'Artist' },
    { value: 'album', label: 'Album' },
    { value: 'genre', label: 'Genre' },
    { value: 'year', label: 'Year' }
  ];

  return (
    <div className="bg-gray-50 p-6 border-b border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Search songs, artists, albums..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Artist Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Artist
          </label>
          <select
            value={filters.artist}
            onChange={(e) => setFilter('artist', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Artists</option>
            {filterOptions.artists.map(artist => (
              <option key={artist} value={artist}>{artist}</option>
            ))}
          </select>
        </div>

        {/* Album Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Album
          </label>
          <select
            value={filters.album}
            onChange={(e) => setFilter('album', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Albums</option>
            {filterOptions.albums.map(album => (
              <option key={album} value={album}>{album}</option>
            ))}
          </select>
        </div>

        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            value={filters.genre}
            onChange={(e) => setFilter('genre', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Genres</option>
            {filterOptions.genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort and Group Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <div className="flex">
            {sortFields.map(field => (
              <button
                key={field.value}
                type="button"
                onClick={() => setSort(field.value)}
                className={`px-3 py-1 text-sm border-r border-gray-300 last:border-r-0 transition duration-200 ${
                  sortBy === field.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } ${
                  field.value === 'title' ? 'rounded-l-md' : ''
                } ${
                  field.value === 'genre' ? 'rounded-r-md' : ''
                }`}
              >
                {field.label}
                {sortBy === field.value && (
                  <span className="ml-1">
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Group By */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Group by:</label>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {groupFields.map(field => (
              <option key={field.value} value={field.value}>{field.label}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <button
          type="button"
          onClick={clearFilters}
          className="px-4 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterControls;
