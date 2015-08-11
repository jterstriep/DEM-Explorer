Router.route('/', function() {
  this.render('home');
});

Router.route('about');

Dems = new Mongo.Collection('dems')


if (Meteor.isClient) {

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.dems.helpers({
    demList: function() {
      return Dems.find().fetch();
    },
  });

  Template.mainmap.rendered = function() {
    map = L.map('mainmap');

    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; 
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 15,});
    map.setView(new L.LatLng(38.0, -88.0), 9);
    map.addLayer(osm);
  };
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Dems.find({}).count() == 0) {
      Dems.insert({
        title: 'Texas 3269 30m',
        url: 'http://141.142.168.18/geoserver/dems/33444c',
      });

      Dems.insert({
        title: 'HUC2233 7332 90m',
        url: 'http://141.142.168.18/geoserver/dems/99783',
      });
    }
  });
}
