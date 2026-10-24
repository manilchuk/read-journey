interface UserAvatarProps {
  name?: string;
}

export const UserAvatar = ({ name = 'U' }: UserAvatarProps) => {
  return <div className="user-avatar">{name.charAt(0).toUpperCase()}</div>;
};
