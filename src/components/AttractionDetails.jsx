import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Grid,
  CardMedia,
  Box,
  Link as MuiLink,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";

const AttractionDetails = () => {
  const { id } = useParams();
  const [attractionData, setAttractionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAttractionDetails() {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=DaXBAgKsvqwRiePXk6GrpY7qQWHkxIPp`
        );
        setAttractionData(response.data);
      } catch (err) {
        setError("Could not fetch attraction details.");
      }
    }
    fetchAttractionDetails();
  }, [id]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!attractionData) return <Typography>Loading...</Typography>;

  const { name, images, externalLinks, classifications, upcomingEvents } =
    attractionData;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
        <Typography variant="h4" align="center">
          {name}
        </Typography>
        {images && images.length > 0 && (
          <Box className="attraction-box" sx={{ mt: 2 }}>
            <CardMedia
              component="img"
              height="300"
              image={images[0]?.url}
              alt={name}
              sx={{ maxWidth: "100%", borderRadius: 1 }}
            />
          </Box>
        )}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Classifications:
        </Typography>
        {classifications && classifications[0] && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {classifications[0].segment?.name} -{" "}
            {classifications[0].genre?.name}
          </Typography>
        )}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Upcoming Events:
        </Typography>
        <Typography variant="body2">
          Total Events: {upcomingEvents._total}
        </Typography>
        {externalLinks && (
          <Typography variant="h6" sx={{ mt: 3 }}>
            Social Links:
          </Typography>
        )}
        <Box className="link-box">
          {externalLinks?.youtube && (
            <MuiLink
              href={externalLinks.youtube[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="attractions-link"
              sx={{ mb: 1 }}
            >
              <YouTubeIcon sx={{ mr: 1 }} />
              YouTube
            </MuiLink>
          )}
          {externalLinks?.twitter && (
            <MuiLink
              href={externalLinks.twitter[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="attractions-link"
              sx={{ mb: 1 }}
            >
              <TwitterIcon sx={{ mr: 1 }} />
              Twitter
            </MuiLink>
          )}
          {externalLinks?.facebook && (
            <MuiLink
              href={externalLinks.facebook[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="attractions-link"
              sx={{ mb: 1 }}
            >
              <FacebookIcon sx={{ mr: 1 }} />
              Facebook
            </MuiLink>
          )}
          {externalLinks?.instagram && (
            <MuiLink
              href={externalLinks.instagram[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="attractions-link"
              sx={{ mb: 1 }}
            >
              <InstagramIcon sx={{ mr: 1 }} />
              Instagram
            </MuiLink>
          )}
          {externalLinks?.homepage && (
            <MuiLink
              href={externalLinks.homepage[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="attractions-link"
              sx={{ mb: 1 }}
            >
              <LanguageIcon sx={{ mr: 1 }} />
              Official Website
            </MuiLink>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AttractionDetails;
