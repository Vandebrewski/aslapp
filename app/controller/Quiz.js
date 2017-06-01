Ext.define('ASLKids.controller.Quiz', {
    extend: 'Ext.app.Controller',
    fullscreen: false,

    config: {
        views: ['Quiz'],

        refs: {
            'questionView': 'quizpanel #questionView',
            'answersView': 'quizpanel dataview',
            'videoView': 'quizpanel #questionVideo',
            'videoPlayButton': 'quizpanel #videoPlayButton',
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

        var store = Ext.getStore('gebaarStore');
            store.clearFilter(true);

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
            finishtitel = '',
            tmp = '<div class="quizcounter count{index}"></div>';

        if (index >= max) {
            this.getQuizTitle().setHtml(finishtitel);
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
//        this.getAnswersView().show();
    },

    finish: function() {
        this.setFinished(true);

        var resultsView = this.getResultsView(),
            results = this.getResults(),
//            buyButton = resultsView.getComponent('buyButton'),
            html = "";

        resultsView.getParent().setActiveItem(resultsView);

        // correct
        
//IOS  verwijder audio stukje hieronder voor Android        
        html += "<div class='resulttext'> Great job !<br /><img src='resources/images/correct.svg'></div><audio autoplay><source src='resources/audio/soundsapp/start.mp3'></source></audio>";

        var correct = results.correct;

        html += "<div class='quizresult resultcount" + correct.length + "'></div>";

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

/*        if (Ext.os.is.Android) {
            this.getVideoPlayButton().__url = "file:///android_asset/www/resources/video/" + correctAnswer.get('plaatje') + '.mp4';
        }
        else {
            this.getVideoView().setUrl("resources/video/" + correctAnswer.get('plaatje') + ".mp4");
        }
*/
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
        
//        this.getAnswersView().hide();

//		this.getVideoView().pause(); //IOS only? Is niet echt nodig en zorgt voor extra activiteit


        if (this.getShowAnswerResultAlert()) {
// IOS verwijder stukje audio hieronder voor Android        	
            var message = correct ? "<img src='resources/images/correct.svg'><br /><br /><img src='resources/images/cake.svg'>" : "";
            var audio = new Audio('resources/audio/soundsapp/' + (correct ? 'correct.mp3' : 'wrong.mp3'));
			audio.play();

            if (!correct) {
                var correctAnswer = store.getAt(store._correctIndex);

                message += "<br />";             
                message += "<img src='resources/images/wrong.svg'><br />" + correctAnswer.get('plaatje') + "<br /><img src='resources/images/objects/" + correctAnswer.get('plaatje') + ".svg'>";

            }
/*
// iOS sound 
          if (Ext.os.is.iOS) {
            var audio = new Audio('resources/audio/soundsapp/' + (correct ? 'correct.mp3' : 'wrong.mp3'));
			audio.play(); 
			}
// END iOS sound

// Android sound
          if (Ext.os.is.Android) {
		var audio = new Audio('/android_asset/www/resources/audio/soundsapp/' + (correct ? 'correct.mp3' : 'wrong.mp3'));
            audio.play();            }
// END Android  
*/          

            Ext.Msg.alert('', message, function() {
                this.next();
            }, this);
        }
        else {
            this.next();
        }
    },

    createVideoComponent: function() {
        if (this.getVideoView() || this.getVideoPlayButton()) {
/*            if (Ext.os.is.Android) {
                this.getVideoPlayButton().destroy();
            } else {
    			this.getVideoView().pause();
    			this.getVideoView().setUrl(null);
    			this.getVideoView().destroy();
            }
*/            
            	this.getVideoView().pause();
    			this.getVideoView().setUrl(null);
    			this.getVideoView().destroy();    
        }

        this.getAnswersView().getParent().insert(1, Ext.os.is.Android ? {

		xtype: 'video',
            itemId: 'questionVideo',
            posterUrl: 'resources/images/playbutton2.svg',
			flex:9,
            enableControls: false,
            

            listeners: {
                tap: { 
                    fn: function () {
                        var me = this;
                        // removed the Pause option for now
//                        if (me.isPlaying()) {
//                            me.pause();
//                        } else {
//                            me.play();
//                        }
						me.play();
                    }, // END addEventListener
                    element: 'element'
                } // END tap
            } // END listeners

/*
            itemId: 'videoPlayButton',
            cls: 'videoPlayButtonquiz',
            xtype: 'button',
            flex: 9,
           //  text: 'play video',
            handler: function() {
                 VideoPlayer.play(this.__url, {
                     volume: 0.5
                 }//,
                 //function () {
                 //    console.log("video completed");
                 //},
                 //function (err) {
                 //    console.log(err);
                 //}
                 );
            }
*/            
            
        } : {
            xtype: 'video',
            itemId: 'questionVideo',
            posterUrl: 'resources/images/playbutton2.svg',
			flex:9,
            enableControls: false,
            

            listeners: {
                tap: { 
                    fn: function () {
                        var me = this;
                        // removed the Pause option for now
//                        if (me.isPlaying()) {
//                            me.pause();
//                        } else {
//                            me.play();
//                        }
						me.play();
                    }, // END addEventListener
                    element: 'element'
                } // END tap
            } // END listeners
        });
    },

    onVideoEnded: function(video) {
        video.media.setBottom(-2000); // wwarom was dit eigenlijk nodig???
        video.ghost.show();
//        if (video.media.pause) {
//            video.media.pause(); // fix for: the .paused flag remains false when the media has ended. I don't think this is needed anymore for IOS9 and 10
//        }
    }
});