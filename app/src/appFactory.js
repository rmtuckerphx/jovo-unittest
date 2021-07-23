'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const appConfig = require('./appConfig');

const _get = require('lodash.get');

function getApp() {

    if (process.env.NODE_ENV === 'UNIT_TEST_ENV') {
        appConfig.i18n.filesDir = './app/src/i18n';
        appConfig.logging = false;
    } else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'PROD'){
        // appConfig.db = {
        //     MongoDb: {
        //         databaseName: process.env.MONGO_DB_NAME,
        //         collectionName: process.env.MONGO_COL_NAME,
        //         uri: process.env.MONGO_URI,
        //     },
        // }
    }

    const app = new App(appConfig);

    app.use(
        new Alexa(),
    );

    if (process.env.NODE_ENV === 'UNIT_TEST_ENV') {
        // const { FileDb } = require('jovo-db-filedb');

        // app.use(
        //     new FileDb(),
        // );

    } else if (process.env.NODE_ENV === 'LOCAL') {
        const { JovoDebugger } = require('jovo-plugin-debugger');
        const { FileDb } = require('jovo-db-filedb');

        app.use(
            new FileDb(),
            new JovoDebugger(),
        );
    } else {
        // PROD
        const { MongoDb } = require('jovo-db-mongodb');        
        app.use(new MongoDb())
    }


    // ------------------------------------------------------------------
    // MIDDLEWARES
    // ------------------------------------------------------------------

    // app.hook('before.router', (error, host, jovo) => {
    //     if (jovo.$request.request.type === 'SessionResumedRequest') {
    //         const token = _get(jovo.$request, 'request.cause.token');
    //         if (token && token === tokens.PIN) {
    //             jovo.$type = { type: 'PinComplete' };
    //         }
    //     }
    // });


    // ------------------------------------------------------------------
    // APP LOGIC
    // ------------------------------------------------------------------

    app.setHandler({
        LAUNCH() {
            return this.toIntent('HelloWorldIntent');
        },
    
        HelloWorldIntent() {
            this.followUpState('IntroductionState')
                .ask('Hello World! What\'s your name?', 'Please tell me your name.');
        },
    
        'IntroductionState': {
            MyNameIsIntent() {
    
                this.toStatelessIntent('MyNameIsIntent');
            },
    
            // // Test fails if this is commented out
            // 'Unhandled': function(name) {
            //     this.ask('What\'s your name?');
            // },
        },
    
        MyNameIsIntent() {
            this.$user.$data.name = this.$inputs.name.value;
            this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
        },
    
        NameFromDbIntent() {
            const name = this.$user.$data.name;
            this.tell('Hey ' + name + ', nice to meet you!');
        },
    
        CheckPowerUserIntent() {
            const sessionsCount = this.$user.$metaData.sessionsCount;
    
            if (sessionsCount > 10) {
                this.tell('Hey buddy!');
            } else {
                this.tell('Hello sir!')
            }
        },
    
        TestIntent() {
            const value = this.$user.$data.key || 'from intent';
            console.log({value});

            this.tell(value);
        },    
    });
    
    return app;
}

module.exports = {
    getApp,
};