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

            var cardSetCollection = new CardSetCollection([
                new CardModel({value: '1', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Creative-Tail-Animal-bat.svg/128px-Creative-Tail-Animal-bat.svg.png'}),
                new CardModel({value: '1', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Creative-Tail-Animal-bat.svg/128px-Creative-Tail-Animal-bat.svg.png'}),
                new CardModel({value: '2', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Creative-Tail-Animal-cow.svg'}),
                new CardModel({value: '2', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Creative-Tail-Animal-cow.svg'}),
                new CardModel({value: '3', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Creative-Tail-Animal-cheetah.svg/128px-Creative-Tail-Animal-cheetah.svg.png'}),
                new CardModel({value: '3', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Creative-Tail-Animal-cheetah.svg/128px-Creative-Tail-Animal-cheetah.svg.png'}),
                new CardModel({value: '4', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Creative-Tail-Animal-horse.svg/128px-Creative-Tail-Animal-horse.svg.png'}),
                new CardModel({value: '4', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Creative-Tail-Animal-horse.svg/128px-Creative-Tail-Animal-horse.svg.png'}),
                new CardModel({value: '5', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Creative-Tail-Animal-panda.svg/128px-Creative-Tail-Animal-panda.svg.png'}),
                new CardModel({value: '5', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Creative-Tail-Animal-panda.svg/128px-Creative-Tail-Animal-panda.svg.png'}),
                new CardModel({value: '6', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Creative-Tail-Animal-snake.svg/128px-Creative-Tail-Animal-snake.svg.png'}),
                new CardModel({value: '6', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Creative-Tail-Animal-snake.svg/128px-Creative-Tail-Animal-snake.svg.png'}),
                new CardModel({value: '7', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Creative-Tail-Animal-fox.svg/128px-Creative-Tail-Animal-fox.svg.png'}),
                new CardModel({value: '7', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Creative-Tail-Animal-fox.svg/128px-Creative-Tail-Animal-fox.svg.png'}),
                new CardModel({value: '8', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Creative-Tail-Animal-spider.svg/128px-Creative-Tail-Animal-spider.svg.png'}),
                new CardModel({value: '8', matched: false, imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Creative-Tail-Animal-spider.svg/128px-Creative-Tail-Animal-spider.svg.png'})
            ]);

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
