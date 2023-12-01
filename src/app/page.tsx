import { Header, Results } from '@/app/_components'

// in Nextjs, every page file represents a web page. File structure matters. Because
// this file is located directly under `app` folder, it lives at `<baseUrl>/`. if
// it were located in a theoretical `/home` it would live at `<baseUrl>/home`
// Notice the _components folder adjacent to this file. This folder contains all
// components relative to this file and possibly the files below. By structuring
// this way, I know that I cannot delete any component from this level of the
// folder structure until all files below this level of the structure no longer
// need them. Vice versa, I know that if there are no other sub-files, I know it
// is safe to delete the components without having to spelunk the codebase looking
// for and replacing use cases.
export default function Home() {
  const sharedHeaderStyles = "max-sm:text-[48px] max-md:text-[84px] text-[108px] inline"

  return (
    <main className="bg-blue-950 flex min-h-screen w-screen flex-col items-center p-10">
      <div>
        <Header className={`${sharedHeaderStyles} font-[cursive] font-normal text-slate-400 italic mr-2`}>un</Header>
        <Header className={`${sharedHeaderStyles} font-[baskerville] text-white font-bold`}>Scrabble</Header>
      </div>
      <p className="w-[50%] min-w-[300px] text-center mb-14 self-center text-white/70">Got letters, but no ideas? unScrabble will take your input string and determine all viable words based on the scrabble dictionary. Remember: cheaters never prosper.</p>
      <Results />
    </main>
  )
}
