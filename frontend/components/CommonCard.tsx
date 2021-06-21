import React from 'react';
import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import List from './List';
import ListItem from './ListItem';

// import { useUserContext } from '../context/user.context';
// import { useDataHandler } from '../context/data.context';
import { CommonStudents } from '../interfaces';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

type Props = {
  commonStudents: CommonStudents[];
};
const CommonCard = ({ commonStudents }: Props) => {
  const classes = useStyles();
  const router = useRouter();

  // const { userId } = useUserContext();
  // const { setEditing, setId, setHeading } = useDataHandler();
  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={4}>
        {commonStudents.map((common) => (
          <Grid
            item
            key={common.tutorName}
            xs={6}
            sm={4}
            md={3}
            lg={3}
          >
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h4">
                  {common.tutorName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <List students={common.students} />
                  {/* <Typography variant="overline">₱</Typography>{' '} */}
                  {/* {common.price} */}
                </Typography>
                <Typography variant="body2">
                  {/* {common.description} */}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    router.push({
                      pathname: `/commonstudents/${encodeURIComponent(
                        common.tutorName
                      )}`,
                    })
                  }
                >
                  View
                </Button>
                {true && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      // setEditing(true);
                      // setId(listing.id);
                      // setHeading(`Editing ${listing.title}`);
                      router.push({
                        pathname: `/edit/${encodeURIComponent(
                          common.tutorName
                        )}`,
                      });
                    }}
                  >
                    Edit
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CommonCard;
