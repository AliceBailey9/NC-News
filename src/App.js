import "./App.css";
import Nav from "./Components/Nav";
import { Router } from "@reach/router";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";

function App() {
  return (
    <div className="App">
      <Nav />

      <Router>
        <Articles path="/" />
        <Articles path="/:topic/articles" />
        <SingleArticle path="/articles/:article_id" />
      </Router>
    </div>
  );
}

export default App;
