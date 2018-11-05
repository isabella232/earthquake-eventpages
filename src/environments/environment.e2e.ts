export const environment = {
  production: false,
  scenario: false,

  CONTRIBUTOR_SERVICE:
    'https://earthquake.usgs.gov/data/comcat/contributor/index.json.php',
  DELETED_EVENT_SERVICE:
    'https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?' +
    'includedeleted=true',
  EVENT_SERVICE: '/earthquakes/feed/v1.0/detail/{eventid}.geojson',
  GEOSERVE_SERVICE: '/ws/geoserve'
};
