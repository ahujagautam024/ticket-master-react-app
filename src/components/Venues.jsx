import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import noImage from "../assets/no_image.jpg";

function Venues() {
  const [searchTerm, setSearchTerm] = useState("");
  const { page } = useParams();
  const navigate = useNavigate();
  const [venuesData, setVenuesData] = useState([]);
  const [error, setError] = useState(null);
  const currentPage = parseInt(page, 10) || 0;

  useEffect(() => {
    getVenues(searchTerm);
  }, [currentPage, searchTerm]);

  async function getVenues(term = "") {
    try {
      const query = term
        ? `&page=${currentPage}&keyword=${term}`
        : `&page=${currentPage}`;
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=DaXBAgKsvqwRiePXk6GrpY7qQWHkxIPp&countryCode=US${query}`
      );
      if (!response.data || !response.data._embedded)
        throw new Error(`No Venues to show`);
      setVenuesData(response.data._embedded.venues);
      setError(null);
    } catch (err) {
      if (currentPage < 0)
        setError("400 BAD request as page cannot be negative");
      else setError("No more Venues to Show");
    }
  }

  const handleSearchChange = (event) => {
    const term = event.target.value.toString();
    setSearchTerm(term);

    if (term === "") {
      getVenues();
    } else {
      getVenues(term);
    }
  };

  const handleNextPage = () => {
    navigate(`/venues/page/${currentPage < 0 ? 0 : currentPage + 1}`);
  };
  const handlePreviousPage = () =>
    navigate(`/venues/page/${Math.max(currentPage - 1, 0)}`);

  return (
    <div>
      <div className="search-bar">
        <TextField
          id="outlined-search"
          label="Venues Search"
          variant="outlined"
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
      </div>
      <Container className="card-container">
        <Grid container spacing={5} className="grid">
          {error ? (
            <Typography variant="h6" color="error" align="center">
              {error}
            </Typography>
          ) : (
            venuesData &&
            venuesData.map((venue, index) => (
              <Grid item xs={12} sm={3} md={3} key={index}>
                <Card sx={{ maxWidth: 345 }} className="card">
                  <CardMedia
                    sx={{ height: 150 }}
                    image={venue.images ? venue.images[0].url : noImage}
                    title={venue.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {venue.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {venue.address?.line1}, {venue.city?.name},{" "}
                      {venue.state?.stateCode}{" "}
                      {venue.postalCode ? venue.postalCode : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upcoming Events: {venue.upcomingEvents._total}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <RouterLink
                      to={`/venues/${venue.id}`}
                      className="link-style"
                    >
                      <Button size="small" align="center">
                        View
                      </Button>
                    </RouterLink>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => window.open(venue.url, "_blank")}
                    >
                      View on Ticketmaster
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        <Box className="page-box" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousPage}
            disabled={currentPage <= 0}
            sx={{ mr: 2 }}
          >
            Previous
          </Button>
          <Button variant="contained" color="primary" onClick={handleNextPage}>
            Next
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Venues;
