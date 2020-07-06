export enum framework {
  vanilla = "vanilla",
  react = "react",
  vue = "vue",
  angular = "angular",
}

export interface CodeSample {
  title: string;
  code: string;
}

export const vanillaCode: CodeSample = {
  title: "Add this code to your service worker",
  code: `// Add these functions to prompt the user to subscribe to the pwabuilder push notification server using the pwabuilder.
async function subscribeUser() {
  try {
    const vapidPublicKey = ""; // get public key here
    var registration = await navigator.serviceWorker.register("pwabuilder-sw.js", {
      scope: "./"
    });

    var subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      return;
    }

    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });

    const response = await fetch(pushServiceUrl + '?action=subscribe', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription: JSON.stringify(subscription),
        publicKey: vapidPublicKey
      })
    });

    // handle response after registration here

  } catch(e) {
    // handle error here
  }
}

// Utility function for browser interoperability
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// omit if you want to control when you prompt the user to subscribe
subscribeUser();
`,
};

export const angularCommandLine: CodeSample = {
  title: "Make sure you add these modules to the angular app",
  code: `# add this angular module
@angular/service-worker

# run these commands
ng add @angular/pwa --project *project name*
ng generate web-worker <path like ./src>
`,
};

export const angularCode: CodeSample = {
  title: "Make these modifications to your AppComponent",
  code: `export class AppComponent {
  ...
  readonly VAPID_PUBLIC_KEY = "public key from above";

  constructor(
    ...
    private swPushL SwPush,
    ...
  ) {}

  subscribe() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this.subscribeUser)
  }

  subscribeUser(subscriptionPayload) {
    const response = await fetch(pushServiceUrl + '?action=subscribe', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription: JSON.stringify(subscription),
        publicKey: vapidPublicKey
      })
    });

    // handle response after registration here
  }

  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}`,
};

export const angularJson: CodeSample = {
  title: "Add to angular.json",
  code: `"assets": {
    ...,
    src/pwabuilder-sw.js
  }
`,
};

export const angularRegister: CodeSample = {
  title: "",
  code: ``,
};

export const landingScript: CodeSample = {
  title: "",
  code: `// Add this below content to your HTML page inside a <script type="module"></script> tag, or add the js file to your page at the very top to register service worker
import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate';

const el = document.createElement('pwa-update');
document.body.appendChild(el);
`,
};

export const sendNotificationScript: CodeSample = {
  title: "",
  code: `async sendNotification() {
  try {
    const response: PwabNotificationResponse = await fetch(
      "https://pwabuilder-api-pre.azurewebsites.net//push/send",
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          publicKey: "",
          privateKey: "",
          subject: "registeredEmail@example.com",
          // double nesting is required! this is a bug
          notification: JSON.stringify({
            notification: {
              title: "title text",
              body: "body text",
              icon: "url.com/images/icon",
            },
          }),
        }),
      }
    ).then((res) => res.json());
  } catch (e) {
    console.log("failed to send notification");
  }
}
`,
};

export const vanilla = [vanillaCode, sendNotificationScript];
export const react = [vanillaCode];
export const angular = [
  angularCommandLine,
  angularCode,
  angularRegister,
  sendNotificationScript,
];
export const vue = [vanillaCode, sendNotificationScript];
