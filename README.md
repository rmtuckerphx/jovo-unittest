# Jovo Unit Test Sample

This project includes a different structure where the Jovo app is in the `/app/src` folder and tests are in `/tests`. Both `app` and `root` have thier own node modules. You can build both, by executing `$ ./build.sh`.

There is a specific reason that I have deviated from the typical project structure and that is because either the project has required it or to overcome an issue.

Other changes include:
- config.js renamed to appConfig.js and is passed to App ctor.
- creation of App object is wrapped in a function to have more control when it is created.
- because of an issue with the different JOVO_CONFIG folder, Conversation is set to `app` later (see beforeEach in sample.text.js)

Start the test from the root by running: `$ ./unit-tests.sh`

## Issue

When I set the $user.$data.key on the conversation, it should be available in my code.

```
    it('Setting user data in test can be accessed in code', async function () {
        conversation.$user.$data.key = 'from test';
```

But when set, I get the error:

```
Error: ENOENT: no such file or directory
```

When `conversation.$user.$data.key` is commented out then the test fails because it has the wrong value:

```
  1) TestIntent
       Setting user data in test can be accessed in code:
     AssertionError: expected '<speak>from intent</speak>' to include 'from test'
      at Context.<anonymous> (test\sample.test.js:42:50)
```


## Side Note
The following happened a few times, which was strange:

In my real project, I can comment out `conversation.$user.$data.key` and my code runs. 

But, for some reason in this sample project I get the error:

```
  TestHost.fail: 
  {"hint":"This might be an issue with upgrading the Jovo packages. Try to run `jovo update` instead of `npm install`","seeMore":"https://www.jovo.tech/docs/installation/upgrading"}


     TypeError: handleRequest.jovo.getRoute is not a function
      at BasicLogging.routingLogger (node_modules\jovo-framework\dist\src\middleware\logging\BasicLogging.js:39:90)
      at Middleware.run (node_modules\jovo-core\dist\src\core\Middleware.js:85:29)
      at async App.handle (node_modules\jovo-core\dist\src\core\BaseApp.js:201:13)
      at async App.handle (node_modules\jovo-framework\dist\src\App.js:265:9)
      at async Conversation.sendToApp (node_modules\jovo-core\dist\src\util\Conversation.js:120:9)
      at async Context.<anonymous> (test\sample.test.js:40:23)
```

