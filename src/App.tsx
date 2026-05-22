import './App.css'
import './styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import { Button } from "./components/ui/button"
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
  })


  return (
    <>
      <h1>App</h1>
      <Button variant="default"><i className="fa-solid fa-house"></i> Button</Button>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <div>
        <h1 data-aos="fade-up">Hello Vite + React!</h1>
        <div data-aos="flip-left" style={{ marginTop: '100vh' }}>
          I will animate when you scroll to me!
        </div>
      </div>

    </>
  )
}

export default App
