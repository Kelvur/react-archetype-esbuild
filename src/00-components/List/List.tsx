// Core
import React from 'react';
// Types
import { ListProps } from './List.d';


function List(props: ListProps) {
    const { value } = props;
    return (
        <ul>
            {value.map((value) => {
                return (
                    <li key={value.value} value={value.value}>{value.name}</li>
                );
            })}
        </ul>
    );
}

export default List;
