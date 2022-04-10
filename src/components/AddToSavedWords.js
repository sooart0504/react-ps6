

const AddToSavedWords = (props) => {
    const savedWordsArray = [];

    savedWordsArray.push(props.word);
    // console.log(props.word);

    return savedWordsArray.join(', ');
}

export default AddToSavedWords;