import { Container } from "@mui/material";
import Notes from "./Notes";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <Container maxWidth="lg" className="py-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">Welcome to Your Notes</h1>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">Organize your thoughts and ideas in one place. Create, edit, and manage your notes effortlessly.</p>
          </div>
          <div className="card-padded animate-slide-up">
            <Notes />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;