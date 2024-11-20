import React from "react";
import { Container, Typography, Box, Button, Grid, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function LandingPage() {
  return (
    <Container maxWidth="lg">
      <Box textAlign="center" mt={8}>
        <Typography variant="h2" gutterBottom>
          Welcome to TicketMaster Explorer!
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Discover events, attractions, and venues using the Ticketmaster API.
        </Typography>
        <Typography variant="body1" paragraph>
          This site provides up-to-date information on a variety of live events
          across the United States, from concerts to sports events and theater
          shows. Powered by the Ticketmaster API, our goal is to help you easily
          find events and explore details on attractions and venues, all in one
          place. Whether you're a music fan, sports enthusiast, or theater
          lover, there's something for everyone!
        </Typography>
        {/* <Typography variant="body1" paragraph>
          Fun Fact: One of my favorite concerts was the{" "}
          <strong> Phoenix Suns vs. Sacramento Kings</strong>. It was an
          unforgettable experience!
        </Typography> */}
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/events/page/0"
            sx={{ m: 1 }}
          >
            Explore Events
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/attractions/page/0"
            sx={{ m: 1 }}
          >
            Discover Attractions
          </Button>
          <Button
            variant="contained"
            color="success"
            component={RouterLink}
            to="/venues/page/0"
            sx={{ m: 1 }}
          >
            Browse Venues
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4} mt={8}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Events</Typography>
          <Typography variant="body2" color="text.secondary">
            Browse upcoming events, with details on pricing, dates, and
            availability.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Attractions</Typography>
          <Typography variant="body2" color="text.secondary">
            Explore attractions related to different events, genres, and
            categories, from artists to teams.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Venues</Typography>
          <Typography variant="body2" color="text.secondary">
            Discover the venues where events are held, with details on location,
            seating, and upcoming events.
          </Typography>
        </Grid>
      </Grid>
      <Box mt={6} textAlign="center">
        <Link
          href="https://developer.ticketmaster.com/"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="always"
        >
          Learn more about the Ticketmaster API
        </Link>
      </Box>
    </Container>
  );
}

export default LandingPage;
