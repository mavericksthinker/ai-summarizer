import { ReactElement } from 'react'
import logo from '../../assets/logo.svg'

const Hero = (): ReactElement => {
    function openProject() {
        window.open('https://github.com/mavericksthinker/ai-summarizer')
    }

    return (
        <header className='w-full flex justify-center items-center flex-col'>
            <nav className='w-full flex justify-between items-center p-5'>
                <img src={logo} alt="OpenAI Summarizer" />
                <button type='button'
                    className='black_btn'
                    onClick={openProject}>
                    GitHub
                </button>
            </nav>
            <h1 className='head_text'>
                Summarize Articles with <br className='max-md:hidden' />
                <span className='orange_gradient'>
                    OpenAI GPT-4
                </span>
            </h1>
            <h2 className='desc'>
                Simplify your reading with Summarizer, an open-source article summarizer that transforms lengthy articles into clear and concise summaries
            </h2>
        </header>
    )
}

export default Hero