import { useSnackbar } from "notistack";

// Notification hook to show messages with a close button
export const useShowNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); // Destructure both enqueueSnackbar and closeSnackbar

  const showNotification = (message, variant = "info") => {
    // Replace <br> and line breaks with \n for line breaks
    const errorMsg = message.replace(/<br\s*\/?>|\r\n|\n|\r/gi, "\n");
    const messages = errorMsg.split("\n");

    const key = enqueueSnackbar(
      <div>
        {messages.map((line, index) => (
          <p key={index} style={{ margin: 0 }}>
            {line}
          </p>
        ))}
      </div>,
      {
        variant, // 'success', 'error', 'info', 'warning'
        autoHideDuration: 5000,
        action: (key) => (
          <button
            onClick={() => {
              closeSnackbar(key); // Close the notification using the key
            }}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            X
          </button>
        ),
      }
    );

    return key;
  };

  return { showNotification };
};
