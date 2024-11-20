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
  Link,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

function Attractions() {
  const [searchTerm, setSearchTerm] = useState("");
  const { page } = useParams();
  const navigate = useNavigate();
  const [attractionsData, setAttractionsData] = useState([]);
  const currentPage = parseInt(page, 10) || 0;
  const [error, setError] = useState("");

  useEffect(() => {
    getAttractions(searchTerm);
  }, [currentPage, searchTerm]);

  async function getAttractions(term = "") {
    try {
      const query = term
        ? `&page=${currentPage}&keyword=${term}`
        : `&page=${currentPage}`;
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=DaXBAgKsvqwRiePXk6GrpY7qQWHkxIPp&countryCode=US&${query}`
      );
      if (!response.data || !response.data._embedded)
        throw new Error("Attractions not found");

      setAttractionsData(response.data._embedded.attractions);
    } catch (error) {
      if (currentPage < 0)
        setError("400 BAD request as page cannot be negative");
      else setError("No more Attractions to Show");
    }
  }

  const handleNextPage = () =>
    navigate(`/venues/page/${currentPage < 0 ? 0 : currentPage + 1}`);
  const handlePreviousPage = () =>
    navigate(`/attractions/page/${Math.max(currentPage - 1, 0)}`);

  const handleSearchChange = (event) => {
    const term = event.target.value.toString();
    setSearchTerm(term);

    if (term === "") {
      getAttractions();
    } else {
      getAttractions(term);
    }
  };

  return (
    <div>
      <div className="search-bar">
        <TextField
          label="Attractions Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
      </div>
      <Container className="card-container">
        <Grid container spacing={4} className="grid">
          {error ? (
            <Typography variant="h6" color="error" align="center">
              {error}
            </Typography>
          ) : (
            attractionsData.map((attraction, index) => (
              <Grid item xs={12} sm={3} md={3} key={index}>
                <Card sx={{ maxWidth: 345 }} className="card">
                  <CardMedia
                    sx={{ height: 150 }}
                    image={attraction.images[0].url}
                    title={attraction.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>{attraction.name}</Typography>
                    {attraction.classifications &&
                      attraction.classifications[0] && (
                        <Typography variant="body2" color="text.secondary">
                          Genre: {attraction.classifications[0].genre?.name}
                        </Typography>
                      )}
                    <Typography variant="body2" color="text.secondary">
                      Upcoming Events: {attraction.upcomingEvents._total}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <RouterLink
                      to={`/attractions/${attraction.id}`}
                      className="link-style"
                    >
                      <Button size="small" align="center">
                        View
                      </Button>
                    </RouterLink>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => window.open(attraction.url, "_blank")}
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
            disabled={currentPage === 0}
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

export default Attractions;
