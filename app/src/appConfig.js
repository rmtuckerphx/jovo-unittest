// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: true,

    intentMap: {
        'AMAZON.HelpIntent': 'HelpIntent',
        'AMAZON.RepeatIntent': 'RepeatIntent',
        'AMAZON.StartOverIntent': 'StartOverIntent',
        'AMAZON.YesIntent': 'YesIntent',
        'AMAZON.NoIntent': 'NoIntent',
        'AMAZON.NextIntent': 'NextIntent',
        'AMAZON.ResumeIntent': 'ResumeIntent',
        'AMAZON.CancelIntent': 'CancelIntent',
        'AMAZON.StopIntent': 'END',
        'AMAZON.FallbackIntent': 'FallbackIntent',
    },

    intentsToSkipUnhandled: [
        'RepeatIntent',
    ],

    i18n: {
        returnNull: false,
        fallbackLng: 'en-US',
        nsSeparator: '|',
        // postProcess: 'interval',
    },
    user: {
        context: {
            enabled: true,
        },
        metaData: {
            enabled: true,
        },
    },
};
