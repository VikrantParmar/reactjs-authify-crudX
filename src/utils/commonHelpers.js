class CommonHelper {
    // Simple function
    static printSum = (a, b) => {
      return a + b;
    };
    // Simple function
    static multiply = (a, b) => {
      return a * b;
    };
    // Return Promise
    static getPromiseData = () => {
      return Promise.resolve({ name: "JsMount", id: 123 });
    };
    static _nameInitials = (string) => {
      return string.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    };
  
  }
  export default CommonHelper;