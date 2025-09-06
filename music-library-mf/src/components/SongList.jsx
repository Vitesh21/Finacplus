import React from 'react';

const SongList = ({ groupedSongs, groupBy, userRole, onDeleteSong }) => {
  const isAdmin = userRole === 'admin';

  const handleDelete = (songId, songTitle) => {
    if (window.confirm(`Are you sure you want to delete "${songTitle}"?`)) {
      onDeleteSong(songId);
    }
  };

  const SongRow = ({ song }) => (
    <div className="group hover:bg-gray-50 p-4 border-b border-gray-100 last:border-b-0 transition duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {song.title}
              </h4>
              <p className="text-sm text-gray-500 truncate">
                {song.artist}
              </p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-gray-900 truncate">{song.album}</p>
              <p className="text-xs text-gray-500">Album</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-gray-900">{song.genre}</p>
              <p className="text-xs text-gray-500">Genre</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-gray-900">{song.year}</p>
              <p className="text-xs text-gray-500">Year</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">{song.duration}</p>
                <p className="text-xs text-gray-500">Duration</p>
              </div>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(song.id, song.title)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition duration-200"
                  title="Delete song"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 7-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (Object.keys(groupedSongs).length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l6 3-6 3z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No songs found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Row */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="md:col-span-2">Song / Artist</div>
          <div className="hidden md:block">Album</div>
          <div className="hidden lg:block">Genre</div>
          <div className="hidden lg:block">Year</div>
          <div>Duration / Actions</div>
        </div>
      </div>

      {/* Songs List */}
      {Object.entries(groupedSongs).map(([groupName, songs]) => (
        <div key={groupName} className="mb-0">
          {groupBy && (
            <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-blue-900">
                  {groupName} ({songs.length} song{songs.length !== 1 ? 's' : ''})
                </h3>
                <div className="text-xs text-blue-600">
                  {groupBy.charAt(0).toUpperCase() + groupBy.slice(1)} Group
                </div>
              </div>
            </div>
          )}
          
          <div className="divide-y divide-gray-100">
            {songs.map(song => (
              <SongRow key={song.id} song={song} />
            ))}
          </div>
        </div>
      ))}

      {/* Footer Stats */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Total: {Object.values(groupedSongs).reduce((acc, songs) => acc + songs.length, 0)} songs
          </span>
          {groupBy && (
            <span>
              Grouped by: {groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongList;
