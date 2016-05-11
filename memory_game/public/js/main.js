// Copyright (C) 2014 Steven Richardson steven.richardson25@gmail.com
require.config({

    baseUrl: 'js/',

    paths: {
        // Dependencies
        //'jquery': 'lib/jquery.min',
        'underscore': 'lib/underscore.min',
        'backbone': 'lib/backbone.min',

        // Collections
        'CardSetCollection': 'app/collections/CardSetCollection',

        // Models
        'CardModel': 'app/models/CardModel',
        'GameModel': 'app/models/GameModel',

        // Views
        'GameBoardView': 'app/views/GameBoardView',
        'CardView': 'app/views/CardView',

        'Header': "app/header"
    },

    shim: {
        underscore: {
             exports: '_'
        },
        backbone: {
             deps: ["underscore"],
             exports: "Backbone"
        }
    }
});

requirejs(['backbone', 'GameBoardView', 'CardView', 'CardSetCollection', 'GameModel', 'CardModel'], function (backbone, GameBoardView, CardView, CardSetCollection, GameModel, CardModel) {

    $(document).ready(function() {

        $("#help").click(function() {
            // open lightbox with help info
        });

        function startGame () {

            // If we've already played a game, destroy the existing game board
            if (gameBoardView) {
                gameBoardView.destroy();
            }
            console.info(images_set);
            var cardSetCollection = new CardSetCollection();
            _.each(images_set, function(value, key){
                cardSetCollection.add(new CardModel({value: key, matched: false, imagePath: value}));
                cardSetCollection.add(new CardModel({value: key, matched: false, imagePath: value}));
            });

            var gameModel = new GameModel({cardSet: cardSetCollection});
            var gameBoardView = new GameBoardView({model: gameModel});
            $('#appContent').html(gameBoardView.el);
        }

        $("#restart").click(function() {
            //console.log("restart game"); // TEMP
            startGame();
        });

        // Initialize the game
        startGame();

    });

});
