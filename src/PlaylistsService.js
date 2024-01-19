const { Pool } = require('pg');
const { mapModelPlaylists, mapModelSongs } = require('./utils');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(id) {
    const playlistQuery = {
      text: `SELECT p.* FROM playlists AS p
      INNER JOIN users AS u ON u.id = p.owner
      WHERE p.id = $1`,
      values: [id],
    };

    const playlistResult = await this._pool.query(playlistQuery);

    const playlist = playlistResult.rows.map(mapModelPlaylists)[0];

    const songsQuery = {
      text: `SELECT s.*, ps.playlist_id FROM songs AS s
      INNER JOIN playlist_songs AS ps ON ps.song_id = s.id
      WHERE ps.playlist_id = $1`,
      values: [id],
    };

    const songsResult = await this._pool.query(songsQuery);

    return {
      playlist: {
        ...playlist,
        songs: songsResult.rows.map(mapModelSongs),
      },
    };
  }
}

module.exports = PlaylistsService;
