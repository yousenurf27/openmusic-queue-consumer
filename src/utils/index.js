const mapModelPlaylists = ({
  id,
  name,
}) => ({
  id,
  name,
});

const mapModelSongs = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

module.exports = {
  mapModelPlaylists, mapModelSongs,
};
