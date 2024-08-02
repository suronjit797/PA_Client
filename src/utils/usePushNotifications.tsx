/* eslint-disable no-console */
import { useEffect } from "react";
// import PropTypes from "prop-types";

const usePushNotifications = () => {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    } else {
      console.log("This browser does not support notifications.");
    }
  }, []);

  const showNotification = ({ message, icon, tag, renotify }) => {
    const options = {
      body: message,
      icon: icon, // Optional: Path to an icon image
      renotify: tag ? renotify : false,
      tag,
    };
    if (Notification.permission === "granted") {
      new Notification("PA!", options);
    } else {
      Notification.requestPermission();
    }
  };

  return showNotification;
};

export default usePushNotifications;

// PushNotifications.propTypes = {
//   message: PropTypes.string.isRequired,
//   icon: PropTypes.string,
//   tag: PropTypes.string,
//   renotify: PropTypes.bool,
// };
