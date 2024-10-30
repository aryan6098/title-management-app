import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system"; // Import styled from @mui/system
import { deleteTitle } from "../../store/titleSlice";
import { useDispatch } from "react-redux";
// Define the Title interface with additional details
interface Title {
  id: number;
  subject: string;
  details: string; // New field for additional details
}

// Define the props interface for TitleList
interface TitleListProps {
  titles: Title[];
  walletAddress: string | null;
}

// Create a styled component for the Paper with responsive minHeight and maxHeight
const StyledPaper = styled(Paper)({
  minHeight: "50vh", // Minimum height to 50% of the viewport height
  maxHeight: "80vh", // Maximum height to 80% of the viewport height
  overflow: "auto", // Enable scrolling when content exceeds maxHeight
  padding: "16px", // Equivalent to padding: 2
});

const TitleList: React.FC<TitleListProps> = ({ titles, walletAddress }) => {
  const dispatch = useDispatch();
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h6" gutterBottom>
        Available Titles
      </Typography>
      <List>
        {titles.map((title) => (
          <ListItem key={title.id}>
            <ListItemText primary={title.subject} secondary={title.details} />
            {!walletAddress ? (
              <Tooltip title="Connect your wallet to delete this title" arrow>
                <span>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    disabled // Disable button if wallet is not connected
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
            ) : (
              <IconButton
                edge="end"
                aria-label="delete"
                color="error"
                onClick={() => dispatch(deleteTitle(title.id))}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  );
};

export default TitleList;
