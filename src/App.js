import React, { Component } from 'react';
import Amplify, { Interactions, Storage } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import { withAuthenticator, AmplifySignOut, SignOut } from '@aws-amplify/ui-react';
//import {withAuthenticator} from 'aws-amplify-react';
import Particles from 'react-particles-js';


import awsconfig from './aws-exports';
import './App.css';
import aws_exports from './aws-exports';


Amplify.configure(aws_exports);
Amplify.configure(awsconfig);
Amplify.configure({
  Auth: {
    identityPoolId: 'ap-southeast-1:286acab8-e634-41f2-995b-c143bc6d7200',
    region: 'ap-southeast-1'
  },
  Interactions: {
    bots: {
      "SuppBot": {
        "name": "SuppBot",
        "alias": "$LATEST",
        "region": "ap-southeast-1",
      },
    }
  }
});

Storage.configure({
customPrefix: {public:''}
})

// Imported default theme can be customized by overloading attributes
const myTheme = {
  ...AmplifyTheme,
  color:'#00f0fc',
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600'
    
  }
};

class App extends Component {

  state = {
    imageName: "",
    imageFile: "",
    response: ""
  };

  uploadImage = () => {
    //SetS3Config("amplifys3upload150524-dev", "protected");
    Storage.put(this.upload.files[0].name,
                this.upload.files[0],
                { contentType: this.upload.files[0].type },
                )
      .then(result => {
        this.upload = null;
        this.setState({ response: "Success, uploading file!" });
      })
      .catch(err => {
        this.setState({ response: `Unable to upload file: ${err}` });
      });
  };

  
  handleComplete(err, confirmation) {
    if (err) {
      alert('Bot conversation failed')
      return;
    }

    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Thank you for using SuppBot! Should you require more assistance, Please contact ACRA!';
  }

  render() {
    return (
  
      <div className="App">
        

     
        <header className="App-header">
          <h1 className="App-title">Welcome to SuppBot!</h1>
          <h2>Live Smart Singapore Hackathon(ACRA)</h2>
          <h2>By Team SPx</h2>
        </header>
        <div id="List">
          <h2>Instructions to submit a waiver appeal</h2>
            <ol >
              <li>Ask SuppBot for the link to download the waiver form</li>
              <li>Submit the form with the uploader below</li>
              <li>You will then be notified of the status within minutes</li>
              <li>If you do not receive an email, please double check the email in the form you submitted</li>
              <li>If you still did not receive an email, Please proceed to contact ACRA</li>
            </ol>
        </div>
        

        <ChatBot
          title="SuppBot"
          theme={myTheme}
          botName="SuppBot"
          welcomeMessage="Welcome! I'm SuppBot, how can I help you today?"
          //onComplete={this.handleComplete.bind(this)}
          
          clearOnComplete={false}
          conversationModeOn={false}
        />
        <div id="Upload">
        <h2 className= 'UploadHeader'>Upload your completed form here</h2>
        <input
          type="file"
          //accept="image/png, image/jpeg, pdf" This is used to limit to specific file
          style={{ display: "none" }}
          ref={ref => (this.upload = ref)}
          onChange={e =>
            this.setState({
              imageFile: this.upload.files[0],
              imageName: this.upload.files[0].name
            })
          }
        />
        <input value={this.state.imageName} placeholder="Select file" />
        <button
          onClick={e => {
            this.upload.value = null;
            this.upload.click();
          }}
          loading={this.state.uploading}
        >
          Browse
        </button>

        <button onClick={this.uploadImage}> Upload File </button>

        {!!this.state.response && <div>{this.state.response}</div>}
        </div>

        <Particles
                params={{
                    "particles": {
                    "number": {
                    "value": 90
                    },
                    "size": {
                    "value": 2.5
                    }
                },
                    "interactivity": {
                    "events": {
                    "onhover": {
                    "enable": true,
                    "mode": "repulse"
                    }
                    }
                    }
                }}/>

      </div>
    );
  }
}
export default withAuthenticator(App, {includeGreetings:true});