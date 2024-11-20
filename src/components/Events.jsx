import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";

const PriceRange = ({ priceRanges }) => {
  if (!priceRanges || priceRanges.length === 0) return null;

  const { currency, min, max } = priceRanges[0];
  if (!currency || !min || !max) return null;
  return (
    <Typography
      variant="body2"
      sx={{ color: "text.secondary" }}
      style={{ marginTop: "10px" }}
    >
      {`Price Range: ${currency} ${min} - ${currency} ${max}`}
    </Typography>
  );
};

const DateDisplay = ({ startDate }) => {
  if (!startDate) return null;

  const formattedDate = new Date(startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {`Event Date: ${formattedDate}`}
    </Typography>
  );
};

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const { page } = useParams();
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState([]);
  const [error, setError] = useState("");
  const currentPage = parseInt(page, 10) || 0;

  useEffect(() => {
    fetchEvents(searchTerm);
  }, [currentPage, searchTerm]);

  const handleNextPage = () =>
    navigate(`/venues/page/${currentPage < 0 ? 0 : currentPage + 1}`);
  const handlePreviousPage = () =>
    navigate(`/events/page/${Math.max(currentPage - 1, 0)}`);

  const handleSearchChange = (event) => {
    const term = event.target.value.toString();
    setSearchTerm(term);

    if (term === "") {
      fetchEvents();
    } else {
      fetchEvents(term);
    }
  };

  const fetchEvents = (term = "") => {
    setError(null);
    const query = term ? `&keyword=${term}` : `&page=${currentPage}`;
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=DaXBAgKsvqwRiePXk6GrpY7qQWHkxIPp&countryCode=US${query}`
      )
      .then((response) => {
        if (!response.data || !response.data._embedded) {
          throw new Error("No events found");
        }
        setEventsData(response.data._embedded.events);
        setError(null);
      })
      .catch((err) => {
        if (currentPage < 0)
          setError("400 BAD request as page cannot be negative");
        else setError("No more Events to Show");
      });
  };

  // const fetchEvents = async (term = "") => {
  //   try {
  //     const query = term ? `&keyword=${term}` : "";
  //     const response = await axios.get(
  //       `https://app.ticketmaster.com/discovery/v2/events.json?apikey=DaXBAgKsvqwRiePXk6GrpY7qQWHkxIPp&countryCode=US&page=${currentPage}${query}`
  //     );
  //     if (!response.data || !response.data._embedded)
  //       throw new Error("No events found");
  //     setEventsData(response.data._embedded.events);
  //     setError(null);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  if (!eventsData) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <div>
      <div className="search-bar">
        <TextField
          label="Events Search"
          variant="outlined"
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
            eventsData.map((result, index) => (
              <Grid item xs={12} sm={3} md={3} key={index}>
                <Card sx={{ maxWidth: 345 }} className="card">
                  <CardMedia
                    sx={{ height: 150 }}
                    image={result.images[0].url}
                    title={result.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {result.name}
                    </Typography>
                    <DateDisplay startDate={result.dates.start.localDate} />
                    <PriceRange priceRanges={result.priceRanges} />
                  </CardContent>
                  <CardActions>
                    <Link to={`/events/${result.id}`}>
                      <Button size="small" align="center">
                        View
                      </Button>
                    </Link>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => window.open(result.url, "_blank")}
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

export default Events;
