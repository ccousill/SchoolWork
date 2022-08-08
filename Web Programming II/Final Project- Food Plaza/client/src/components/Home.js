import React from 'react';
import '../App.css';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    width: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    border: '1px solid #178577',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
  },
  titleHead: {
    borderBottom: '1px solid #178577',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  grid: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  media: {
    height: '100%',
    width: '100%'
  },
  button: {
    color: '#178577',
    fontWeight: 'bold',
    fontSize: 12
  },
  centerPlease: {
    textAlign: 'center'
  }
});



function Home() {
  const classes = useStyles();
  
  return (

    <div className='childId'>
      <br />
      <Card className={classes.card} variant='outlined'>
        <CardHeader className={classes.titleHead} title="Welcome to the Food Plaza" />
        <CardMedia
          className={classes.media}
          component='img'
          image='/imgs/HomePageLogo.png'
          title="Chef's Kiss"
        />

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='span'>
            <dl>

              <div className="centerPlease">
                <p className="centerPlease">This is a website created to help individuals find and share recipes.</p>
                <p className="centerPlease">Food Plaza is allows you to keep an inventory of ingredients that they have in their kitchen, and then recommends recipes based on those ingredients.</p>
                <p className="centerPlease">You are able to easily browse through a wide selection of recipes that have been posted by other users and favorite the ones you loved most!</p>
                <p className="centerPlease">If you have a great recipe that you want others to know, Food Plaza is an easy way to share. Try for yourself, hit&nbsp;<span>Sign Up</span> and then click&nbsp;<span>Create Recipe</span>.</p>
                <p className="centerPlease">This website utilizes Firebase to handle user authentication, React to display the Frontend and Node JS for the backend.</p>
                <p className="centerPlease">Additionally, this website uses AWS to host a Docker container on EC2.</p>
              </div>

            </dl>
          </Typography>
        </CardContent>
      </Card>
      <br />
    </div>
  )
}

export default Home;
