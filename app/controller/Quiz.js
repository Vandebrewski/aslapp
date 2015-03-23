Ext.define('ASLKids.controller.Quiz', {
    extend: 'Ext.app.Controller',
    fullscreen: false,

    config: {
        views: ['Quiz'],

        refs: {
            'questionView': 'quizpanel #questionView',
            'answersView': 'quizpanel dataview',
            'videoView': 'quizpanel #questionVideo',
            'resultsView': 'quizpanel #resultsView',
            'resultsText': 'quizpanel #resultsText',
            'quizTitle': 'quizpanel #quizTitle'
        },

        control: {
            'quizpanel': {
                'activate': 'setup'
            },

            'answersView': {
                'select': 'onAnswerSelection'
            },

            'quizpanel #repeatButton': {
                'tap': 'setup'
            },

            'videoView': {
                ended: 'onVideoEnded'
            }
        },

        /**
         * True to show the alert after answering a question
         * @type {Boolean}
         */
        showAnswerResultAlert: true,

        /**
         * The number of questions to ask
         * @type {Number}
         */
        questionCount: 5,

        /**
         * The current question the user is answering
         * @type {Number}
         * @private
         */
        currentQuestionIndex: 0,

        /**
         * The existing question indexes. We use this so we don't have the same question twice.
         * @type {Array}
         * @private
         */
        existingQuestionIndexes: [],

        /**
         * An object of correct and incorrect answers
         * @type {Object}
         * @private
         */
        results: {
            correct: [],
            incorrect: []
        },

        /**
         * True if the quiz is complete
         * @type {Boolean}
         * @private
         */
        finished: false
    },

    setup: function() {
        this.setResults({
            correct: [],
            incorrect: []
        });

        this.setCurrentQuestionIndex(0);
        this.setExistingQuestionIndexes([]);
        this.setFinished(false);
        this.generateQuestions();

        var questionView = this.getQuestionView();
        questionView.getParent().setActiveItem(questionView);

        this.updateQuizTitle();
    },

    updateQuizTitle: function() {
        var index = this.getCurrentQuestionIndex(),
            max = this.getQuestionCount(),
            title = 'Which sign is this?',
            tmp = '<div class="quizcounter count{index}"></div>';

        if (index >= max) {
            this.getQuizTitle().setHtml(title);
        }
        else {
            tmp = tmp.replace('{index}', index + 1);
            tmp = tmp.replace('{max}', max);
            this.getQuizTitle().setHtml(title + tmp);
        }
    },

    next: function() {
        if (this.getFinished()) {
            return;
        }

        var index = this.getCurrentQuestionIndex(),
            max = this.getQuestionCount();

        index++;
        
        if (index >= max) {
            this.finish();
        }
        else {
            this.generateQuestions();
        }

        this.setCurrentQuestionIndex(index);
        this.updateQuizTitle();
    },

    finish: function() {
        this.setFinished(true);

        var resultsView = this.getResultsView(),
            results = this.getResults(),
            buyButton = resultsView.getComponent('buyButton'),
            html = "";

        resultsView.getParent().setActiveItem(resultsView);

        // correct
        html += "<div class='resulttext'> Good job !<br /><img src='resources/images/correct.png'></div>";
        
        var correct = results.correct;

        html += "<div class='quizresult resultcount" + correct.length + "'></div>";

        var IAP = ASLKids.app.getController('IAP');
        if (IAP.getPurchased()) {
            buyButton.setHidden(true);
        }
        else {
            buyButton.setText(IAP.getPrice());

            IAP.on('purchase', function() {
                buyButton.setHidden(true);
            }, this);
        }
        
        if (IAP.getReady()) {
            buyButton.setDisabled(false);
        }
        
 //       var incorrect = results.incorrect;

//        html += incorrect.length + " <img src='resources/images/count5.png'></div>";

        this.getResultsText().setHtml(html);
    },

    generateQuestions: function() {
        var questions = [],
            answerCount = 3,
            existingQuestionIndexes = this.getExistingQuestionIndexes(),
            store = Ext.getStore('gebaarStore'),
            storeCount = store.getCount(),
            answerIndexes = this.getRandomIndexes(0, storeCount - 1, answerCount, existingQuestionIndexes),
            correctIndex = this.getRandomIndexes(0, answerCount - 1, 1)[0],
            answersStore, i;

        answersStore = Ext.create('Ext.data.Store', {
            model: 'ASLKids.model.Gebaar'
        });

        for (i = 0; i < answerCount; i++) {
            answersStore.add(store.getAt(answerIndexes[i]))
        }

        answersStore._correctIndex = correctIndex;

        this.getAnswersView().setStore(answersStore);

        var correctAnswer = answersStore.getAt(correctIndex);

        this.createVideoComponent();
        this.getVideoView().setUrl("resources/video/" + correctAnswer.get('plaatje') + ".mp4");

//        console.log("correct answer: ", correctAnswer.get('plaatje'));

        existingQuestionIndexes.push(answerIndexes[correctIndex]);
    },

    getRandomIndexes: function(min, max, number, ignored) {
        var indexes = [];

        while (indexes.length < number) {
            var random = Math.floor(Math.random() * (max - min + 1)) + min;

            if (ignored && ignored.length > 0) {
                if (ignored.indexOf(random) != -1) {
                    continue;
                }
            }

            if (indexes.indexOf(random) == -1) {
                indexes.push(random);
            }
        }

        return indexes;
    },

    onAnswerSelection: function(view, record) {
        var store = view.getStore(),
            results = this.getResults(),
            correct;

        correct = store.indexOf(record) == store._correctIndex;

        results[correct ? "correct" : "incorrect"].push(record);
        this.setResults(results);

        view.deselectAll();

        if (this.getShowAnswerResultAlert()) {
            var message = correct ? "<img src='resources/images/correct.png'><br /><br /><img src='resources/images/cake.svg'>" : "<img src='resources/images/wrong.png'>";

            if (!correct) {
                var correctAnswer = store.getAt(store._correctIndex);

                message += "<br />";
                message += "<br />The correct answer was: <br /><br /><img src='resources/images/objects/thumbnails/" + correctAnswer.get('plaatje') + ".png'>";
            }

            var audio = new Audio('resources/audio/soundsapp/' + (correct ? 'correct.mp3' : 'wrong.mp3'));
            audio.play();

            Ext.Msg.alert('', message, function() {
                this.next();
            }, this);
        }
        else {
            this.next();
        }
    },

    createVideoComponent: function() {
        if (this.getVideoView()) {
			 this.getVideoView().pause();
			this.getVideoView().setUrl(null);
			this.getVideoView().destroy();
        }

        this.getAnswersView().getParent().insert(1, {
            xtype: 'video',
            itemId: 'questionVideo',
            posterUrl: 'resources/images/playbutton2.svg',
//            width: 768,
//            height: 432,           
			flex:9,
			cls: 'QuizVideo',
            enableControls: false,
                            
            listeners: {                    
                painted: function () {
//                    this.media.dom.load(); // I don't think this is needed
                    this.media.dom.setAttribute('webkit-playsinline', 'true')//; // make it play inline on iphone          
                },
                tap: {
                    fn: function () {                                                           
                        var me = this;
                        
                        me.media.dom.addEventListener("playing", function() { // wait for quicktime to be ready so it doesnt show quicktime logo ------- try canplaythrough or canplay-------
                            me.play();
                            }, true);  
                        
                        
                        if (me.isPlaying()) {                                       
                            me.pause();
                        } else {                                  
                            me.play();
                        }                            
                    }, // END addEventListener
                    element: 'element'
                } // END tap
            } // END listeners
        });
    },

    onVideoEnded: function(video) {
        video.media.setBottom(-2000);
        video.ghost.show();
        video.media.pause(); // fix for: the .paused flag remains false when the media has ended
    }
});

