export function saveUser(content) {
  return {
    type: "SAVE_USER",
    payload: content,
  };
}
