function Autocomplete(props) {
    const {autocomplete, state} = useAutocomplete({
        ...props,
        id: 'twitter-autocomplete',
        defaultActiveItemId: 0,
    });

    return null;
}
