import React from 'react';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  AvatarGroup,
} from '@material-ui/core';
import {
  deepOrange,
  red,
  deepPurple,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { AtSign } from 'react-feather';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

import { useTutor } from '../../context/tutor.context';
import {
  initialize,
  capitalize,
  randomColor,
} from '../../utils/initialize';

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  sizeAvatar: {
    height: '32px',
    width: '32px',
  },
  avatar: {
    backgroundColor: red[500],
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
}));

const NotificationCard = ({
  notification,
}: {
  notification: NotificationResponse;
}) => {
  const classes = useStyles();
  const { email } = useTutor();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 3,
          }}
        >
          <Link
            href={`/notifications/${encodeURIComponent(
              notification.tutor
            )}`}
          >
            <a>
              <Typography
                align="center"
                color="textPrimary"
                gutterBottom
                variant="h4"
              >
                Tutor {initialize(notification.tutor)}
              </Typography>
            </a>
          </Link>

          {notification.recipients.length > 0 && (
            <AvatarGroup max={3} className={classes.sizeAvatar}>
              {notification.recipients.map((student) => (
                <Avatar
                  key={`${notification.id}-${notification.tutor}-${student}`}
                  style={{
                    backgroundColor: randomColor(),
                  }}
                >
                  {capitalize(student)}
                </Avatar>
              ))}
            </AvatarGroup>
          )}
        </Box>

        <Typography align="left" color="textPrimary" variant="body2">
          {notification.message}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <AccessTimeIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              <time
                dateTime={dayjs(notification.createdAt).toISOString()}
              >
                {dayjs(notification.createdAt).fromNow()}
              </time>
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <AtSign color="action" />
            <Link href="/notify">
              {email ? (
                <Typography
                  color="textSecondary"
                  display="inline"
                  sx={{ pl: 1 }}
                  variant="body2"
                >
                  @Post to to your students
                </Typography>
              ) : (
                <Typography
                  color="textSecondary"
                  display="inline"
                  sx={{ pl: 1 }}
                  variant="body2"
                >
                  @Post to this group
                </Typography>
              )}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default NotificationCard;
