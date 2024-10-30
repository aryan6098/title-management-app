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
import { styled } from "@mui/system"; 
import { useDispatch } from "react-redux";


import { deleteTitle } from "../../store/titleSlice";
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

const StyledPaper = styled(Paper)({
  minHeight: "50vh",
  maxHeight: "80vh",
  overflow: "auto",
  padding: "16px",
});

const TitleList: React.FC<TitleListProps> = ({ titles, walletAddress }) => {
  const dispatch = useDispatch();
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Title Collection
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
