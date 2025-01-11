import PropTypes from "prop-types";
import { Alert } from "@mui/material";

// NotifyMessage component to display custom styled messages
export const NotificationMessage = ({
  data,
  type = null,
  customStyles = {},
}) => {
  const { status, message } = data;
  const notificationType = type || (status ? "success" : "error");
  const messages = Array.isArray(message)
    ? message
    : message.replace(/<br\s*\/?>|\r\n|\n|\r/gi, "\n").split("\n");

  // Function to determine the appropriate style based on the message type
  const getMessageStyle = (type) => {
    switch (type) {
      case "error":
        return { ...customStyles };
      case "success":
        return { ...customStyles };
      case "warning":
        return { ...customStyles };
      case "info":
        return { ...customStyles };
      case "dark":
        return { color: "white", backgroundColor: "#343a40", ...customStyles };
      case "custom":
        return {
          color: customStyles.color || "black",
          backgroundColor: customStyles.backgroundColor || "#ffffff",
          ...customStyles,
        };
      default:
        return { color: "black", backgroundColor: "#f1f1f1", ...customStyles };
    }
  };

  return (
    <Alert
      severity={notificationType}
      variant="filled"
      sx={{ ...getMessageStyle(notificationType), my: 2 }}
    >
      {messages.map((line, index) => (
        <p key={index} style={{ margin: 0 }}>
          {line}
        </p>
      ))}
    </Alert>
  );
};

// Prop-types validation
NotificationMessage.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.bool,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  }).isRequired,
  type: PropTypes.string, // 'success', 'error', 'info', 'warning', etc.
  customStyles: PropTypes.object, // Optional custom styles
};

/* // Default props
NotificationMessage.defaultProps = {
  type: null,
  customStyles: {},
};
 */
