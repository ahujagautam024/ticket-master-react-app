import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Grid,
  CardMedia,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import AttractionsIcon from "@mui/icons-material/Attractions";
import PlaceIcon from "@mui/icons-material/Place";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import noImage from "../assets/no_image.jpg";

const EventDetails = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=DaXBAgKsvqwRiePXk6GrpY7qQWHkxIPp`
        );
        setEventData(response.data);
      } catch (err) {
        setError("Could not fetch event details.");
      }
    }
    fetchEventDetails();
  }, [id]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!eventData) return <CircularProgress sx={{ mt: 4 }} />;

  const venue = eventData._embedded?.venues?.[0];
  const attractions = eventData._embedded?.attractions;
  const seatmap = eventData.seatmap?.staticUrl;
  const ticketUrl = eventData.url;
  const genre = eventData.classifications?.[0]?.genre?.name;
  const subGenre = eventData.classifications?.[0]?.subGenre?.name;
  const segment = eventData.classifications?.[0]?.segment?.name;
  const status = eventData.dates?.status?.code;
  const timezone = eventData.dates?.timezone;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
        <Box sx={{ mt: 2 }}>
          <Slider
            className="event-slider"
            arrows={false}
            {...settings}
            autoplay
            autoplaySpeed={2000}
          >
            <div>
              <Box className="attraction-box">
                <CardMedia
                  component="img"
                  className="event-image"
                  image={eventData.images?.[0]?.url || noImage}
                  alt={eventData.name}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </div>
            {seatmap && (
              <div>
                <Box sx={{ textAlign: "center" }}>
                  <CardMedia
                    component="img"
                    className="event-image"
                    image={seatmap}
                    alt="Seatmap"
                  />
                </Box>
              </div>
            )}
          </Slider>
        </Box>

        <Typography variant="h3" sx={{ mt: 2 }} className="marg-top">
          {eventData.name}
        </Typography>

        {eventData.dates?.start?.localDate && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {eventData.dates.start.localDate} {timezone && `(${timezone})`}
          </Typography>
        )}

        {eventData.info && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            {eventData.info}
          </Typography>
        )}
        <Box className="event-detailbox">
          {status && (
            <Box className="detail-card" sx={{ mt: 3 }}>
              <Typography variant="h6">Status:</Typography>
              <Typography variant="body2" color="text.secondary">
                {status}
              </Typography>
            </Box>
          )}

          {(segment || genre || subGenre) && (
            <Box className="detail-card" sx={{ mt: 3 }}>
              <Typography variant="h6">Genre:</Typography>
              <Typography variant="body2" color="text.secondary">
                {segment} {genre && `- ${genre}`} {subGenre && `- ${subGenre}`}
              </Typography>
            </Box>
          )}

          {venue && (
            <Box className="detail-card" sx={{ mt: 3 }}>
              <Typography variant="h6">Venue:</Typography>
              <Link
                to={`/venues/${venue.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <PlaceIcon />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {venue.name}
                </Typography>
              </Link>
            </Box>
          )}

          {attractions && attractions.length > 0 && (
            <Box sx={{ mt: 2 }} className="detail-card">
              <Typography variant="h6">Attractions:</Typography>
              {attractions.map((attraction) => (
                <Box
                  key={attraction.id}
                  display="flex"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Link to={`/attractions/${attraction.id}`} className="link">
                    <AttractionsIcon sx={{ mr: 1 }} />
                    <Typography variant="body2" color="primary">
                      {attraction.name}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          )}

          {ticketUrl && (
            <Box sx={{ mt: 3 }} className="detail-card">
              <Button
                variant="contained"
                color="primary"
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Tickets
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default EventDetails;
