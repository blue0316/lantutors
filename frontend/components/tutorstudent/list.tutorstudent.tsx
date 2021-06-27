import React from 'react';
import { useRouter } from 'next/router';
import { createStyles, makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

import {
  initialize,
  capitalize,
  randomColor,
  firstInitial,
} from '../../utils/initialize';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
    },
  })
);

const TutorStudentList = ({
  students,
}: {
  students: Student['email'][];
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense className={classes.root}>
      {students.map((student) => {
        const localId = `common-${initialize(student)}`;
        return (
          <ListItem
            key={student}
            button
            onClick={() => {
              router.push({
                pathname: `/students/${encodeURIComponent(student)}`,
              });
            }}
          >
            <ListItemAvatar>
              <Avatar
                style={{
                  backgroundColor: randomColor(),
                }}
              >
                {capitalize(student)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText id={student} primary={student} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                // @ts-ignore
                onChange={handleToggle(student)}
                // @ts-ignore
                checked={checked.indexOf(student) !== -1}
                inputProps={{ 'aria-labelledby': localId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TutorStudentList;
