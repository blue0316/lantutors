import { Avatar } from '@material-ui/core';
import { useTutor } from '../../context/tutor.context';
import { randomColor } from '../../utils/initialize';

const Logo = () => {
  const { email } = useTutor();
  return (
    <Avatar
      style={{
        backgroundColor: randomColor(),
      }}
    >
      LT
    </Avatar>
  );
};

export default Logo;
