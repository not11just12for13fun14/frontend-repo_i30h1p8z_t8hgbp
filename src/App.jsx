import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="font-inter bg-black text-white">
      <Hero />
      <About />
      <Projects />
      {/* GitHub section and Blog could be added iteratively with backend/API later */}
      <Contact />
    </div>
  );
}

export default App;
