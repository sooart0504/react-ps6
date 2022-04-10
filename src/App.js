// import logo from './logo.svg';
import './App.css';
// import AddToSavedWords from "./components/AddToSavedWords";
import { useState } from "react";
import InputGroup from "./components/InputGroup";

function App() {
    // const word = ["test", "test2", "test3"];

    const [savedWords, setSavedWords] = useState([]);
    const [inputWord, setInputWord] = useState("");
    const [datamuseResults, setDatamuseResults] = useState([]);
    const [outputDescription, setOutputDescription] = useState("");
    const [loadingMessage, setLoadingMessage] = useState("");
    const [requestType, setRequestType] = useState("");


    // Join words from the word array into a string
    // Return: string
    const AddToSavedWords = () => {
        return savedWords.join(', ');
    }

    function groupBy(objects, property) {
        // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
        // value for property (obj[property])
        if(typeof property !== 'function') {
            const propName = property;
            property = (obj) => obj[propName];
        }

        const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
        for(const object of objects) {
            const groupName = property(object);
            //Make sure that the group exists
            if(!groupedObjects.has(groupName)) {
                groupedObjects.set(groupName, []);
            }
            groupedObjects.get(groupName).push(object);
        }

        // Create an object with the results. Sort the keys so that they are in a sensible "order"
        const result = {};
        for(const key of Array.from(groupedObjects.keys()).sort()) {
            result[key] = groupedObjects.get(key);
        }
        return result;
    }

    const showDatamuseResults = () => {
        if (datamuseResults.length == 0) {
            // setLoadingMessage("");
            return '(no results)';
        } else if (requestType == 'rel_rhy') {
            //    similar vs rhyme (if)
            const results = [];

            const groupResults = groupBy(datamuseResults, "numSyllables");

            //object.entries = for every key...
            // runs for each syllable
            for(const [key, value] of Object.entries(groupResults)) {
                console.log(key);
                results.push(<h3>Syllables: {key}</h3>);

                // results.push(<ul>);
                {/* runs for each word*/}
                value.map((item, index) => {
                    console.log(item);
                    results.push(<li>{item.word} <button onClick={() => {setSavedWords((currentSavedWords) => {return [...currentSavedWords, item.word]})}}>Save</button></li>);

                });
                // results.push(</ul>);
            }

            // setLoadingMessage("");
            return results;
        } else if (requestType == 'ml') {
            const results = [];

            datamuseResults.map((item, index) => {
                console.log(item);
                results.push(<li>{item.word} <button onClick={() => {setSavedWords((currentSavedWords) => {return [...currentSavedWords, item.word]})}}>Save</button></li>);
            });

            return results;
        }
    }

    return (
        <main className="container">
            <h1 className="row">Rhyme Finder (579 Problem Set 5)</h1>

            {/* Use AddToSavedWords() to join words from word array and print out the returned string */}
            <div className="row">
                <div className="col">Saved words: {AddToSavedWords()}</div>
            </div>

            {/* InputGroup.js props: inputWord, setInputWord, datamuseResults, setDatamuseResults */}
            <InputGroup inputWord={inputWord} setInputWord={setInputWord} datamuseResults={datamuseResults} setDatamuseResults={setDatamuseResults} outputDescription={outputDescription} setOutputDescription={setOutputDescription} loadingMessage={loadingMessage} setLoadingMessage={setLoadingMessage} setRequestType={setRequestType}/>
            {/* Print inputValue (the word user enters), and datamuseResults (the list of rhyming/synonyms of the word) */}
            <div>
                {/*{inputWord}*/}
                {/*{datamuseResults}*/}
            </div>


            <div className="row">
                {/*{loadingMessage}*/}
                <h2 className="col" id="output_description">{outputDescription}</h2>
            </div>

            <div className="output row">
                {/*<output id="word_output" className="col"></output>*/}
                <ul>{showDatamuseResults()}</ul>
            </div>
        </main>
    );
}

export default App;


// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">