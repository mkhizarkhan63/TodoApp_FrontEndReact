import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface Props {
    onSearch: (query: string) => void;
}

function Search({ onSearch }: Props) {
    const [SearchQuery, setSearchQuery] = useState('');

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query)
    }
    return (
        <>
            <div className='' style={{ "width": "20%" }}>
                <InputGroup className="mb-3" size="sm">
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                    <Form.Control
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        value={SearchQuery}
                        onChange={handleChangeInput}
                    />
                </InputGroup>
            </div>

        </>
    );
}

export default Search;