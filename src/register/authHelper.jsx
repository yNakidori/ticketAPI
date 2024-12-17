export const saveCredentials = (email, password) => {
  localStorage.setItem("rememberedEmail", email);
  localStorage.setItem("rememberedPassword", password);
};

export const getSavedCredentials = () => {
  const email = localStorage.getItem("rememberedEmail");
  const password = localStorage.getItem("rememberedPassword");
  return email && password ? { email, password } : null;
};

export const clearSavedCredentials = () => {
  localStorage.removeItem("rememberedEmail");
  localStorage.removeItem("rememberedPassword");
};
