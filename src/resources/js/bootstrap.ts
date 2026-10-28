import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

try {
    (window as any).Pusher = Pusher;

    (window as any).Echo = new Echo({
      broadcaster: "pusher",
      key: "local",
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });
    } catch (e) {
  console.error("Echo init error:", e);
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";