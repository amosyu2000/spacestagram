import { GiSpaceSuit } from 'react-icons/gi'
import { DiGithubBadge } from 'react-icons/di'

function App() {
  return (
    <div className="relative">
      <header className="shadow fixed top-0 left-0 right-0 p-4 flex items-center">
        <GiSpaceSuit className="inline text-3xl mr-4" />
        <span className="text-2xl font-sans font-bold">Spacestagram</span>
        <a 
          href="https://github.com/amosyu2000/spacestagram"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto"
        >
          <DiGithubBadge className="inline text-3xl ml-4" />
        </a>
      </header>
      <div className="h-20"></div>
      <div>tests</div>
    </div>
  );
}

export default App;
