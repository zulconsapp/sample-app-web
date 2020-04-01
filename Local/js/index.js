//import { ZoomMtg } from '@zoomus/websdk'
import { ZoomMtg } from 'zoomus-jssdk'

const zoomMeeting = document.getElementById("zmmtg-root")

console.log('checkSystemRequirements');
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
// if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.2/lib', '/av'); // CDN version default
// else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.2/lib', '/av'); // china cdn option
// ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();


const API_KEY = 'PgDAooqbQ4GeQb2gpimUAw';

/**
    * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
    * The below generateSignature should be done server side as not to expose your api secret in public
    * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/tutorial/generate-signature
    */
const API_SECRET = 'fsIGoqi8UU2wJJsAjn9VBOHf96xqV4FH65Ua';

document.getElementById('join_meeting').addEventListener('click', (e) => {
    e.preventDefault();

    const meetConfig = {
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        meetingNumber: parseInt(document.getElementById('meeting_number').value, 10),
        userName: document.getElementById('display_name').value,
        passWord: '',
        leaveUrl: 'https://zoom.us',
        role: 0
    };



    ZoomMtg.generateSignature({
        meetingNumber: meetConfig.meetingNumber,
        apiKey: meetConfig.apiKey,
        apiSecret: meetConfig.apiSecret,
        role: meetConfig.role,
        success(res) {
            console.log('signature', res.result);
            ZoomMtg.init({
                leaveUrl: 'http://www.zoom.us',
                success() {
                    ZoomMtg.join(
                        {
                            meetingNumber: meetConfig.meetingNumber,
                            userName: meetConfig.userName,
                            signature: res.result,
                            apiKey: meetConfig.apiKey,
                            userEmail: 'email@gmail.com',
                            passWord: meetConfig.passWord,
                            success() {
                                $('#nav-tool').hide();
                                console.log('join meeting success');
                            },
                            error(res) {
                                console.log(res);
                            }
                        }
                    );
                },
                error(res) {
                    console.log(res);
                }
            });
        }
    });
});




getSignature(meetConfig) {
	// fetch('${YOUR_SIGNATURE_ENDPOINT}', {
	// 		method: 'POST',
	// 		body: JSON.stringify({ meetingData: meetConfig })
	// 	})
  //   .then(result => result.text())
	// 	.then(response => {
	// 		ZoomMtg.init({
	// 			leaveUrl: meetConfig.leaveUrl,
	// 			isSupportAV: true,
	// 			success: function() {
	// 				ZoomMtg.join({
	// 					signature: response,
	// 					apiKey: meetConfig.apiKey,
	// 					meetingNumber: meetConfig.meetingNumber,
	// 					userName: meetConfig.userName,
	// 					// Email required for Webinars
	// 					userEmail: meetConfig.userEmail,
	// 					// password optional; set by Host
	// 					password: meetConfig.password,
	// 					error(res) {
	// 						console.log(res)
	// 					}
	// 				})
	// 			}
	// 		})
	// }
}
