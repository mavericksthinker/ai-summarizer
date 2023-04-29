import { useState, useEffect, ReactElement, ChangeEvent, FormEvent } from "react"

import linkIcon from '../../assets/link.svg';
import copy from '../../assets/copy.svg';
import loader from '../../assets/loader.svg';
import tick from '../../assets/tick.svg';
import { useLazyGetSummaryQuery } from "../../services/store/article";

type Article = {
    url: string,
    summary: string
}

const defaultArticle = {
    url: '',
    summary: ''
}

const Summarize = (): ReactElement => {
    const [article, setArticle] = useState<Article>({ ...defaultArticle });
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        const articlesFromLocalStorage = localStorage.getItem('articles');

        if (articlesFromLocalStorage) {
            setAllArticles(JSON.parse(articlesFromLocalStorage))
        }
    }, []);

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    function resetArticle() {
        setArticle({ ...article, summary: defaultArticle.summary, })
    }

    function setNewArticle(summary: string) {
        const newArticle = { ...article, summary, };
        const updatedAllArticle = [newArticle, ...allArticles];

        setArticle(newArticle);
        setAllArticles(updatedAllArticle);
        localStorage.setItem('articles', JSON.stringify(updatedAllArticle));
    }

    async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { data } = await getSummary({
            articleUrl: article.url
        })

        data?.summary ? setNewArticle(data.summary) : resetArticle();
    }

    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setArticle({
            ...article,
            url: event.target.value
        });
    }

    function handleCopy(url: string) {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 4000)
    }

    return (
        <section className="mt-16 w-full max-w-xl">
            {/* Search */}
            <div className="flex flex-col w-full gap-2">
                <form className="relative flex justify-center items-center"
                    onSubmit={handleOnSubmit}
                >
                    <img src={linkIcon}
                        alt="Link Icon"
                        className="absolute left-0 my-2 ml-3 w-5" />
                    <input type="url" placeholder="Enter a URL"
                        value={article.url}
                        onChange={handleInputOnChange}
                        required
                        className="url_input peer" />
                    <button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                        type="submit"
                    >
                        ↩
                    </button>
                </form>

                {/* Browser URL History */}
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allArticles.map((article: Article, index: number) => (
                        <div key={index}
                            onClick={() => setArticle(article)}
                            className="link_card"
                        >
                            <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                                <img src={copied? tick : copy}
                                    alt={copied? 'Copied' : 'Copy'}
                                    className="w-[40%] h-[40%] object-contain" />
                            </div>
                            <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                                {article.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Dispay Result */}
            <div className="my-10 max-w-ful flex justify-center items-center">
                {isFetching && (<img src={loader} alt="Loader" className="w-20 h-20 object-contain" />)}
                {error && (
                    <div className="flex flex-col">
                        <p className="font-inter font-bold text-black text-center">
                            Well, that wasn't supposed to happen...
                        </p>
                        <br />
                        <span className="font-satoshi font-normal text-gray-700">
                            {/* @ts-expect-error Data */}
                            {error?.data?.error || 'Please contact support'}
                        </span>
                    </div>
                )}
                {article?.summary && (
                    <div className="flex flex-col gap-3">
                        <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                            Article <span className="blue_gradient">Summary</span>
                        </h2>
                        <div className="summary_box">
                            <p className="font-inter font-medium text-sm text-gray-700">
                                {article.summary}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Summarize