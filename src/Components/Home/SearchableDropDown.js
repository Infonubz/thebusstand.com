import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SearchableDropDown.css';

export const SearchableDropdown = ({ options, value, onChange, placeholder }) => {
    
    const [searchTerm, setSearchTerm] = useState(value || '');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    // Ensure options is an array
    const filteredOptions = Array.isArray(options) ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDropdownVisible(true);
    };

    const handleOptionClick = (option) => {
        setSearchTerm(option.label);
        onChange(option.value);
        setDropdownVisible(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Update searchTerm when value changes
    useEffect(() => {
        setSearchTerm(value || '');
    }, [value]);

    return (
        <>
            <div className=''>
                <div className="dropdown" ref={dropdownRef}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder={placeholder}
                        className="search-input"
                        onClick={() => setDropdownVisible(true)}
                    />
                    <div className='dropdown-wrapper'>
                        {isDropdownVisible && (
                            <div className="dropdown-content">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            onClick={() => handleOptionClick(option)}
                                            className="dropdown-item"
                                        >
                                            {option.label}
                                        </div>
                                    ))
                                ) : (
                                    <div className="dropdown-item">No options found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

// Default props
SearchableDropdown.defaultProps = {
    options: [],
    placeholder: 'Select an option',
};

// Prop types
SearchableDropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired
        })
    ).isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};
