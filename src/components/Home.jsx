import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import Notes from "./Notes";
import Banner from "./banner";

const Home = () => {
  return (
    <>
      <Banner />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Welcome to Your Notes
        </Typography>
        <Typography variant="h6" component="p" align="center" gutterBottom>
          Organize your thoughts and ideas in one place.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Notes />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
