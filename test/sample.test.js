'use strict';

const { Alexa } = require('jovo-platform-alexa');
const { expect } = require('chai');
const appFactory = require('../app/src/appFactory');
// const mockHelpers = require('./mockHelpers');

describe(`TestIntent`, function () {
    // 2 new here
    const platform = new appFactory.Alexa();
    
    const testSuite = platform.makeTestSuite();
    let app;
    let conversation;

    const convConfig = {
        locale: 'en-US',
        deleteDbOnSessionEnded: true,
    };

    before(function () {
        process.env.NODE_ENV = 'UNIT_TEST_ENV';
        app = appFactory.getApp();
    });

    beforeEach(function () {
        conversation = testSuite.conversation(convConfig);
        conversation.app = app;
        conversation.config.runtime = 'app'
    });


    it('Setting user data in test can be accessed in code', async function () {
        // Adding this line results in: Error: ENOENT: no such file or directory
        conversation.$user.$data.key = 'from test';

        const request = await testSuite.requestBuilder.intent();

        request.setIntentName('TestIntent');
        request.setNewSession(true);

        const reply = await conversation.send(request);

        expect(reply.response.outputSpeech.ssml).contain('from test');
        expect(reply.response.shouldEndSession).eq(true);
    });
});
