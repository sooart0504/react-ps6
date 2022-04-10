
const InputGroup = (props) => {

    const {inputWord, setInputWord, datamuseResults, setDatamuseResults, outputDescription, setOutputDescription, loadingMessage, setLoadingMessage, setRequestType} = props;


    const fetchRhyme = () => {
        setRequestType('rel_rhy');
        setLoadingMessage("Loading...");

        fetch(`https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': inputWord})).toString()}`)
            .then((response) => response.json())
            .then((data) => {
                // This invokes the callback that updates the page.
                // callback(data);
                console.log(data);
                setDatamuseResults(data);
            }, (err) => {
                console.error(err);
            });

        // setLoadingMessage("");
        setOutputDescription(`Words that rhyme with ${inputWord}`);
    }

    const fetchSimilar = () => {
        setRequestType('ml');

        fetch(`https://api.datamuse.com/words?${(new URLSearchParams({'ml': inputWord})).toString()}`)
            .then((response) => response.json())
            .then((data) => {
                // This invokes the callback that updates the page.
                // callback(data);
                console.log(data);
                setDatamuseResults(data);
            }, (err) => {
                console.error(err);
            });

        // setLoadingMessage("");
        setOutputDescription(`Words with a similar meaning to ${inputWord}`);
    }

    return (
            <div className="row">
                <div className="input-group col">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter a word"
                        id="word_input"
                        value={inputWord}
                        onChange={(event) => setInputWord(event.target.value)}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                fetchRhyme()
                            }}}
                    />

                    <button
                        id="show_rhymes"
                        type="button"
                        className="btn btn-primary"
                        onClick={() => fetchRhyme()}
                    >Show rhyming words</button>

                    <button
                        id="show_synonyms"
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => fetchSimilar()}
                    >Show synonyms</button>
                </div>
            </div>
    )
}

export default InputGroup;