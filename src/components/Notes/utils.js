// local storage helper

export const getNoteNames = () => {
  console.log("LocalStorage", JSON.stringify(localStorage));
  const keys = [];
  for (let key in localStorage) {
    console.log("key =>>", key);
    console.log("startsWith check", key.startsWith("___"));
    keys.push(key);
  }
  console.log({ keys });
  return keys;
};
