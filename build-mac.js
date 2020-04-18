const builder = require('electron-builder');

builder.build({
    config: {
        'appId': 'local.test.worktimer',
        'mac':{
            'target': 'zip',
        }
    }
});