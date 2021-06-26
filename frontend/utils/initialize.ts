export const initialize = (email: string) => {
  const username = email.split('@')[0];
  return username.charAt(0).toUpperCase() + username.slice(1);
};

export const capitalize = (email: string) => {
  const username = email.split('@')[0];
  return (
    username.charAt(0).toUpperCase() +
    username.charAt(1).toUpperCase()
  );
};

export const firstInitial = (email: string) => {
  const username = email.split('@')[0];
  return username.charAt(0).toUpperCase();
};

export const randomColor = () => {
  const hex = Math.floor(Math.random() * 0xffffff);
  return '#' + hex.toString(16);
};
