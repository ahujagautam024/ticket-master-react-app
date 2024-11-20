import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Phone, Clock, Banknote } from "lucide-react";
import {
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
  Grid,
  CardMedia,
  Box,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import TwitterIcon from "@mui/icons-material/Twitter";
import noImage from "../assets/no_image.jpg";

const VenueDetails = () => {
  const { id } = useParams();
  const [venueData, setVenueData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVenueDetails() {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/venues/${id}.json?apikey=DaXBAgKsvqwRiePXk6GrpY7qQWHkxIPp`
        );
        setVenueData(response.data);
      } catch (err) {
        setError("Could not fetch venue details.");
      }
    }
    fetchVenueDetails();
  }, [id]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!venueData) return <CircularProgress sx={{ mt: 4 }} />;

  const {
    name,
    url,
    images,
    city,
    state,
    country,
    postalCode,
    address,
    social,
    boxOfficeInfo,
    parkingDetail,
    accessibleSeatingDetail,
    generalInfo,
  } = venueData;

  return (
    <Container className="venue-container">
      {/* <Paper elevation={3} sx={{ padding: 3, mt: 4 }}> */}
      <Box className="venue-header">
        <CardMedia
          component="img"
          className="venue-icon"
          image={images && images[0] ? images[0].url : noImage}
          alt={name}
          style={{ objectFit: "contain" }}
        />
        <a className="venue-title" href={url} target="_blank">
          {name}
        </a>
        {social && social.twitter && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<TwitterIcon />}
            href={`https://twitter.com/${social.twitter.handle}`}
            target="_blank"
          >
            Follow on Twitter
          </Button>
        )}
      </Box>
      <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
        <PlaceIcon sx={{ mr: 1 }} />
        <Typography variant="body1">
          {address?.line1 ?? "N/A"}, {city?.name ?? "N/A"},{" "}
          {state?.name ?? "N/A"}, {country?.name ?? "N/A"},{" "}
          {postalCode ?? "N/A"}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />
      {boxOfficeInfo && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Box Office Information:
          </Typography>

          <Grid container spacing={2}>
            {boxOfficeInfo?.phoneNumberDetail && (
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  <Phone /> Phone:
                </Typography>
                <Card sx={{ minHeight: 120 }} className="venue-card">
                  <CardContent>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {boxOfficeInfo.phoneNumberDetail}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {boxOfficeInfo?.openHoursDetail && (
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  <Clock /> Hours:
                </Typography>
                <Card sx={{ minHeight: 120 }} className="venue-card">
                  <CardContent>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {boxOfficeInfo.openHoursDetail}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {boxOfficeInfo?.acceptedPaymentDetail && (
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  <Banknote />
                  Payments Accepted:
                </Typography>
                <Card sx={{ minHeight: 120 }} className="venue-card">
                  <CardContent>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {boxOfficeInfo.acceptedPaymentDetail}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {parkingDetail && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Parking Information:</Typography>
          <Typography variant="body2">{parkingDetail}</Typography>
        </Box>
      )}
      {accessibleSeatingDetail && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Accessibility Information:</Typography>
          <Box className="info-display">
            <Typography variant="body2">{accessibleSeatingDetail}</Typography>
          </Box>
        </Box>
      )}

      {/* {generalInfo && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">General Information:</Typography>
          <Box className="box">
            {generalInfo?.generalRule && (
              <Box>
                <Typography variant="h6">Rules:</Typography>
                <Card
                  sx={{ maxWidth: 400, mt: 2, minHeight: 120 }}
                  className="venue-card"
                >
                  <CardContent sx={{ maxHeight: 200 }}>
                    <Typography variant="body2">
                      {generalInfo.generalRule}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}

            {generalInfo?.childRule && (
              <Box>
                <Typography variant="h6">Child Policy:</Typography>
                <Card
                  sx={{ maxWidth: 400, mt: 2, minHeight: 120 }}
                  className="venue-card"
                >
                  <CardContent sx={{ maxHeight: 200 }}>
                    <Typography variant="body2">
                      {generalInfo.childRule}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        </Box>
      )} */}
    </Container>
  );
};

export default VenueDetails;
