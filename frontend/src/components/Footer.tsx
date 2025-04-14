import { CiFacebook } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { useEffect, useRef } from "react";

type Props = {};

const Footer = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const footer = canvas.parentElement;
      if (footer) {
        canvas.width = footer.offsetWidth;
        canvas.height = footer.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Car properties
    interface Car {
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
    }

    // Create multiple cars
    const cars: Car[] = [];
    for (let i = 0; i < 3; i++) {
      cars.push({
        x: -100 - Math.random() * 200,
        y: 50 + Math.random() * (canvas.height - 100),
        width: 60 + Math.random() * 20,
        height: 30,
        speed: 2 + Math.random() * 3
      });
    }

    // Draw a car
    const drawCar = (car: Car) => {
      if (!ctx) return;

      // Car body
      ctx.fillStyle = "#3B82F6";
      ctx.fillRect(car.x, car.y, car.width, car.height);
      
      // Car top
      ctx.fillStyle = "#2563EB";
      ctx.fillRect(car.x + car.width * 0.25, car.y - car.height * 0.5, car.width * 0.5, car.height * 0.5);
      
      // Windows
      ctx.fillStyle = "#DBEAFE";
      ctx.fillRect(car.x + car.width * 0.3, car.y - car.height * 0.4, car.width * 0.15, car.height * 0.4);
      ctx.fillRect(car.x + car.width * 0.55, car.y - car.height * 0.4, car.width * 0.15, car.height * 0.4);
      
      // Wheels
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(car.x + car.width * 0.25, car.y + car.height, car.height * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(car.x + car.width * 0.75, car.y + car.height, car.height * 0.3, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with semi-transparent overlay to create trail effect
      ctx.fillStyle = "rgba(31, 41, 55, 0.95)"; // Match footer bg color
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw cars
      cars.forEach(car => {
        car.x += car.speed;
        
        // Reset position when car goes off screen
        if (car.x > canvas.width + 100) {
          car.x = -car.width - 50;
          car.y = 50 + Math.random() * (canvas.height - 100);
          car.speed = 2 + Math.random() * 3;
        }
        
        drawCar(car);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <footer className="relative bg-gray-800">
      {/* Canvas as background - full width and height */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
        style={{ opacity: 0.3 }}
      />

      {/* Footer content above the canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-white p-8 relative z-10">
        <div className="text-left px-2 py-2">
          <h1 className="mb-4 capitalize text-2xl font-bold">RENTERCARS</h1>
          <p>Rabat, Morocco</p>
          <p>+212662255458</p>
          <p>example@gmail.com</p>
        </div>
        <div className="text-left px-2 py-2">
          <h1 className="mb-4 capitalize text-2xl font-bold">our products</h1>
          <ul>
            <li>Career</li>
            <li>Car</li>
            <li>packages</li>
            <li>Features</li>
            <li>Priceline</li>
          </ul>
        </div>
        <div className="text-left px-2 py-2 capitalize">
          <h1 className="mb-4 text-2xl font-bold">resources</h1>
          <ul>
            <li>download</li>
            <li>help center</li>
            <li>Guides</li>
            <li>partner network</li>
            <li>Cruises</li>
            <li>developer</li>
          </ul>
        </div>
        <div className="text-left px-2 py-2 capitalize">
          <h1 className="mb-4 capitalize text-2xl font-bold">about Rentercars</h1>
          <ul>
            <li>why chose us</li>
            <li>our story</li>
            <li>Guides</li>
            <li>investor relations</li>
            <li>press center</li>
            <li>advertise</li>
          </ul>
        </div>
        <div className="text-left px-2 py-2 capitalize">
          <h1 className="mb-4 text-2xl font-bold">Follow us</h1>
          <ul className="flex gap-4 text-2xl">
            <li><CiFacebook /></li>
            <li><IoLogoInstagram /></li>
            <li><FaLinkedinIn /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;