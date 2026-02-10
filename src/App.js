import Slider from "./components/slider/Slider";

function App() {
  const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=675&fit=crop',
    title: 'Slide 1',
    description: 'Description for slide 1'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=675&fit=crop',
    title: 'Slide 2',
    description: 'Description for slide 2'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1200&h=675&fit=crop',
    title: 'Slide 3',
    description: 'Description for slide 3'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=675&fit=crop',
    title: 'Slide 4',
    description: 'Description for slide 4'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=675&fit=crop',
    title: 'Slide 5',
    description: 'Description for slide 5'
  }
];

  return (
    <div className="App">
      <Slider 
        slides={slides} 
        autoplayDelay={3000}
        showDots={true}
        showArrows={true}
        infinite={true} />
    </div>
  );
}

export default App;
