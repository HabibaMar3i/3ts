import './App.css'
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
import './styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {

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
    </>
  )
}

export default App
