import { Avatar } from '@material-ui/core';
import { useTutor } from '../../context/tutor.context';
import { firstInitial, randomColor } from '../../utils/initialize';

const TutorLogo = () => {
  const { email } = useTutor();
  return (
    <Avatar
      style={{
        backgroundColor: randomColor(),
      }}
    >
      {firstInitial(email)}
    </Avatar>
  );
};

export default TutorLogo;
