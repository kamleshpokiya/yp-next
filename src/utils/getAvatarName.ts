// get avatar name from full name : John Dial => JD
const getAvatarName = (fullName: string) => {
    const [firstName, lastName] = fullName.trim().split(/\s+/);
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : 'N';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : 'A';
  const avatarName = `${firstInitial}${lastInitial}`;

  return avatarName.trim();
};

export default getAvatarName;