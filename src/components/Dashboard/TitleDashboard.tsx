import { useEffect, useState } from "react";

import React from "react";
import {
  Paper,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Snackbar,
  SnackbarContent,
  CircularProgress,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik, Form } from "formik";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { blue, green, red } from "@mui/material/colors";
import { useAuth } from "../../context/AuthContext";
import { useWalletConnection } from "../../hook/useWalletConnection";
import CommonButton from "../Common/InputField/CommonButton";
import InputField from "../Common/InputField/InputField";
import TitleList from "./TitleList";
import { useDispatch, useSelector } from "react-redux";
import { addTitle, closeSnackbar } from "../../store/titleSlice";

interface Title {
  id: number;
  subject: string;
  details: string;
}

const TitleDashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const { walletAddress, connectWallet } = useWalletConnection();
  const { titles, snackbarOpen, snackbarMessage } = useSelector(
    (state: any) => state.titles
  );
  const dispatch = useDispatch();


  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      // Fetch titles or any other logic needed after authentication
      setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Paper
        elevation={5}
        sx={{
          padding: "2rem",
          borderRadius: "12px",
        }}
      >
        <AppBar
          position="static"
          sx={{ backgroundColor: blue[700], borderRadius: "12px 12px 0 0" }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Titles Management
            </Typography>
            <Box flexGrow={1} />
            <CommonButton
              text={
                walletAddress
                  ? `Connected: ${walletAddress.slice(0, 6)}...`
                  : "Connect Wallet"
              }
              variant="contained"
              onClick={connectWallet}
              sx={{
                backgroundColor: walletAddress ? green[300] : red[500],
                "&:hover": {
                  backgroundColor: walletAddress ? green[400] : red[700],
                },
                color: "#ffffff",
              }}
            />
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: walletAddress
              ? green[100]
              : "rgba(255, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: walletAddress ? green[800] : "red",
              fontWeight: "bold",
            }}
          >
            {walletAddress
              ? `Wallet Connected: ${walletAddress}`
              : "Please connect your wallet to manage titles."}
          </Typography>
        </Box>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }} component="div" sx={{ mt: 2 }}>
              <Formik
                initialValues={{ subject: "", details: "" }}
                onSubmit={(values, { resetForm }) => {
                  if (!walletAddress) {
                    alert("Please connect your MetaMask wallet to add a title.");
                    return;
                  }
                  const newTitle: Title = {
                    id: Date.now(),
                    subject: values.subject,
                    details: values.details,
                  };
                  dispatch(addTitle(newTitle));
                }}
              >
                {() => (
                  <Form>
                    <InputField
                      label="Title Subject"
                      name="subject"
                      type="text"
                      required={true}
                    />
                    <InputField
                      label="Title Details"
                      name="details"
                      type="text"
                      required={true}
                    />

                    <CommonButton
                      text="Add Title"
                      variant="contained"
                      type="submit"
                      fullWidth
                      sx={{
                        marginBottom: "1rem",
                        backgroundColor: green[500],
                        "&:hover": {
                          backgroundColor: "#388e3c",
                        },
                      }}
                      icon={<AddCircleIcon />}
                      disabled={!walletAddress}
                    />
                  </Form>
                )}
              </Formik>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 4 }} component="div">
              <TitleList titles={titles} walletAddress={walletAddress} />
            </Grid>
          </Grid>
        )}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{ backgroundColor: green[500] }}
        />
      </Snackbar>
    </Container>
  );
};

export default TitleDashboard;
